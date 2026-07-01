// import { PrismaClient } from "@prisma/client";

// const prisma = new PrismaClient();

// export async function GET(request, { params }) {
//   const { slug } = await params;

//   try {
//     const destinations = await prisma.topDestinations.findMany();

//     const destination = destinations.find((d) => {
//       const generatedSlug = d.title
//         .toLowerCase()
//         .replace(/[^a-z0-9\s-]/g, "")
//         .trim()
//         .replace(/\s+/g, "-");

//       return generatedSlug === slug;
//     });

//     if (!destination) {
//       return Response.json(
//         { error: "Destination not found" },
//         { status: 404 }
//       );
//     }

//     return Response.json({
//       ...destination,
//       features:
//         typeof destination.features === "string"
//           ? JSON.parse(destination.features)
//           : destination.features,
//       highlights:
//         typeof destination.highlights === "string"
//           ? JSON.parse(destination.highlights)
//           : destination.highlights,
//       slug,
//     });
//   } catch (error) {
//     console.error(error);
//     return Response.json(
//       { error: "Failed to fetch destination" },
//       { status: 500 }
//     );
//   }
// }
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const slugify = (title) =>
  title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");

export async function GET(request, { params }) {
  const { slug } = await params;

  try {
    const destinations = await prisma.topDestinations.findMany();

    const destination = destinations.find((d) => slugify(d.title) === slug);

    if (!destination) {
      return Response.json(
        { error: "Destination not found" },
        { status: 404 }
      );
    }

    // Find similar packages: same country first, then fill with other destinations if needed
    const sameCountry = destinations.filter(
      (d) => d.id !== destination.id && d.country === destination.country
    );

    let related = sameCountry;
    if (related.length < 3) {
      const others = destinations.filter(
        (d) => d.id !== destination.id && d.country !== destination.country
      );
      related = [...related, ...others];
    }
    related = related.slice(0, 3).map((d) => ({
      ...d,
      slug: slugify(d.title),
    }));

    return Response.json({
      ...destination,
      features:
        typeof destination.features === "string"
          ? JSON.parse(destination.features)
          : destination.features,
      highlights:
        typeof destination.highlights === "string"
          ? JSON.parse(destination.highlights)
          : destination.highlights,
      slug,
      related,
    });
  } catch (error) {
    console.error(error);
    return Response.json(
      { error: "Failed to fetch destination" },
      { status: 500 }
    );
  }
}