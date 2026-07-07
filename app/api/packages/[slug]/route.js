import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";

//  create package code is in route.js in packages folder
// to fetch all packages
export async function GET(request, { params }) {
  const { slug } = await params;

  try {
    const package_ = await prisma.umrahPackage.findUnique({
      where: { slug },
      include: {
        images: true,
        inclusions: true,
        exclusions: true,
      },
    });

    if (!package_) {
      return NextResponse.json(
        { success: false, message: "Package not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: package_ });
  } catch (error) {
    console.error("Error fetching package:", error);
    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
}
// route to delete a package
export async function DELETE(request, { params }) {
  const { slug } = await params;

  try {
    const package_ = await prisma.umrahPackage.findUnique({
      where: { slug },
    });

    if (!package_) {
      return NextResponse.json(
        {
          success: false,
          message: "Package not found",
        },
        {
          status: 404,
        }
      );
    }

    await prisma.packageImage.deleteMany({
      where: {
        packageId: package_.id,
      },
    });

    await prisma.packageInclusion.deleteMany({
      where: {
        packageId: package_.id,
      },
    });

    await prisma.packageExclusion.deleteMany({
      where: {
        packageId: package_.id,
      },
    });

    await prisma.umrahPackage.delete({
      where: {
        slug,
      },
    });

    return NextResponse.json({
      success: true,
      message: "Package deleted successfully",
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to delete package",
      },
      {
        status: 500,
      }
    );
  }
}
// to update package 
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
      inclusions = [],
      exclusions = [],
    } = body;

    // Check if package exists
    const existingPackage = await prisma.umrahPackage.findUnique({
      where: { slug },
    });

    if (!existingPackage) {
      return NextResponse.json(
        {
          success: false,
          message: "Package not found",
        },
        { status: 404 }
      );
    }

    // Generate new slug
    const newSlug = title
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-");

    // Prevent duplicate slug
    const duplicate = await prisma.umrahPackage.findFirst({
      where: {
        slug: newSlug,
        NOT: {
          id: existingPackage.id,
        },
      },
    });

    if (duplicate) {
      return NextResponse.json(
        {
          success: false,
          message: "Another package already uses this title.",
        },
        { status: 409 }
      );
    }

    const updatedPackage = await prisma.umrahPackage.update({
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
          create: images.map((url) => ({
            url,
          })),
        },

        inclusions: {
          deleteMany: {},
          create: inclusions.map((title) => ({
            title,
          })),
        },

        exclusions: {
          deleteMany: {},
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

    return NextResponse.json({
      success: true,
      message: "Package updated successfully.",
      data: updatedPackage,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Internal server error.",
      },
      {
        status: 500,
      }
    );
  }
}