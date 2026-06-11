import { PrismaClient } from '@prisma/client';
import umrahPackages from './seeds/umrahseed.js';
import ramadanPackagesData from "./seeds/ramdanseed.js";
import holidayPackagesData from "./seeds/holidayseed.js";
import { cityBreaksData, inclusiveHolidaysData, BeachHolidays, FamilyHolidays,lastMinuteHolidaysData } from "./seeds/holidaybreakseed.js";
import flightData from './seeds/flightseed.js';

const prisma = new PrismaClient();

// ─── Helpers ────────────────────────────────────────────────────────────────

const mapRatingToEnum = (rating) => {
  const map = { 1: "STAR_1", 2: "STAR_2", 3: "STAR_3", 4: "STAR_4", 5: "STAR_5" };
  return map[rating] || "STAR_5";
};

// Safely strips non-digits and parses — returns null if result is NaN
const safeId = (id) => {
  const n = parseInt(String(id).replace(/\D/g, ''), 10);
  return isNaN(n) ? null : n;
};

// Safely parses the numeric part of a duration string like "7 Nights" or "05 Nights"
const safeDuration = (duration) => {
  const n = parseInt(String(duration).trim(), 10);
  return isNaN(n) ? 0 : n;
};

// ─── Main ────────────────────────────────────────────────────────────────────

async function main() {
  console.log('🌱 Processing database seeding...');

  // =========================================================================
  // 1. UMRAH & RAMADAN PACKAGES
  // =========================================================================
  const umrahAndRamadan = [...umrahPackages, ...ramadanPackagesData];
  console.log(`📦 Seeding ${umrahAndRamadan.length} Umrah/Ramadan packages...`);

  for (const pkg of umrahAndRamadan) {
    const normalizedImages = pkg.images?.create || (pkg.imageUrl ? [{ url: pkg.imageUrl }] : []);
    const { inclusions, exclusions, images, imageUrl, isFeatured, ...plainPackageFields } = pkg;

    await prisma.umrahPackage.upsert({
      where: { slug: plainPackageFields.slug },
      update: {
        ...plainPackageFields,
        isFeatured: isFeatured ? true : false,
        month: plainPackageFields.month ?? null,
        images:     { deleteMany: {}, create: normalizedImages },
        inclusions: { deleteMany: {}, create: inclusions?.map((title) => ({ title })) || [] },
        exclusions: { deleteMany: {}, create: exclusions?.map((title) => ({ title })) || [] },
      },
      create: {
        ...plainPackageFields,
        isFeatured: isFeatured ? true : false,
        month: plainPackageFields.month ?? null,
        images:     { create: normalizedImages },
        inclusions: { create: inclusions?.map((title) => ({ title })) || [] },
        exclusions: { create: exclusions?.map((title) => ({ title })) || [] },
      },
    });
  }

  // =========================================================================
  // 2. HOLIDAY PACKAGES
  // =========================================================================
  console.log(`🏖️  Seeding ${holidayPackagesData.length} Holiday packages...`);

  for (const pkg of holidayPackagesData) {
    const normalizedImages = (pkg.images?.create || []).map(({ url, slideTitle, slideDesc }) => ({
      url,
      ...(slideTitle && { slideTitle }),
      ...(slideDesc  && { slideDesc  }),
    }));

    const {
      inclusions, exclusions, images, imageUrl,
      subtitle, heroImage, originalPrice, rating, reviews, accent,
      ...plainPackageFields
    } = pkg;

    const packageType = plainPackageFields.type || "HOLIDAY";

    await prisma.holidayPackage.upsert({
      where: { slug: plainPackageFields.slug },
      update: {
        ...plainPackageFields,
        type: packageType,
        month: plainPackageFields.month ?? null,
        images:   { deleteMany: {}, create: normalizedImages },
        packages: {
          deleteMany: {},
          create: [{ title: pkg.title, subtitle, image: heroImage, price: pkg.price, originalPrice, rating, reviews, accent }],
        },
      },
      create: {
        ...plainPackageFields,
        type: packageType,
        month: plainPackageFields.month ?? null,
        images:   { create: normalizedImages },
        packages: {
          create: [{ title: pkg.title, subtitle, image: heroImage, price: pkg.price, originalPrice, rating, reviews, accent }],
        },
      },
    });
  }

  // =========================================================================
  // 3. HOLIDAY BREAKS — shared upsert helper
  // =========================================================================

  const upsertBreak = async (item, offset, type) => {
    const rawNumber = safeId(item.id);
    if (rawNumber === null) {
      console.warn(`⚠️  Skipping item with bad id: "${item.id}" (type: ${type})`);
      return;
    }

    const numericId      = offset + rawNumber;
    const numericDuration = safeDuration(item.duration);

    await prisma.holidayBreaks.upsert({
      where: { id: numericId },
      update: {
        title:    item.title,
        category: item.category,
        shortDesc: item.shortDesc,
        rating:   mapRatingToEnum(item.rating),
        type,
        duration: numericDuration,
        price:    item.price,
        features: { deleteMany: { holidayBreakId: numericId }, create: item.features.map((f) => ({ name: f })) },
        images:   { deleteMany: { holidayBreakId: numericId }, create: [{ url: item.image }] },
      },
      create: {
        id:       numericId,          // ✅ stable id prevents duplicate rows on re-seed
        title:    item.title,
        category: item.category,
        shortDesc: item.shortDesc,
        rating:   mapRatingToEnum(item.rating),
        type,
        duration: numericDuration,
        price:    item.price,
        features: { create: item.features.map((f) => ({ name: f })) },
        images:   { create: [{ url: item.image }] },
      },
    });
  };

  // --- City Breaks (offset 1000) ---
  console.log('🏙️  Seeding city breaks...');
  for (const item of cityBreaksData)        await upsertBreak(item, 1000, "CITY_BREAK");

  // --- Inclusive Holidays (offset 2000) ---
  console.log('🏖️  Seeding inclusive holidays...');
  for (const item of inclusiveHolidaysData) await upsertBreak(item, 2000, "INCLUSIVE_HOLIDAY");

  // --- Beach Holidays (offset 3000) ---
  console.log('🌊  Seeding beach holidays...');
  for (const item of BeachHolidays)         await upsertBreak(item, 3000, "BEACH_HOLIDAY");

  // --- Family Holidays (offset 4000) ---
  console.log('👨‍👩‍👧  Seeding family holidays...');
  for (const item of FamilyHolidays)        await upsertBreak(item, 4000, "FAMILY_HOLIDAY");


  
  // --- LASTMINHOLIDAYS Holidays (offset 5000) ---
  console.log('🏖️  Seeding inclusive holidays...');
  for (const item of lastMinuteHolidaysData) await upsertBreak(item, 2000, "Last_Minute_Holidays");
  console.log('✅ Seeding complete!');
}
// ----- --FLIGHTS SEEDING ------


console.log("✈️ Starting flight seeding...");
  
  // Clean out existing flights to prevent duplicates
  await prisma.flight.deleteMany({});
  
  // Ensure flightData exists before running loop block
  if (typeof flightData !== 'undefined' && Array.isArray(flightData)) {
    for (const item of flightData) {
      await prisma.flight.create({
        data: item,
      });
    }
    console.log(`Successfully seeded ${flightData.length} mock flights.`);
  } else {
    console.warn("⚠️ flightData array is empty or undefined. Skipping flight loop.");
  }

// ─── Run ────────────────────────────────────────────────────────────────────

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(async () => { await prisma.$disconnect(); });