// import { PrismaClient } from "@prisma/client";

// const prisma = new PrismaClient();

// export async function GET(request) {
//   try {
//     const { searchParams } = new URL(request.url);
    
//     // 1. Read 'type' because your URL is ?type=Accra
//     const cityParam = searchParams.get("type"); 

//     const queryOptions = {};
    
//     // 2. Map 'type' from the URL to 'destinationCity' in your database
//     if (cityParam) {
//       queryOptions.where = {
//         destinationCity: cityParam 
//       };
//     }

//     const flights = await prisma.flight.findMany(queryOptions);

//     return Response.json({
//       success: true,
//       data: flights,
//     });
//   } catch (error) {
//     console.error(error);
//     return Response.json(
//       { success: false, message: "Failed to fetch flights" },
//       { status: 500 }
//     );
//   }
// }

 import { PrismaClient } from "@prisma/client";

 const prisma = new PrismaClient();



export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get("type");

    let where = {};

    if (type) {
     const normalized = type.toLowerCase(); // "australia" ✓


      const countryToCitiesMap = {
  australia: ["Sydney", "Brisbane", "Perth", "Melbourne", "Gold Coast", "Adelaide","Adelaide"],
  ghana: ["Accra"],
  nigeria: ["Lagos", "Abuja", "Kano", "Port Harcourt", "Enugu"],
  "south-africa": ["Johannesburg", "Cape Town", "Durban","Port Elizabeth"], 
  india: ["Delhi", "Mumbai", "Chennai", "Bangalore", "Kolkata","Ahmedabad","Hyderabad","Goa","TRV","Kochi"],
  pakistan: ["Islamabad", "Karachi", "Lahore","Multan","Sialkot","Peshawar","Quetta"],
  philippines: ["Manila","Cebu","Clark International","Davao"],
  canada: ["Toronto", "Vancouver", "Montreal"],
  jamaica: ["Kingston"],
  kenya: ["Nairobi"],
  zimbabwe: ["Harare"],
};

      if (countryToCitiesMap[normalized]) {
        where.destinationCity = {
          in: countryToCitiesMap[normalized],
        };
      } else {
        where.destinationCity = {
          equals: type,
          mode: "insensitive",
        };
      }
    }

    const flights = await prisma.flight.findMany({
      where,
    });

    return Response.json({ success: true, data: flights });
  } catch (error) {
    console.error("FLIGHT API ERROR:", error); // 🔥 IMPORTANT
    return Response.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}