
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get("type");

    let where = {};

    if (type) {
      where.apiType = type.toLowerCase(); // works perfectly with SQLite
    }

    const flights = await prisma.flight.findMany({ where });
    return Response.json({ success: true, data: flights });

  } catch (error) {
    console.error("FLIGHT API ERROR:", error);
    return Response.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
// create
export async function POST(request) {
  try {
    const body = await request.json();

    const flight = await prisma.flight.create({
      data: {
        slug: body.slug,
        tripType: body.tripType,
        airlineName: body.airlineName,
        apiType: body.apiType.toLowerCase(),
        airlineLogo: body.airlineLogo,
        departureCode: body.departureCode,
        departureCity: body.departureCity,
        destinationCode: body.destinationCode,
        destinationCity: body.destinationCity,
        price: body.price,
        dates: body.dates,
      },
    });

    return Response.json({ success: true, data: flight }, { status: 201 });

  } catch (error) {
    console.error(error);
    return Response.json({ success: false, message: error.message }, { status: 500 });
  }
}