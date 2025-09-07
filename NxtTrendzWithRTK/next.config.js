const nextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "ik.imagekit.io",
        pathname: "**", // This allows any path from the hostname
      },
    ],
  },
};

export default nextConfig;
