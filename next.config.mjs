import bundleAnalyzer from '@next/bundle-analyzer';

/** @type {import("next").NextConfig} */
const config = {};

export default bundleAnalyzer({
  enabled: process.env.NODE_ENV !== 'development',
  openAnalyzer: false,
})(config);
