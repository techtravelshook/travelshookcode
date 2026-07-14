// import { prisma } from "@/lib/prisma";
// import { NextResponse } from "next/server";

// export async function GET(request) {  
//   try {
//     const { searchParams } = new URL(request.url);
//     const type = searchParams.get("type");

//     const holidays = await prisma.holidayBreaks.findMany({
//       where: type ? { type } : undefined,
//       include: {
//         images: true,
//         features: true,
//       },
//     });
//     const seen = new Set();
//     const unique = holidays.filter((h) => {
//       if (seen.has(h.title)) return false;
//       seen.add(h.title);
//       return true;
//     });

//     return NextResponse.json({ success: true, data: unique });
//   } catch (error) {
//     console.error(error); 
//     return NextResponse.json(
//       { success: false, message: error.message },
//       { status: 500 }
//     );
//   }
// }


import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

// GET (your existing code)
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get("type");

    const holidays = await prisma.holidayBreaks.findMany({
      where: type ? { type } : undefined,
      include: {
        images: true,
        features: true,
      },
    });

    const seen = new Set();
    const unique = holidays.filter((h) => {
      if (seen.has(h.title)) return false;
      seen.add(h.title);
      return true;
    });

    return NextResponse.json({ success: true, data: unique });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
// route to get all holidays

// POST - Create new holiday
export async function POST(request) {
  try {
    const body = await request.json();

    const holiday = await prisma.holidayBreaks.create({
      data: {
        title: body.title,
        category: body.category,
        shortDesc: body.shortDesc,
        rating: body.rating,
        type: body.type,
        month: body.month || null,
        duration: body.duration,
        price: body.price,
        desc: body.desc,
        location: body.location,
        bestTimeToVisit: body.bestTimeToVisit,
        // nested create for images
        images: {
          create: body.images?.map((img) => ({
            url: img.url,
          })) || [],
        },
        // nested create for features
        features: {
          create: body.features?.map((f) => ({
            name: f.name,
          })) || [],
        },
      },
      include: {
        images: true,
        features: true,
      },
    });

    return NextResponse.json({ success: true, data: holiday }, { status: 201 });

  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}

