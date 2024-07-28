/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    NEXT_PUBLIC_APOLLO_CLIENT_URL: process.env.NEXT_PUBLIC_APOLLO_CLIENT_URL,
  },
};

export default nextConfig;
