/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: 'ghcsyuqdnyiswzhvagzh.supabase.co',
        protocol: 'https',
      },
    ],
  },
  reactStrictMode: false,
};

export default nextConfig;
