// app/api/holidays/[slug]/route.js
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

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
