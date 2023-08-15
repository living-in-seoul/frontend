/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'maps.googleapis.com',
        port: '',
        pathname: '/maps/api/place/photo',
      },
      {
        protocol: 'https',
        hostname: 'maps.googleapis.com',
        port: '',
        pathname: '/maps/api/place/js/PhotoService.GetPhoto',
      },
      {
        protocol: 'http',
        hostname: 'imgnews.naver.net',
        port: '',
      },
    ],
  },
};

module.exports = nextConfig;
