const withSvgr = require("@newhighsco/next-plugin-svgr");

/** @type {import('next').NextConfig} */
const nextConfig = withSvgr({
  reactStrictMode: true,
  env: {
    PORT: process.env.PORT ?? undefined,
  },
});

module.exports = nextConfig;
