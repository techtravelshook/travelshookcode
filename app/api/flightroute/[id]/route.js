import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// UPDATE
export async function PUT(request, { params }) {
  try {
    const id = parseInt(params.id);
    const body = await request.json();

    const flight = await prisma.flight.update({
      where: { id },
      data: {
        slug: body.slug,
        tripType: body.tripType,
        airlineName: body.airlineName,
        apiType: body.apiType?.toLowerCase(),
        airlineLogo: body.airlineLogo,
        departureCode: body.departureCode,
        departureCity: body.departureCity,
        destinationCode: body.destinationCode,
        destinationCity: body.destinationCity,
        price: body.price,
        dates: body.dates,
      },
    });

    return Response.json({ success: true, data: flight });

  } catch (error) {
    console.error(error);
    return Response.json({ success: false, message: error.message }, { status: 500 });
  }
}

// DELETE
export async function DELETE(request, { params }) {
  try {
    const id = parseInt(params.id);

    await prisma.flight.delete({
      where: { id },
    });

    return Response.json({ success: true, message: "Flight deleted successfully" });

  } catch (error) {
    console.error(error);
    return Response.json({ success: false, message: error.message }, { status: 500 });
  }
}