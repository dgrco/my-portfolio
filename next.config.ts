import type { NextConfig } from "next";
import createMDX from '@next/mdx';

const withMDX = createMDX({});

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  output: 'export',
  pageExtensions: ['ts', 'tsx', 'md', 'mdx'],
  images: {
    unoptimized: true,
  },
};

export default withMDX(nextConfig);
