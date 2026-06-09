// For featured packages

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function GET() {
  try {
    const featuredPackages = await prisma.umrahPackage.findMany({
      where: {
        isFeatured: true,
      },
      include: {
        images: true,
        inclusions: true,
        exclusions: true,
      },
      take: 8,
    });

    return Response.json({
      success: true,
      data: featuredPackages,
    });
  } catch (error) {
    return Response.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}