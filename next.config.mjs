/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 60 * 60 * 24 * 365,
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384,70,60,65],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },

  reactStrictMode: true,
  compress: true,
  generateEtags: true,
  trailingSlash: false,
  productionBrowserSourceMaps: false,

  experimental: {
    optimizePackageImports: [
      'lodash-es',
    ],
  },

  headers: async () => {
    return [
      {
        source: '/imgs/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
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

  redirects: async () => {
    return [];
  },

  rewrites: async () => {
    return {
      beforeFiles: [],
    };
  },
};

export default nextConfig;