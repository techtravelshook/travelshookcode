// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   // Reduces client-side bundle size during quick reloads
   
//   images: {
//   formats: ['image/avif', 'image/webp'],
//   minimumCacheTTL: 60 * 60 * 24 * 365,
// }
// };

// export default nextConfig;


/** @type {import('next').NextConfig} */
const nextConfig = {
  // ✅ ENABLE Image Optimization (CRITICAL - You had it DISABLED!)
  // Remove: images: { unoptimized: true }
  
  images: {
    // ✅ Enable modern formats (WebP, AVIF)
    formats: ['image/avif', 'image/webp'],
    
    // ✅ Cache optimized images for 1 year
    minimumCacheTTL: 60 * 60 * 24 * 365,
    
    // ✅ Device sizes for responsive images
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    
    // ✅ Image sizes for srcSet
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384,70,60,65],
    
    // ✅ Allowed remote image domains (if using external URLs)
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**', // Allow all domains, or specify specific ones
      },
    ],
  },

  // ✅ Enable SWC minification (faster than Terser)
  swcMinify: true,

  // ✅ React optimization
  reactStrictMode: true,

  // ✅ Compression
  compress: true,

  // ✅ Generate ETags for caching
  generateEtags: true,

  // ✅ Trailing slashes for consistent URLs
  trailingSlash: false,

  // ✅ Production source maps (remove in production if not needed)
  productionBrowserSourceMaps: false,

  // ✅ Optimize package imports
  experimental: {
    optimizePackageImports: [
      'lodash-es',
      '@mui/material',
      '@mui/icons-material',
      // Add other heavy packages here
    ],
  },

  // ✅ Headers for performance
  headers: async () => {
    return [
      {
        source: '/imgs/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable', // 1 year cache
          },
        ],
      },
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
        ],
      },
    ];
  },

  // ✅ Redirects (optional, for SEO)
  redirects: async () => {
    return [];
  },

  // ✅ Rewrites (optional, for API routes)
  rewrites: async () => {
    return {
      beforeFiles: [],
    };
  },
};

export default nextConfig;