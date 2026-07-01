// import DestinationContent from './DestinationContent';

// const isValidUrl = (urlString) => {
//   if (!urlString || typeof urlString !== 'string') return false;
//   if (urlString.startsWith('/') || urlString.startsWith('.')) return true;
//   try {
//     new URL(urlString);
//     return true;
//   } catch (e) {
//     return false;
//   }
// };

// export default async function DestinationPage({ params }) {
//   const { slug } = params;
//   let dest;

//   try {
//     const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
//     const res = await fetch(`${baseUrl}/api/top-destination/slug/${slug}`, {
//       cache: "no-store",
//     });

//     if (!res.ok) throw new Error('Not found');
//     dest = await res.json();
//   } catch (error) {
//     return (
//       <div className="min-h-screen dark:bg-zinc-950 bg-zinc-50 dark:text-white text-zinc-900 flex items-center justify-center p-6 transition-colors duration-300">
//         <div className="text-center max-w-md dark:bg-zinc-900 bg-white border dark:border-zinc-800 border-zinc-200 rounded-3xl p-10 shadow-2xl">
//           <div className="w-16 h-16 bg-red-500/10 text-red-500 rounded-full flex items-center justify-center mx-auto mb-6 text-3xl">⚠️</div>
//           <h1 className="text-3xl font-extrabold mb-3 tracking-tight">Package Not Found</h1>
//           <p className="dark:text-zinc-400 text-zinc-500 mb-8 leading-relaxed">Sorry, this destination package does not exist or has been removed.</p>
//         </div>
//       </div>
//     );
//   }

//   const heroImageSrc = isValidUrl(dest?.image)
//     ? dest.image
//     : (dest?.image?.startsWith('/') ? dest.image : `/${dest?.image || 'placeholder-image.jpg'}`);

//   const fullText = dest.desc || dest.shortDesc || "No description provided for this premium destination holiday offer.";
//   const sentences = fullText.split(/\. |\n+/).filter(s => s.trim() !== "");
//   const halfMark = Math.ceil(sentences.length / 2);

//   const paragraphOne = sentences.slice(0, halfMark).join(". ") + ".";
//   const paragraphTwo = sentences.slice(halfMark).length > 0
//     ? sentences.slice(halfMark).join(". ") + "."
//     : "";

//   return (
//     <DestinationContent
//       dest={dest}
//       heroImageSrc={heroImageSrc}
//       paragraphOne={paragraphOne}
//       paragraphTwo={paragraphTwo}
//       related={dest.related || []}
//     />
//   );
// }
import { PrismaClient } from "@prisma/client";
import DestinationContent from './DestinationContent';

// Initialize Prisma Client (Tip: Ideally, move this to a global /lib/prisma.js file)
const prisma = new PrismaClient();

// Slugify matching utility to find titles matching the URL format
const slugify = (title) =>
  title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");

const isValidUrl = (urlString) => {
  if (!urlString || typeof urlString !== 'string') return false;
  if (urlString.startsWith('/') || urlString.startsWith('.')) return true;
  try {
    new URL(urlString);
    return true;
  } catch (e) {
    return false;
  }
};

export default async function DestinationPage({ params }) {
  // 1. MUST AWAIT params in Next.js 15
  const { slug } = await params; 
  let dest;

  try {
    // 2. Query Prisma Directly (Fixes the 3221226505 memory crash)
    const destinations = await prisma.topDestinations.findMany();
    const matchedDestination = destinations.find((d) => slugify(d.title) === slug);

    if (!matchedDestination) throw new Error('Not found');

    // 3. Find similar related packages directly on the server
    const sameCountry = destinations.filter(
      (d) => d.id !== matchedDestination.id && d.country === matchedDestination.country
    );

    let related = sameCountry;
    if (related.length < 3) {
      const others = destinations.filter(
        (d) => d.id !== matchedDestination.id && d.country !== matchedDestination.country
      );
      related = [...related, ...others];
    }
    
    related = related.slice(0, 3).map((d) => ({
      ...d,
      slug: slugify(d.title),
    }));

    // 4. Parse stringified JSON fields safely
    dest = {
      ...matchedDestination,
      features: typeof matchedDestination.features === 'string' 
        ? JSON.parse(matchedDestination.features) 
        : matchedDestination.features,
      highlights: typeof matchedDestination.highlights === 'string' 
        ? JSON.parse(matchedDestination.highlights) 
        : matchedDestination.highlights,
      slug,
      related
    };

  } catch (error) {
    console.error("Build pre-render catch hook executed:", error);
    return (
      <div className="min-h-screen dark:bg-zinc-950 bg-zinc-50 dark:text-white text-zinc-900 flex items-center justify-center p-6 transition-colors duration-300">
        <div className="text-center max-w-md dark:bg-zinc-900 bg-white border dark:border-zinc-800 border-zinc-200 rounded-3xl p-10 shadow-2xl">
          <div className="w-16 h-16 bg-red-500/10 text-red-500 rounded-full flex items-center justify-center mx-auto mb-6 text-3xl">⚠️</div>
          <h1 className="text-3xl font-extrabold mb-3 tracking-tight">Package Not Found</h1>
          <p className="dark:text-zinc-400 text-zinc-500 mb-8 leading-relaxed">Sorry, this destination package does not exist or has been removed.</p>
        </div>
      </div>
    );
  }

  const heroImageSrc = isValidUrl(dest?.image)
    ? dest.image
    : (dest?.image?.startsWith('/') ? dest.image : `/${dest?.image || 'placeholder-image.jpg'}`);

  const fullText = dest.desc || dest.shortDesc || "No description provided for this premium destination holiday offer.";
  const sentences = fullText.split(/\. |\n+/).filter(s => s.trim() !== "");
  const halfMark = Math.ceil(sentences.length / 2);

  const paragraphOne = sentences.slice(0, halfMark).join(". ") + ".";
  const paragraphTwo = sentences.slice(halfMark).length > 0
    ? sentences.slice(halfMark).join(". ") + "."
    : "";

  return (
    <DestinationContent
      dest={dest}
      heroImageSrc={heroImageSrc}
      paragraphOne={paragraphOne}
      paragraphTwo={paragraphTwo}
      related={dest.related || []}
    />
  );
}
