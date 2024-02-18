/** @type {import("next").NextConfig} */
const config = {
  async rewrites() {
    return [
      {
        source: '/stats/:match*',
        destination: `${process.env.ANALYTICS_DOMAIN}/:match*`,
      },
    ];
  },
};

export default config;
