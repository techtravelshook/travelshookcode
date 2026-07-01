import { PrismaClient } from '@prisma/client';
import { TopDestinations } from './destinationseed.js';  

const prisma = new PrismaClient();

async function seedTopDestinations() {
  console.log(' Seeding TopDestinations...');

  for (const destination of TopDestinations) {
    await prisma.topDestinations.upsert({
      where: { id: destination.id },
      update: {
        title: destination.title,
        country: destination.country,
        category: destination.category,
        image: destination.image,
        rating: destination.rating,
        duration: destination.duration,
        features: destination.features,
        trustpilotScore: destination.trustpilotScore,
        price: destination.price,
        location: destination.location,
        bestTimeToVisit: destination.bestTimeToVisit,
        highlights: destination.highlights,
        shortDesc: destination.shortDesc,
         desc: destination.desc,
      },
      create: {
        id: destination.id,
        title: destination.title,
        country: destination.country,
        category: destination.category,
        image: destination.image,
        rating: destination.rating,
        duration: destination.duration,
        features: destination.features,
        trustpilotScore: destination.trustpilotScore,
        price: destination.price,
        location: destination.location,
        bestTimeToVisit: destination.bestTimeToVisit,
        highlights: destination.highlights,
        shortDesc: destination.shortDesc,
          desc: destination.desc,
      },
    });
  }

  console.log(`✅ Successfully seeded ${TopDestinations.length} TopDestinations!`);
}

seedTopDestinations()
  .catch((e) => {
    console.error('❌ Error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });