const path = require("path");

module.exports = {
  swcMinify: true,
  reactStrictMode: true,
  images: {
    domains: ["www.netlify.com"],
  },
  experimental: {
    optimizeCss: true,
  },
  sassOptions: {
    includePaths: [path.join(__dirname, "styles")],
  },
};
