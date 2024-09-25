/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'utfs.io',
      },
      {
        protocol: 'https',
        hostname: 'drive.google.com',
      }
    ],
  },
  eslint: {
    ignoreDuringBuilds: true,  // Disabilita ESLint durante la build
  },
};

export default nextConfig;

