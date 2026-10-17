import type { NextConfig } from "next";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);

type CatalogJson = {
  categories: { id: string; subcategories?: { id: string }[] }[];
};

function productCategoryRedirects() {
  const brands = ["sfa", "demofire", "afb", "elko"] as const;
  const rules: { source: string; destination: string; permanent: boolean }[] = [];

  for (const brand of brands) {
    const data = require(`./src/lib/products/${brand}-catalog.json`) as CatalogJson;
    for (const cat of data.categories) {
      rules.push({
        source: `/products/${brand}/${cat.id}`,
        destination: `/products/${brand}?category=${encodeURIComponent(cat.id)}`,
        permanent: true,
      });
      for (const sub of cat.subcategories ?? []) {
        rules.push({
          source: `/products/${brand}/${sub.id}`,
          destination: `/products/${brand}?category=${encodeURIComponent(cat.id)}`,
          permanent: true,
        });
      }
    }
  }
  return rules;
}

const nextConfig: NextConfig = {
  output: "standalone",
  allowedDevOrigins: ["127.0.0.1", "localhost"],
  cacheComponents: true,
  partialPrefetching: true,
  async redirects() {
    return [
      {
        source: "/products/afb-enerji",
        destination: "/products/afb",
        permanent: true,
      },
      {
        source: "/products/afb-enerji/:id",
        destination: "/products/afb/:id",
        permanent: true,
      },
      ...productCategoryRedirects(),
    ];
  },
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "media.licdn.com" },
      { protocol: "https", hostname: "sfaelectric.com" },
      { protocol: "https", hostname: "elkoelektrik.com.tr" },
      { protocol: "https", hostname: "afbenerji.com" },
    ],
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
