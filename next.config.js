const withSvgr = require("@newhighsco/next-plugin-svgr");

/** @type {import('next').NextConfig} */
const nextConfig = withSvgr({
  reactStrictMode: true,
  env: {
    PORT: process.env.PORT ?? undefined,
  },
  headers: async () => {
    return [
      {
        source: "/api/:path*",
        headers: [
          { key: "Access-Control-Allow-Origin", value: "*" },
          {
            key: "Access-Control-Allow-Methods",
            value: "GET,OPTIONS,PATCH,DELETE,POST,PUT",
          },
          {
            key: "Access-Control-Allow-Headers",
            value:
              "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version",
          },
        ],
      },
    ];
  },
});

module.exports = nextConfig;
