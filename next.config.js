/** @type {import("next").NextConfig} */
const config = {
  async rewrites() {
    return process.env.ANALYTICS_DOMAIN
      ? [
          {
            source: '/stats/:match*',
            destination: `${process.env.ANALYTICS_DOMAIN}/:match*`,
          },
        ]
      : [];
  },
};

export default config;
