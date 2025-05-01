import { defineConfig } from "vite";

import path from "path";
import preact from "@preact/preset-vite";

import { VitePWA } from "vite-plugin-pwa";

// https://vite.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"), // Resolves '@' to the 'src' folder
    },
  },
  css: {
    postcss: "./postcss.config.js",
  },
  plugins: [
    preact(),
    VitePWA({
      strategies: "generateSW",
      registerType: "autoUpdate",
      devOptions: {
        enabled: true,
      },
      includeAssets: ["icons/*", "logo.webp"],
      manifest: {
        name: "Galactic Fishing",
        short_name: "Galactic Fishing",
        description: "Rebels fishing dashboard",
        theme_color: "#0f172a", // dark blue
        background_color: "#0f172a",
        icons: [
          {
            src: "/icons/pwa-192x192.png",
            sizes: "192x192",
            type: "image/png",
            purpose: "any",
          },
          {
            src: "/icons/pwa-512x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any",
          },
          {
            src: "/icons/pwa-maskable-192x192.png",
            sizes: "192x192",
            type: "image/png",
            purpose: "maskable",
          },
          {
            src: "/icons/pwa-maskable-512x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "maskable",
          },
        ],
      },
      workbox: {
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/api-game\.bloque\.app\/.*$/,
            handler: "NetworkFirst",
            options: {
              cacheName: "api-cache",
              expiration: {
                maxEntries: 50,
                maxAgeSeconds: 60 * 60 * 24, // 1 day
              },
              cacheableResponse: {
                statuses: [0, 200],
              },
            },
          },
        ],
      },
    }),
  ],
});
