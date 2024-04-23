/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'https://api.dicebear.com/',
      },
    ],
  },
};

export default nextConfig;
