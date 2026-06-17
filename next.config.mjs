/** @type {import('next').NextConfig} */
const nextConfig = {
  // Reduces client-side bundle size during quick reloads
   
  images: { unoptimized: true }
};

export default nextConfig;
