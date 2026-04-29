const withPWA = require('next-pwa')({
  dest: 'public',
  register: true,
  disable: process.env.NODE_ENV !== 'production', // Alleen PWA in productie
})
const path = require('path')

module.exports = withPWA({
  output: 'export',
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  experimental: {
    optimizeCss: true,
  },
  images: {
    unoptimized: true,
  },
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
})
