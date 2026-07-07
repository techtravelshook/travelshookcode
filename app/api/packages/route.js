import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);

    const star = searchParams.get("star");
    const type = searchParams.get("type");
    const month = searchParams.get("month"); // optional

    const packages = await prisma.umrahPackage.findMany({
      where: {
        // STAR filter (optional)
        star: star || undefined,

        // TYPE filter (optional)
        type: type || undefined,

        // MONTH filter (IMPORTANT FIX)
        ...(month
          ? {
              month: month, // /api/packages?month=January
            }
          : type === "jj"
          ? {
              month: {
                not: null, // only luxury = monthly packages
              },
            }
          : {}),
      },

      include: {
        images: true,
        inclusions: true,
        exclusions: true,
      },

      take: 500, // only 4 packages
    });

    return NextResponse.json({
      success: true,
      data: packages,
    });
  } catch (error) {
    console.error("API Route Error:", error);

    return NextResponse.json(
      {
        success: false,
        error: error.message,
      },
      { status: 500 }
    );
  }
}
// TO CREATE PACKAGES 
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
      isFeatured,
      images,
      inclusions,
      exclusions,
    } = body;

    const slug = title
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-");

    const existingPackage = await prisma.umrahPackage.findUnique({
      where: { slug },
    });

    if (existingPackage) {
      return NextResponse.json(
        {
          success: false,
          message: "A package with this title already exists.",
        },
        { status: 409 }
      );
    }

    const newPackage = await prisma.umrahPackage.create({
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
          create: images.map((url) => ({
            url,
          })),
        },

        inclusions: {
          create: inclusions.map((title) => ({
            title,
          })),
        },

        exclusions: {
          create: exclusions.map((title) => ({
            title,
          })),
        },
      },

      include: {
        images: true,
        inclusions: true,
        exclusions: true,
      },
    });

    return NextResponse.json(
      {
        success: true,
        data: newPackage,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to create package.",
      },
      { status: 500 }
    );
  }
}