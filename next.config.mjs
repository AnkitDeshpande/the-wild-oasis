/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  reactStrictMode: true,
  images: {
    qualities: [25, 50, 75, 80],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "zjfvhawuwkginacidqpk.supabase.co",
        pathname: "/storage/v1/object/public/**",
      },
    ],
  },
};

export default nextConfig;
