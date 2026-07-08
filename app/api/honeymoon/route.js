import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(request) {
  try {
    // 1. Extract query parameters from the request URL
    const { searchParams } = new URL(request.url);
    const month = searchParams.get("month");
    const star = searchParams.get("star");
    const duration = searchParams.get("duration");

    // 2. Build a dynamic dynamic where clause filter object
    const whereClause = {};

    // Filter by month (handles case matching clean e.g. "june")
    if (month && month !== "All") {
      whereClause.month = month.toLowerCase();
    }

    // Filter by hotel star enum rating standard (e.g. "STAR_4")
    if (star && star !== "All") {
      // If your schema stores star as an Integer, parse it: parseInt(star.replace("STAR_", ""), 10)
      // If your schema stores star as an Integer directly: whereClause.star = parseInt(star, 10);
      whereClause.star = parseInt(star.replace("STAR_", ""), 10); 
    }

    // Filter by dynamic night stay duration
    if (duration && duration !== "All") {
      whereClause.durationNights = parseInt(duration, 10);
    }

    // 3. Query the database using Prisma include operators
    const packages = await prisma.package.findMany({
      where: whereClause,
      include: {
        images: true,         // Includes images collection relation rows
        hotels: true,         // Includes nested hotels info maps
        flights: true,        // Includes related FlightDetail row models
        transportation: true, // Includes private vehicle routes
        visaAssistance: true, // Includes required visa fields
        sightseeing: true,    // Includes activities list vectors
      },
      orderBy: {
        createdAt: "desc",    // Displays fresh additions layout rows first
      },
    });

    // 4. Return successful operational status data wrapper payload
    return NextResponse.json({ success: true, data: packages }, { status: 200 });

  } catch (error) {
    console.error("❌ Next.js API Runtime Request Route Error Log:", error);
    return NextResponse.json(
      { success: false, message: "Internal Server Processing Failure Error Exception", error: error.message },
      { status: 500 }
    );
  }
}
// Create a new package
export async function POST(request) {
  try {
    const body = await request.json();

    const travelPackage = await prisma.package.create({
      data: {
        title: body.title,
        slug: body.slug,
        shortDesc: body.shortDesc,
        description: body.description,
        price: body.price,
        durationDays: body.durationDays,
        durationNights: body.durationNights,
        month: body.month,
        star: body.star,
        type: body.type,
        country: body.country,
        city: body.city,
        category: body.category,
        featured: body.featured || false,

        // nested images
        images: {
          create: body.images?.map((img) => ({
            url: img.url,
          })) || [],
        },

        // nested hotels
        hotels: {
          create: body.hotels?.map((hotel) => ({
            name: hotel.name,
            city: hotel.city,
            durationNights: hotel.durationNights,
            starRating: hotel.starRating,
            roomType: hotel.roomType,
            description: hotel.description,
          })) || [],
        },

        // nested flights (single object, not array)
        ...(body.flights && {
          flights: {
            create: {
              departureCities: body.flights.departureCities, // JSON array
              destination: body.flights.destination,
              airlines: body.flights.airlines,               // JSON array
              classOption: body.flights.classOption,
            },
          },
        }),

        // nested transportation (single object)
        ...(body.transportation && {
          transportation: {
            create: {
              type: body.transportation.type,
              routeDetails: body.transportation.routeDetails,
              extras: body.transportation.extras,
            },
          },
        }),

        // nested visaAssistance (single object)
        ...(body.visaAssistance && {
          visaAssistance: {
            create: {
              supportedRegion: body.visaAssistance.supportedRegion,
              agency: body.visaAssistance.agency,
              requiredDocuments: body.visaAssistance.requiredDocuments, // JSON array
            },
          },
        }),

        // nested sightseeing (single object)
        ...(body.sightseeing && {
          sightseeing: {
            create: {
              items: body.sightseeing.items,                           // JSON array
              romanticExperiences: body.sightseeing.romanticExperiences, // JSON array
              guideIncluded: body.sightseeing.guideIncluded ?? true,
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

    return NextResponse.json({ success: true, data: travelPackage }, { status: 201 });

  } catch (error) {
    console.error("❌ Create Package Error:", error);
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}