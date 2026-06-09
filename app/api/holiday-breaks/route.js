import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(request) {  // ← add request here
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get("type");

    const holidays = await prisma.holidayBreaks.findMany({
      where: type ? { type } : undefined,
      include: {
        images: true,
        features: true,
      },
    });
    const seen = new Set();
    const unique = holidays.filter((h) => {
      if (seen.has(h.title)) return false;
      seen.add(h.title);
      return true;
    });

    return NextResponse.json({ success: true, data: unique });
  } catch (error) {
    console.error(error); // ← helps you see the real error in terminal
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}