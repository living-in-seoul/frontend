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
        protocol: 'http',
        hostname: 'imgnews.naver.net',
        port: '',
      },
      {
        protocol: 'http',
        hostname: 'post.phinf.naver.net',
      },
      {
        protocol: 'https',
        hostname: 'i.pinimg.com',
      },
      {
        protocol: 'https',
        hostname: 'cdn.ppomppu.co.kr',
      },
      {
        protocol: 'https',
        hostname: 's3.orbi.kr',
      },
      {
        protocol: 'https',
        hostname: 'cdn.clien.net',
      },
    ],
  },
};

module.exports = nextConfig;
