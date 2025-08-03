/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  generateBuildId: async () => {
    return `${Date.now()}`; // force unique build ID to avoid chunk mismatch
  },
}

export default nextConfig
