/** @type {import('next').NextConfig} */
const nextConfig = {
  // Reduces client-side bundle size during quick reloads
  devIndicators: {
    appIsrStatus: false,
  },
};

export default nextConfig;
