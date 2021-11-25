const path = require("path");

module.exports = {
  reactStrictMode: true,
  images: {
    domains: ["vercel.com", "www.netlify.com"],
  },
  experimental: {
    optimizeCss: true,
  },
  sassOptions: {
    includePaths: [path.join(__dirname, "styles")],
  },
};
