import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Next.js passes the dynamic URL parameter inside the context object (second argument)
export async function GET(request, context) {
  try {
    // Unwraps the slug string from the URL path params
    const { slug } = await context.params; 

    // Find the singular matching row in MySQL
    const travelPackage = await prisma.package.findUnique({
      where: { slug: slug },
      include: {
        images: true,         
        hotels: true,         
        flights: true,        
        transportation: true, 
        visaAssistance: true, 
        sightseeing: true,    
      },
    });

    // If no database match is found, return a 404 client error
    if (!travelPackage) {
      return NextResponse.json(
        { success: false, message: "Package not found" },
        { status: 404 }
      );
    }

    // Return the specific dataset object payload
    return NextResponse.json({ success: true, data: travelPackage }, { status: 200 });

  } catch (error) {
    console.error("❌ Single Package API Error:", error);
    return NextResponse.json(
      { success: false, message: "Internal server processing failure", error: error.message },
      { status: 500 }
    );
  }
}
// UPDATE A PACKAGE
export async function PUT(request, context) {
  try {
    const { slug } = await context.params;
    const body = await request.json();

    const existing = await prisma.package.findUnique({ where: { slug } });
    if (!existing) {
      return NextResponse.json(
        { success: false, message: "Package not found" },
        { status: 404 }
      );
    }

    const travelPackage = await prisma.package.update({
      where: { slug },
      data: {
        ...(body.title && { title: body.title }),
        ...(body.slug && { slug: body.slug }),
        ...(body.shortDesc && { shortDesc: body.shortDesc }),
        ...(body.description && { description: body.description }),
        ...(body.price && { price: body.price }),
        ...(body.durationDays && { durationDays: body.durationDays }),
        ...(body.durationNights && { durationNights: body.durationNights }),
        ...(body.month && { month: body.month }),
        ...(body.star && { star: body.star }),
        ...(body.type && { type: body.type }),
        ...(body.country && { country: body.country }),
        ...(body.city && { city: body.city }),
        ...(body.category && { category: body.category }),
        ...(body.featured !== undefined && { featured: body.featured }),

        // replace all images if provided
        ...(body.images && {
          images: {
            deleteMany: {},
            create: body.images.map((img) => ({ url: img.url })),
          },
        }),

        // replace all hotels if provided
        ...(body.hotels && {
          hotels: {
            deleteMany: {},
            create: body.hotels.map((hotel) => ({
              name: hotel.name,
              city: hotel.city,
              durationNights: hotel.durationNights,
              starRating: hotel.starRating,
              roomType: hotel.roomType,
              description: hotel.description,
            })),
          },
        }),

        // replace flights if provided
        ...(body.flights && {
          flights: {
            upsert: {
              create: {
                departureCities: body.flights.departureCities,
                destination: body.flights.destination,
                airlines: body.flights.airlines,
                classOption: body.flights.classOption,
              },
              update: {
                departureCities: body.flights.departureCities,
                destination: body.flights.destination,
                airlines: body.flights.airlines,
                classOption: body.flights.classOption,
              },
            },
          },
        }),

        // replace transportation if provided
        ...(body.transportation && {
          transportation: {
            upsert: {
              create: {
                type: body.transportation.type,
                routeDetails: body.transportation.routeDetails,
                extras: body.transportation.extras,
              },
              update: {
                type: body.transportation.type,
                routeDetails: body.transportation.routeDetails,
                extras: body.transportation.extras,
              },
            },
          },
        }),

        // replace visaAssistance if provided
        ...(body.visaAssistance && {
          visaAssistance: {
            upsert: {
              create: {
                supportedRegion: body.visaAssistance.supportedRegion,
                agency: body.visaAssistance.agency,
                requiredDocuments: body.visaAssistance.requiredDocuments,
              },
              update: {
                supportedRegion: body.visaAssistance.supportedRegion,
                agency: body.visaAssistance.agency,
                requiredDocuments: body.visaAssistance.requiredDocuments,
              },
            },
          },
        }),

        // replace sightseeing if provided
        ...(body.sightseeing && {
          sightseeing: {
            upsert: {
              create: {
                items: body.sightseeing.items,
                romanticExperiences: body.sightseeing.romanticExperiences,
                guideIncluded: body.sightseeing.guideIncluded ?? true,
              },
              update: {
                items: body.sightseeing.items,
                romanticExperiences: body.sightseeing.romanticExperiences,
                guideIncluded: body.sightseeing.guideIncluded ?? true,
              },
            },
          },
        }),
      },
      include: {
        images: true,
        hotels: true,
        flights: true,
        transportation: true,
        visaAssistance: true,
        sightseeing: true,
      },
    });

    return NextResponse.json({ success: true, data: travelPackage }, { status: 200 });

  } catch (error) {
    console.error("❌ Update Package Error:", error);
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}

// DELETE - Delete package by slug
export async function DELETE(request, context) {
  try {
    const { slug } = await context.params;

    const existing = await prisma.package.findUnique({ where: { slug } });
    if (!existing) {
      return NextResponse.json(
        { success: false, message: "Package not found" },
        { status: 404 }
      );
    }

    const id = existing.id;

    // Delete all child relations first (order matters)
    await prisma.image.deleteMany({ where: { packageId: id } });
    await prisma.hotel.deleteMany({ where: { packageId: id } });
    await prisma.flightDetail.deleteMany({ where: { packageId: id } });
    await prisma.transportation.deleteMany({ where: { packageId: id } });
    await prisma.visaAssistance.deleteMany({ where: { packageId: id } });
    await prisma.sightseeing.deleteMany({ where: { packageId: id } });

    await prisma.package.delete({ where: { slug } });

    return NextResponse.json({
      success: true,
      message: `Package "${slug}" deleted successfully`,
    });

  } catch (error) {
    console.error("❌ Delete Package Error:", error);
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
