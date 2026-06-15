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