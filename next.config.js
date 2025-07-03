const withPWA = require('next-pwa')({
  dest: 'public',
  register: true,
  disable: process.env.NODE_ENV !== 'production', // Alleen PWA in productie
})
const path = require('path')

module.exports = withPWA({
  reactStrictMode: true,
  images: {
    domains: ['www.netlify.com', 'vercel.com'],
  },
  experimental: {
    optimizeCss: true,
  },
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
})
