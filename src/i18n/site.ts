import { en } from "./en";
import { fr } from "./fr";

export type Lang = "en" | "fr";
export type Page = "home" | "services" | "about" | "jobs" | "contact";

export const content = { en, fr };
export const EMAIL = "salam@ordomatics.com";
// Commission sales roles apply to the product's own address, not Ordomatics' hiring inbox.
export const SMARTACUS_JOBS_EMAIL = "jobs@smartacus.pro";
export const WHATSAPP = "https://wa.me/221773649575";
export const SAAS = "https://saas.ordomatics.com";
export const DOCS = "https://docs.ordomatics.com";
export const PORTAL = "https://odoo.ordomatics.com";
export const LEAD_ENDPOINT = `${PORTAL}/lead`;

const SLUG: Record<Page, string> = { home: "", services: "services/", about: "about/", jobs: "jobs/", contact: "contact/" };

export function url(lang: Lang, page: Page, hash = ""): string {
    return `${lang === "fr" ? "/fr" : ""}/${SLUG[page]}${hash}`;
}

export function langPaths(): { params: { lang: string | undefined }; props: { lang: Lang } }[] {
    return [
        { params: { lang: undefined }, props: { lang: "en" } },
        { params: { lang: "fr" }, props: { lang: "fr" } },
    ];
}
