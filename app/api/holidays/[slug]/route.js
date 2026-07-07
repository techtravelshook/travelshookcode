// app/api/holidays/[slug]/route.js
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
// this route will fetch a holiday package by its slug, including its images and any related packages
// single package
export async function GET(request, { params }) {
  try {
    // 1. Await params in Next.js 15+
    const { slug } = await params;
    // 2. Query Prisma for the package and its child records
    const holidayPackage = await prisma.holidayPackage.findUnique({
      where: { slug: slug },
      include: {
        images: true,
        packages: true,
      },
    });
    if (!holidayPackage) {
      return NextResponse.json({ error: "Package not found" }, { status: 404 });
    }
    return NextResponse.json(holidayPackage, { status: 200 });
  } catch (error) {
    console.error("Database seed fetch error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
//  route to create new packages in in holidays/route.js
// route to update package 
export async function PUT(request, { params }) {
  const { slug } = await params;

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
      images = [],
      packages = [],
    } = body;

    const newSlug = title
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-");

    const holiday = await prisma.holidayPackage.update({
      where: {
        slug,
      },

      data: {
        title,
        slug: newSlug,
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
          deleteMany: {},
          create: images.map((img) => ({
            url: img.url,
            slideTitle: img.slideTitle,
            slideDesc: img.slideDesc,
          })),
        },

        packages: {
          deleteMany: {},
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

    return NextResponse.json({
      success: true,
      data: holiday,
    });
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
// route to  delete package 
export async function DELETE(request, { params }) {
  const { slug } = await params;

  try {
    // Find the holiday package first
    // make sure to delete child records first to avoid foreign key constraint errors.
    const holiday = await prisma.holidayPackage.findUnique({
      where: { slug },
    });
    if (!holiday) {
      return NextResponse.json(
        {
          success: false,
          message: "Holiday package not found.",
        },
        { status: 404 }
      );
    }

    // Delete child records first
    await prisma.holidayPackageImage.deleteMany({
      where: {
        holidayPackageId: holiday.id,
      },
    });

    await prisma.holidayPackageItem.deleteMany({
      where: {
        holidayPackageId: holiday.id,
      },
    });

    // Delete parent record
    await prisma.holidayPackage.delete({
      where: {
        slug,
      },
    });

    return NextResponse.json({
      success: true,
      message: "Holiday package deleted successfully.",
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Internal Server Error",
      },
      { status: 500 }
    );
  }
}
