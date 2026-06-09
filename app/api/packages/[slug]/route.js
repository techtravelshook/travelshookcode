import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";

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