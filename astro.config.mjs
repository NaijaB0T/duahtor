// @ts-check
import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";

import cloudflare from "@astrojs/cloudflare";

// https://astro.build/config
export default defineConfig({
  site: "https://example.com",
  integrations: [mdx(), sitemap()],
  adapter: cloudflare({
    platformProxy: {
      enabled: true,
    },
    runtime: {
      mode: "local",
      type: "pages",
      bindings: {
        DB: {
          type: "d1",
          database_id: "d47e71d8-ef37-470e-b6a3-8c966d45003a"
        }
      }
    }
  }),
});
