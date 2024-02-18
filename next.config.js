/** @type {import("next").NextConfig} */
const config = {
  async rewrites() {
    const rewrites = [];

    if (process.env.ANALYTICS_DOMAIN)
      rewrites.push({
        source: '/analytics/:match*',
        destination: `${process.env.ANALYTICS_DOMAIN}/:match*`,
      });

    return rewrites;
  },
};

export default config;
