/** @type {import('next').NextConfig} */
const nextConfig = {

  experimental: {
    ppr: true,
},

  images: {
    domains: ['www.themealdb.com'],
  },
}

module.exports = nextConfig
