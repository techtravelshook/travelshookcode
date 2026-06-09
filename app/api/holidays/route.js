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
