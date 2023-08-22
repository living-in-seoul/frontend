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
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
      },
      {
        protocol: 'https',
        hostname: 'living-in-seoul.s3.ap-northeast-2.amazonaws.com',
        port: '',
      },
    ],
  },
};

module.exports = nextConfig;
