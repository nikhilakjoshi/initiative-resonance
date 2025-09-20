import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    rules: {
      "*.svg": {
        loaders: [
          {
            loader: "@svgr/webpack", // Use @svgr/webpack as the loader
            options: {
              icon: true, // Example option for SVGR
              svgProps: { role: "img", "aria-label": "" },
            },
          },
        ],
        as: "*.js", // Treat the output as a JavaScript module
      },
    },
  },
};

export default nextConfig;
