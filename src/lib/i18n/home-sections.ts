import type { Lang } from "@/lib/i18n";

/** Gallery + LinkedIn section copy (from mirror TR/EN/DE renders). */
export const homeSections: Record<
  Lang,
  {
    galleryLabel: string;
    galleryTitle1: string;
    galleryTitle2: string;
    galleryDesc: string;
    galleryCta: string;
    filterAll: string;
    filterVideos: string;
    filterPhotos: string;
    linkedinLabel: string;
    linkedinTitle: string;
    linkedinDesc: string;
    linkedinFollow: string;
    faqLabel: string;
    faqViewAll: string;
  }
> = {
  tr: {
    galleryLabel: "GALERİ",
    galleryTitle1: "Sahadan",
    galleryTitle2: "Kareler",
    galleryDesc:
      "YST Elektrik saha uygulamalarımız ve enerji altyapı projelerimizden kesitler.",
    galleryCta: "Tüm Projeleri İncele",
    filterAll: "Tümü",
    filterVideos: "Videolar",
    filterPhotos: "Fotoğraflar",
    linkedinLabel: "LinkedIn",
    linkedinTitle: "Son Paylaşımlar",
    linkedinDesc: "Sektörden haberler ve YST Elektrik güncellemeleri",
    linkedinFollow: "Profili Takip Et",
    faqLabel: "SSS",
    faqViewAll: "Tüm Soruları Gör",
  },
  en: {
    galleryLabel: "GALLERY",
    galleryTitle1: "Captured from",
    galleryTitle2: "the Field",
    galleryDesc:
      "Visuals from our energy infrastructure projects and electrical engineering operations in the field.",
    galleryCta: "Explore All Projects",
    filterAll: "All",
    filterVideos: "Videos",
    filterPhotos: "Photos",
    linkedinLabel: "LinkedIn",
    linkedinTitle: "Latest Posts",
    linkedinDesc: "Industry news and updates from YST Elektrik",
    linkedinFollow: "Follow Profile",
    faqLabel: "FAQ",
    faqViewAll: "View All Questions",
  },
  de: {
    galleryLabel: "GALERIE",
    galleryTitle1: "Eindrücke",
    galleryTitle2: "aus dem Feld",
    galleryDesc:
      "Einblicke in unsere Energieinfrastrukturprojekte und Einsätze im Feld.",
    galleryCta: "Alle Projekte ansehen",
    filterAll: "Alle",
    filterVideos: "Videos",
    filterPhotos: "Fotos",
    linkedinLabel: "LinkedIn",
    linkedinTitle: "Neueste Beiträge",
    linkedinDesc: "Branchennews und Updates von YST Elektrik",
    linkedinFollow: "Profil folgen",
    faqLabel: "FAQ",
    faqViewAll: "Alle Fragen ansehen",
  },
};
