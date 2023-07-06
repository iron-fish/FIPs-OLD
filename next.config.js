/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  i18n: {
    locales: ["en"],
    defaultLocale: "en",
  },
  async redirects() {
    return [
      {
        source: "/",
        destination: "/fips/intro",
        permanent: false,
      },
    ];
  },
};

module.exports = nextConfig;