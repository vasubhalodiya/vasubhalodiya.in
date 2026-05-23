import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Vasu Bhalodiya",
    short_name: "Vasu B.",
    description: "Vasu Bhalodiya - Frontend Developer | Crafting Premium Web Experiences",
    start_url: "/",
    display: "standalone",
    background_color: "#0a0a0a",
    theme_color: "#607df0",
    icons: [
      {
        src: "/favicon.svg",
        sizes: "any",
        type: "image/svg+xml",
      },
    ],
  };
}
