// app/api/top-destinations/route.js
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const destinations = await prisma.topDestinations.findMany({
      orderBy: { id: 'asc' }
    });

    const formattedDestinations = destinations.map(dest => ({
      ...dest,
      features: typeof dest.features === 'string' ? JSON.parse(dest.features) : dest.features,
      highlights: typeof dest.highlights === 'string' ? JSON.parse(dest.highlights) : dest.highlights,
      
      // Generate clean slug from title
      slug: dest.title
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '')
        .trim()
        .replace(/\s+/g, '-')
    }));

    return Response.json(formattedDestinations);
  } catch (error) {
    console.error('Error fetching destinations:', error);
    return Response.json({ error: 'Failed to fetch destinations' }, { status: 500 });
  }
}