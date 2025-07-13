import type {NextConfig} from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "txfbstatic.blob.core.windows.net",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "placehold.co",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "thumbnails.cbsig.net",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
