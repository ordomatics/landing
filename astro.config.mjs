import { defineConfig } from "astro/config";

export default defineConfig({
    site: "https://ordomatics.com",
    i18n: { defaultLocale: "en", locales: ["en", "fr"], routing: { prefixDefaultLocale: false } },
});
