/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false, // Prevents double mounting in dev for smoother video timeline
  serverExternalPackages: ["@remotion/renderer", "@remotion/bundler"],
};

module.exports = nextConfig;
