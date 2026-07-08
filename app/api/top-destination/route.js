// app/api/top-destinations/route.js
import { PrismaClient } from '@prisma/client';
import { NextResponse } from "next/server";
const prisma = new PrismaClient();

export async function GET() {
  try {
    const destinations = await prisma.topDestinations.findMany({
      orderBy: { id: 'asc' }
    });

    const formattedDestinations = destinations.map(dest => ({
      ...dest,
      features: typeof dest.features === 'string' ? JSON.parse(dest.features) : dest.features,
      highlights: typeof dest.highlights === 'string' ? JSON.parse(dest.highlights) : dest.highlights,
      
      // Generate clean slug from title
      slug: dest.title
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '')
        .trim()
        .replace(/\s+/g, '-')
    }));

    return Response.json(formattedDestinations);
  } catch (error) {
    console.error('Error fetching destinations:', error);
    return Response.json({ error: 'Failed to fetch destinations' }, { status: 500 });
  }
}
// router to post a new destination
export async function POST(request) {
  try {
    const body = await request.json();
    // Check if slug already exists (using title-based duplicate check)
    const existing = await prisma.topDestinations.findFirst({
      where: { title: body.title }
    });
    if (existing) {
      return NextResponse.json(
        { success: false, message: `Destination "${body.title}" already exists` },
        { status: 409 }
      );
    }
    const destination = await prisma.topDestinations.create({
      data: {
        title: body.title,
        country: body.country,
        category: body.category,
        image: body.image,
        rating: body.rating,
        duration: body.duration,
        features: body.features,           // JSON array e.g. ["Flights included", "Airport Transfers"]
        trustpilotScore: body.trustpilotScore,
        price: body.price,
        location: body.location,
        bestTimeToVisit: body.bestTimeToVisit,
        highlights: body.highlights,       // JSON array e.g. ["Opera House tour", "Harbour Bridge"]
        shortDesc: body.shortDesc,
        desc: body.desc,
      },
    });

    return NextResponse.json({ success: true, data: destination }, { status: 201 });

  } catch (error) {
    console.error("❌ Create Destination Error:", error);
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}