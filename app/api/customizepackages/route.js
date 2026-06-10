import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(req) {
  const type = req.nextUrl.searchParams.get('type');

  try {
    let transformed = [];

    if (type === 'umrah') {
      // Standard Umrah execution path
      const data = await prisma.umrahPackage.findMany({
        include: { images: true, inclusions: true, exclusions: true },
      });
      
      transformed = data.map((p) => ({
        id: p.id,
        title: p.title,
        slug: p.slug || String(p.id),
        shortDesc: p.shortDesc || '',
        description: p.description || p.shortDesc || '',
        price: p.price || 0,
        originalPrice: p.price ? p.price * 1.15 : 0,
        duration: p.duration || 0,
        rating: 4.8,
        heroImage: p.images?.[0]?.url || "imgs/holidays/default-umrah.jpg",
        isFeatured: p.isFeatured || false,
        type: p.type || 'UMRAH',
      }));

    } else {
      // 🚀 Bulletproof Raw SQL Path for Holidays
      // This bypasses Prisma's schema relation names completely
      const rows = await prisma.$queryRaw`
        SELECT 
          hb.*, 
          hbi.url AS image_url
        FROM holidaybreaks hb
        LEFT JOIN holidaybreakimage hbi ON hb.id = hbi.holidaybreakId
      `;

      // Group rows to handle potential duplicate entries from the image join gracefully
      const uniquePackages = [];
      const seenIds = new Set();

      for (const row of rows) {
        if (!seenIds.has(row.id)) {
          seenIds.add(row.id);
          uniquePackages.push(row);
        }
      }

      transformed = uniquePackages.map((p) => {
        let parsedRating = 4.8;
        if (p.rating && typeof p.rating === 'string') {
          parsedRating = parseFloat(p.rating.replace('STAR_', '')) || 4.8;
        }

        return {
          id: p.id,
          title: p.title,
          slug: p.slug || String(p.id),
          shortDesc: p.shortDesc || '',
          description: p.description || p.shortDesc || '',
          price: Number(p.price) || 0,
          originalPrice: p.price ? Number(p.price) * 1.15 : 0,
          duration: p.duration || 0,
          rating: parsedRating,
          heroImage: p.image_url || p.image || "imgs/holidays/default.jpg",
          isFeatured: p.isFeatured || false,
          type: p.type || 'CITY_BREAK',
        };
      });
    }

    return Response.json(transformed);
  } catch (error) {
    console.error("API Error Detailed Trace:", error);
    return Response.json(
      { error: "Failed to load packages", details: error.message },
      { status: 500 }
    );
  }
}
