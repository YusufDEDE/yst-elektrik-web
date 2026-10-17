import type { LocalizedString, ProductBrand } from "@/lib/products/types";

export type BrandListTheme = {
  accent: string;
  heroDark: string;
  heroLight: string;
  radial: string;
  backLinkHover: string;
  title: LocalizedString;
  description: LocalizedString;
  logoSrc: string;
  logoAlt: string;
  /** Demofire: white pill behind logo; Elko: padded white on logo img */
  logoVariant: "plain" | "pill" | "elko";
};

export const brandListThemes: Record<ProductBrand, BrandListTheme> = {
  sfa: {
    accent: "#22c55e",
    heroDark:
      "linear-gradient(135deg, #0a0f1e 0%, #0a2e19 40%, #0d4a25 70%, #062312 100%)",
    heroLight:
      "linear-gradient(135deg, #0b1a2a 0%, #104222 40%, #177038 70%, #0c331a 100%)",
    radial:
      "radial-gradient(ellipse at 20% 40%, rgba(34,197,94,0.15) 0%, transparent 50%), radial-gradient(ellipse at 80% 20%, rgba(59,130,246,0.1) 0%, transparent 50%)",
    backLinkHover: "#22c55e",
    title: {
      tr: "SFA Elektromekanik Çözümleri",
      en: "SFA Electromechanical Solutions",
      de: "SFA Elektromechanische Lösungen",
    },
    description: {
      tr: "SFA Electric güvencesiyle sunulan, uluslararası standartlara uygun orta gerilim ve trafo ürün gamı.",
      en: "Our innovative MV and transformer range, guaranteed by SFA Electric and compliant with international standards.",
      de: "Innovatives MS- und Transformator-Portfolio von SFA Electric, konform mit internationalen Standards.",
    },
    logoSrc: "/assets/images/logo/logo_sfa_electric.png",
    logoAlt: "SFA Electric",
    logoVariant: "plain",
  },
  demofire: {
    accent: "#ef4444",
    heroDark:
      "linear-gradient(135deg, #0a0f1e 0%, #2e0a0a 40%, #4a0d0d 70%, #230606 100%)",
    heroLight:
      "linear-gradient(135deg, #0b1a2a 0%, #421010 40%, #701717 70%, #330c0c 100%)",
    radial:
      "radial-gradient(ellipse at 20% 40%, rgba(239,68,68,0.15) 0%, transparent 50%), radial-gradient(ellipse at 80% 20%, rgba(59,130,246,0.1) 0%, transparent 50%), radial-gradient(ellipse at 50% 90%, rgba(244,63,94,0.1) 0%, transparent 50%)",
    backLinkHover: "#ef4444",
    title: {
      tr: "Demofire Yangın Söndürme Sistemleri",
      en: "Demofire Suppression Systems",
      de: "Demofire Löschsysteme",
    },
    description: {
      tr: "YST Elektrik güvencesiyle sunulan, uluslararası standartlara uygun, yenilikçi ve yüksek söndürme hızlı yangın koruma çözümlerimiz.",
      en: "Our innovative and high-performance fire suppression product range, guaranteed by YST Electric and compliant with international standards.",
      de: "Unser innovatives und leistungsstarkes Brandlöschanlagen-Produktportfolio, garantiert von YST Elektrik und konform mit internationalen Standards.",
    },
    logoSrc: "/assets/images/logo/logo_demofire.png",
    logoAlt: "Demofire",
    logoVariant: "pill",
  },
  afb: {
    accent: "#3b82f6",
    heroDark:
      "linear-gradient(135deg, #0a0f1e 0%, #0d2240 40%, #0e356b 70%, #07162d 100%)",
    heroLight:
      "linear-gradient(135deg, #0b1a2a 0%, #103460 40%, #174b8a 70%, #0a2342 100%)",
    radial:
      "radial-gradient(ellipse at 20% 40%, rgba(59,130,246,0.18) 0%, transparent 50%), radial-gradient(ellipse at 80% 20%, rgba(99,102,241,0.12) 0%, transparent 50%), radial-gradient(ellipse at 50% 90%, rgba(37,99,235,0.1) 0%, transparent 50%)",
    backLinkHover: "#3b82f6",
    title: {
      tr: "AFB Enerji Güç ve Dağıtım Sistemleri",
      en: "AFB Energy Systems",
      de: "AFB Enerji Stromsysteme",
    },
    description: {
      tr: "Alçak Gerilim pano hücreleri, kompakt trafo merkezleri, konteyner tipi güç merkezleri ve UMAY elektrikli araç şarj istasyonu çözümlerimiz.",
      en: "Our low voltage switchgear blocks, concrete compact substations, containerized e-houses, and UMAY EV charging infrastructure.",
      de: "Alçak Gerilim panoları, sac-beton trafo merkezleri, mobil güç istasyonları ve yenilikçi UMAY şarj istasyonları çözümlerimiz.",
    },
    logoSrc: "/assets/images/logo/logo_afb.png",
    logoAlt: "AFB Enerji",
    logoVariant: "plain",
  },
  elko: {
    accent: "#0055a5",
    heroDark:
      "linear-gradient(135deg, #0a0f1e 0%, #031c3c 40%, #003366 70%, #001a33 100%)",
    heroLight:
      "linear-gradient(135deg, #0b1a2a 0%, #052a55 40%, #0055a5 70%, #003366 100%)",
    radial:
      "radial-gradient(ellipse at 20% 40%, rgba(0,85,165,0.15) 0%, transparent 50%), radial-gradient(ellipse at 80% 20%, rgba(59,130,246,0.1) 0%, transparent 50%), radial-gradient(ellipse at 50% 90%, rgba(0,51,102,0.1) 0%, transparent 50%)",
    backLinkHover: "#0055a5",
    title: {
      tr: "Elko Orta & Yüksek Gerilim Güç Çözümleri",
      en: "Elko MV & HV Power Solutions",
      de: "Elko Mittel- & Hochspannungslösungen",
    },
    description: {
      tr: "Elko güvencesiyle sunulan, uluslararası standartlara uygun, yenilikçi ve yüksek performanslı Orta Gerilim (MV) ve Trafo Merkezleri ürün yelpazemiz.",
      en: "Our innovative and high-performance Medium Voltage (MV) and Transformer substation product range, compliant with international standards.",
      de: "Unser innovatives und leistungsstarkes Mittelspannungs- (MV) und Transformatorstationen-Produktportfolio, konform mit internationalen Standards.",
    },
    logoSrc: "/assets/images/logo/logo_elko.png",
    logoAlt: "Elko Elektrik",
    logoVariant: "elko",
  },
};
