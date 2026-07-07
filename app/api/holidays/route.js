import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Forces Next.js to skip build-time caching and fetch fresh data on every request
export const dynamic = "force-dynamic";

export async function GET(request) {
  try {
    // 1. Extract query filters from the incoming request URL (e.g., ?type=HOLIDAY)
    const { searchParams } = new URL(request.url);
    const typeFilter = searchParams.get("type");

    // 2. Build a dynamic dynamic where clause configuration
    const whereClause = {};
    if (typeFilter) {
      // Ensures casing matches your Prisma Enum definitions (e.g., "HOLIDAY")
      whereClause.type = typeFilter.toUpperCase();
    }

    // 3. Query your isolated HolidayPackage MySQL table with its child images
    const holidayPackages = await prisma.holidayPackage.findMany({
      where: whereClause,
      orderBy: { createdAt: "desc" },
      include: {
        images: true, // Loads related records from the HolidayPackageImage table
      },
    });

    // 4. Send the structured data block back to your custom hook layout cleanly
    return NextResponse.json({
      success: true,
      data: holidayPackages,
    });

  } catch (error) {
    console.error("❌ API Error loading holiday packages:", error);
    
    return NextResponse.json(
      { 
        success: false, 
        message: "Failed to load holiday packages from database.",
        error: error.message 
      },
      { status: 500 }
    );
  }
}
// route to create new packages 
export async function POST(request) {
  try {
    const body = await request.json();
    const {
      title,
      shortDesc,
      description,
      star,
      type,
      month,
      duration,
      makkahHotel,
      madinahHotel,
      price,
      isFeatured = false,
      images = [],
      packages = [],
    } = body;
    const slug = title
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-");
    const exists = await prisma.holidayPackage.findUnique({
      where: { slug },
    });
    if (exists) {
      return NextResponse.json(
        {
          success: false,
          message: "Package already exists.",
        },
        { status: 409 }
      );
    }

    const holiday = await prisma.holidayPackage.create({
      data: {
        title,
        slug,
        shortDesc,
        description,
        star,
        type,
        month,
        duration,
        makkahHotel,
        madinahHotel,
        price,
        isFeatured,

        images: {
          create: images.map((img) => ({
            url: img.url,
            slideTitle: img.slideTitle,
            slideDesc: img.slideDesc,
          })),
        },

        packages: {
          create: packages.map((pkg) => ({
            title: pkg.title,
            subtitle: pkg.subtitle,
            description: pkg.description,
            image: pkg.image,
            price: pkg.price,
            originalPrice: pkg.originalPrice,
            rating: pkg.rating,
            reviews: pkg.reviews,
            duration: pkg.duration,
            accent: pkg.accent,
          })),
        },
      },

      include: {
        images: true,
        packages: true,
      },
    });

    return NextResponse.json(
      {
        success: true,
        data: holiday,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: error.message,
      },
      {
        status: 500,
      }
    );
  }
}
