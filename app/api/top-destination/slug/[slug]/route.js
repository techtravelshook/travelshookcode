import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
const prisma = new PrismaClient();
const slugify = (title) =>
  title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");

export async function GET(request, { params }) {
  const { slug } = await params;

  try {
    const destinations = await prisma.topDestinations.findMany();

    const destination = destinations.find((d) => slugify(d.title) === slug);

    if (!destination) {
      return Response.json(
        { error: "Destination not found" },
        { status: 404 }
      );
    }

    // Find similar packages: same country first, then fill with other destinations if needed
    const sameCountry = destinations.filter(
      (d) => d.id !== destination.id && d.country === destination.country
    );

    let related = sameCountry;
    if (related.length < 3) {
      const others = destinations.filter(
        (d) => d.id !== destination.id && d.country !== destination.country
      );
      related = [...related, ...others];
    }
    related = related.slice(0, 3).map((d) => ({
      ...d,
      slug: slugify(d.title),
    }));

    return Response.json({
      ...destination,
      features:
        typeof destination.features === "string"
          ? JSON.parse(destination.features)
          : destination.features,
      highlights:
        typeof destination.highlights === "string"
          ? JSON.parse(destination.highlights)
          : destination.highlights,
      slug,
      related,
    });
  } catch (error) {
    console.error(error);
    return Response.json(
      { error: "Failed to fetch destination" },
      { status: 500 }
    );
  }
}

// route to update a destination by slug
export async function PUT(request, { params }) {
  try {
    const { slug } = await params;

    // Get all destinations
    const destinations = await prisma.topDestinations.findMany();

    // Find matching destination using slugify(title)
    const existing = destinations.find(
      (d) => slugify(d.title) === slug
    );

    if (!existing) {
      return NextResponse.json(
        {
          success: false,
          message: `Destination "${slug}" not found`,
        },
        { status: 404 }
      );
    }

    const body = await request.json();

    const destination = await prisma.topDestinations.update({
      where: {
        id: existing.id, // ✅ Update using ID
      },
      data: {
        ...(body.title && { title: body.title }),
        ...(body.country && { country: body.country }),
        ...(body.category && { category: body.category }),
        ...(body.image && { image: body.image }),
        ...(body.rating !== undefined && { rating: body.rating }),
        ...(body.duration && { duration: body.duration }),
        ...(body.features && { features: body.features }),
        ...(body.trustpilotScore !== undefined && {
          trustpilotScore: body.trustpilotScore,
        }),
        ...(body.price !== undefined && { price: body.price }),
        ...(body.location && { location: body.location }),
        ...(body.bestTimeToVisit && {
          bestTimeToVisit: body.bestTimeToVisit,
        }),
        ...(body.highlights && { highlights: body.highlights }),
        ...(body.shortDesc && { shortDesc: body.shortDesc }),
        ...(body.desc && { desc: body.desc }),
      },
    });

    return NextResponse.json(
      {
        success: true,
        data: destination,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("❌ Update Destination Error:", error);

    return NextResponse.json(
      {
        success: false,
        message: error.message,
      },
      { status: 500 }
    );
  }
}

// DELETE - Delete destination by id
export async function DELETE(request, { params }) {
  try {
    const { slug } = await params;
    const destinations = await prisma.topDestinations.findMany();
    const existing = destinations.find(
      (d) => slugify(d.title) === slug
    );

    if (!existing) {
      return NextResponse.json(
        {
          success: false,
          message: `Destination "${slug}" not found`,
        },
        { status: 404 }
      );
    }

    // Delete using ID
    await prisma.topDestinations.delete({
      where: {
        id: existing.id,
      },
    });

    return NextResponse.json({
      success: true,
      message: `Destination "${existing.title}" deleted successfully`,
    });
  } catch (error) {
    console.error("❌ Delete Destination Error:", error);

    return NextResponse.json(
      {
        success: false,
        message: error.message,
      },
      { status: 500 }
    );
  }
}
