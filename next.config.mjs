/** @type {import('next').NextConfig} */
const config = {
  images: {
    domains: ['cdn.sanity.io'],
  },
  typescript: {
    // Set this to false if you want production builds to abort if there's type errors
    ignoreBuildErrors: process.env.VERCEL_ENV === 'production',
  },
  eslint: {
    /// Set this to false if you want production builds to abort if there's lint errors
    ignoreDuringBuilds: process.env.VERCEL_ENV === 'production',
  },
  experimental: {
    taint: true,
    appDir: true,
    serverActions: {
      bodySizeLimit: '2mb',
    },
  },
}

export default config
