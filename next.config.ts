/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        pathname: '/**',
      },
    ],
  },
  experimental: {
    serverActions: {
      enabled: true
    }
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
}

module.exports = nextConfig
