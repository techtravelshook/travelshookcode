import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

// PUT - Update holiday by id
export async function PUT(request, { params }) {
  try {
    const id = parseInt(params.id); // ✅ reads from /5010 in URL

    const body = await request.json();

    const existing = await prisma.holidayBreaks.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json(
        { success: false, message: `Holiday ${id} not found` },
        { status: 404 }
      );
    }

    const holiday = await prisma.holidayBreaks.update({
      where: { id },
      data: {
        ...(body.title && { title: body.title }),
        ...(body.category && { category: body.category }),
        ...(body.shortDesc && { shortDesc: body.shortDesc }),
        ...(body.rating && { rating: body.rating }),
        ...(body.type && { type: body.type }),
        ...(body.month !== undefined && { month: body.month }),
        ...(body.duration && { duration: body.duration }),
        ...(body.price && { price: body.price }),
        ...(body.desc && { desc: body.desc }),
        ...(body.location && { location: body.location }),
        ...(body.bestTimeToVisit && { bestTimeToVisit: body.bestTimeToVisit }),
        ...(body.images && {
          images: {
            deleteMany: {},
            create: body.images.map((img) => ({ url: img.url })),
          },
        }),
        ...(body.features && {
          features: {
            deleteMany: {},
            create: body.features.map((f) => ({ name: f.name })),
          },
        }),
      },
      include: {
        images: true,
        features: true,
      },
    });

    return NextResponse.json({ success: true, data: holiday });

  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}

export async function DELETE(request, { params }) {
  try {
    const id = parseInt(params.id);

    const existing = await prisma.holidayBreaks.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json(
        { success: false, message: `Holiday ${id} not found` },
        { status: 404 }
      );
    }

    // Correct model names from your schema
    await prisma.holidayBreakImage.deleteMany({ where: { holidayBreakId: id } });
    await prisma.holidayBreakFeatures.deleteMany({ where: { holidayBreakId: id } });
    await prisma.highlight.deleteMany({ where: { holidayBreakId: id } }); // don't forget this one
    await prisma.holidayBreaks.delete({ where: { id } });

    return NextResponse.json({
      success: true,
      message: `Holiday ${id} deleted successfully`,
    });

  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}