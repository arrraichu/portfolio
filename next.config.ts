import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'standalone',
  turbopack: {
    rules: {
      '*.svg': {
        loaders: [{
          loader: '@svgr/webpack',
          options: {
            icon: true
          }
        }],
        as: '*.js'
      }
    }
  },
  images: {
    remotePatterns: [
      new URL(`${process.env.R2_PUBLIC_URL}/**`)
    ]
  }
};

export default nextConfig;
