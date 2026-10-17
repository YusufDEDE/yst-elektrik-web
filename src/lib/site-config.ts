/** Same as yst.com.tr HeroSection (Pixabay); poster shows when CDN blocks playback. */
export const heroBackgroundVideoSrc =
  "https://cdn.pixabay.com/video/2020/06/15/42079-429994080_large.mp4";
export const heroBackgroundPoster =
  "/assets/images/hero-poster.jpg";

/** Prod-style placeholder when a product/media URL is missing or fails to load. */
export const defaultFallbackImageSrc =
  "/assets/images/logo/logo_yst_circle.png";

export const siteConfig = {
  name: "YST Elektrik",
  legalName: "YST Elektrik",
  copyrightYear: 2026,
  url: "https://yst.com.tr",
  email: "yusuf.topgac@yst.com.tr",
  phone: "+90 (232) 459 65 65",
  phoneTel: "+902324596565",
  address:
    "Adalet Mah.Manas Bulv. No:47/B K:26 D:2601 Folkart Towers A Kule 35530, Bayraklı/İzmir, Türkiye",
  linkedin: "https://www.linkedin.com/in/yusuf-süreyya-topgaç-25426360/",
  youtube: "https://www.youtube.com/@yusuftopgac3729",
} as const;

/** Prod ContactPageClient `company` / map tooltip `CONTACT_URLS`. */
export const contactCompany = {
  phoneDisplay: siteConfig.phone,
  phone: `tel:${siteConfig.phoneTel}`,
  emailDisplay: siteConfig.email,
  email: `mailto:${siteConfig.email}`,
  address: siteConfig.address,
} as const;

export const contactUrls = {
  address: siteConfig.address,
  phone: `tel:${siteConfig.phoneTel}`,
  email: `mailto:${siteConfig.email}`,
} as const;

export type ServiceSlug =
  | "solar"
  | "iot-solar"
  | "high-voltage"
  | "bess"
  | "fire-suppression";

export type ToolSlug =
  | "solar-calculator"
  | "bill-savings"
  | "bess-calculator"
  | "carbon-calculator"
  | "electricity-prices"
  | "fire-system-selector"
  | "quick-quote";

export const serviceSlugs: ServiceSlug[] = [
  "solar",
  "iot-solar",
  "high-voltage",
  "bess",
  "fire-suppression",
];

export const toolSlugs: ToolSlug[] = [
  "solar-calculator",
  "bill-savings",
  "bess-calculator",
  "carbon-calculator",
  "electricity-prices",
  "fire-system-selector",
  "quick-quote",
];

export const serviceImages: Record<ServiceSlug, string> = {
  solar: "/assets/field-assets/field_image_1.jpeg",
  "iot-solar": "/assets/images/services/iot_monitoring.jpg",
  "high-voltage": "/assets/images/services/high_voltage.jpg",
  bess: "/assets/images/services/bess_storage.jpg",
  "fire-suppression": "/assets/field-assets/field_image_4.jpeg",
};
