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


export async function PUT(request, { params }) {
  try {
    const { slug } = await params; // ← ADD await
    const body = await request.json();

    console.log("Updating Slug:", slug);
    console.log("Request Body:", body);

    const existing = await prisma.package.findUnique({
      where: { slug },
    });

    if (!existing) {
      return NextResponse.json(
        {
          success: false,
          message: "Package not found",
        },
        { status: 404 }
      );
    }

    const updatedPackage = await prisma.package.update({
      where: {
        slug,
      },

      data: {
        title: body.title,
     
        shortDesc: body.shortDesc,
        description: body.description,

        price: Number(body.price),
        durationDays: Number(body.durationDays),
        durationNights: Number(body.durationNights),
        star: Number(body.star),

        month: body.month,
        type: body.type,
        country: body.country,
        city: body.city,
        category: body.category,
        featured: body.featured,
images: {
  deleteMany: {},
  create:
    body.images
      ?.filter((img) => img.url) // ← ADD THIS: skip empty images
      .map((img) => ({
        url: img.url,
      })) || [],
},

        hotels: {
          deleteMany: {},
          create:
            body.hotels?.map((hotel) => ({
              name: hotel.name,
              city: hotel.city,
              durationNights: Number(hotel.durationNights),
              starRating: Number(hotel.starRating),
              roomType: hotel.roomType,
              description: hotel.description,
            })) || [],
        },

        flights: body.flights
          ? {
              upsert: {
                update: {
                  departureCities: body.flights.departureCities || [],
                  destination: body.flights.destination,
                  airlines: body.flights.airlines || [],
                  classOption: body.flights.classOption,
                },
                create: {
                  departureCities: body.flights.departureCities || [],
                  destination: body.flights.destination,
                  airlines: body.flights.airlines || [],
                  classOption: body.flights.classOption,
                },
              },
            }
          : undefined,

        transportation: body.transportation
          ? {
              upsert: {
                update: {
                  type: body.transportation.type,
                  routeDetails: body.transportation.routeDetails,
                  extras: body.transportation.extras,
                },
                create: {
                  type: body.transportation.type,
                  routeDetails: body.transportation.routeDetails,
                  extras: body.transportation.extras,
                },
              },
            }
          : undefined,

        visaAssistance: body.visaAssistance
          ? {
              upsert: {
                update: {
                  supportedRegion:
                    body.visaAssistance.supportedRegion,
                  agency: body.visaAssistance.agency,
                  requiredDocuments:
                    body.visaAssistance.requiredDocuments || [],
                },
                create: {
                  supportedRegion:
                    body.visaAssistance.supportedRegion,
                  agency: body.visaAssistance.agency,
                  requiredDocuments:
                    body.visaAssistance.requiredDocuments || [],
                },
              },
            }
          : undefined,

        sightseeing: body.sightseeing
          ? {
              upsert: {
                update: {
                  items: body.sightseeing.items || [],
                  romanticExperiences:
                    body.sightseeing.romanticExperiences || [],
                  guideIncluded:
                    body.sightseeing.guideIncluded,
                },
                create: {
                  items: body.sightseeing.items || [],
                  romanticExperiences:
                    body.sightseeing.romanticExperiences || [],
                  guideIncluded:
                    body.sightseeing.guideIncluded,
                },
              },
            }
          : undefined,
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

    console.log("Updated Package:", updatedPackage);

    return NextResponse.json({
      success: true,
      data: updatedPackage,
    });
  } catch (error) {
    console.error("UPDATE ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: error.message,
      },
      {
        status: 500,
      }
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
