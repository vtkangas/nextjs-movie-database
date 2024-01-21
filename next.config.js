/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
    serverActions: true,
  },
  images: {
    remotePatterns: [{
      protocol: "https",
      hostname: "image.tmdb.org"
    }]
  }
}

module.exports = nextConfig
