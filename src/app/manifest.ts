import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "UnnecessaryApps",
    short_name: "UnnecessaryApps",
    description:
      "Collecting the internet’s most delightfully useless apps so you don’t have to.",
    start_url: "/",
    display: "standalone",
    background_color: "#FFF1DF",
    theme_color: "#F9A3A8",
    icons: [
      {
        src: "/logo.png",
        sizes: "1254x1254",
        type: "image/png",
        purpose: "any",
      },
    ],
  };
}
