import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    
    // 1. Read 'type' because your URL is ?type=Accra
    const cityParam = searchParams.get("type"); 

    const queryOptions = {};
    
    // 2. Map 'type' from the URL to 'destinationCity' in your database
    if (cityParam) {
      queryOptions.where = {
        destinationCity: cityParam 
      };
    }

    const flights = await prisma.flight.findMany(queryOptions);

    return Response.json({
      success: true,
      data: flights,
    });
  } catch (error) {
    console.error(error);
    return Response.json(
      { success: false, message: "Failed to fetch flights" },
      { status: 500 }
    );
  }
}
