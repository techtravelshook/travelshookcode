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
