/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: [
      "ipfs.io",
      "gateway.pinata.cloud",
      "s2.coinmarketcap.com",
      "pin.ski",
    ],
  },
};

module.exports = nextConfig;
