export type FireRecommendation = {
  system: string;
  reason: string;
  standard: string;
  icon: string;
};

export const FIRE_RECOMMENDATIONS: Record<string, FireRecommendation> = {
  "datacenter-no": {
    system: "FM-200 (HFC-227ea) Gazlı Söndürme",
    reason: "Elektronik ekipmanlara zarar vermeden hızlı söndürme sağlar.",
    standard: "NFPA 2001 / TS EN 15004",
    icon: "🖥️",
  },
  "datacenter-yes": {
    system: "Inert Gas (IG-541 / IG-55) Sistemi",
    reason: "İnsan güvenliğine uygun, elektroniği koruyucu inert gaz.",
    standard: "NFPA 2001 / ISO 14520",
    icon: "🖥️",
  },
  warehouse: {
    system: "Yüksek Basınçlı Su Sisi Sistemi",
    reason: "Büyük hacimlerde etkili, düşük su tüketimli çözüm.",
    standard: "NFPA 750 / TS EN 14972",
    icon: "🏭",
  },
  office: {
    system: "Sprinkler + Algılama Sistemi",
    reason: "İnsan güvenliğini ön planda tutan standart ofis çözümü.",
    standard: "EN 12845 / NFPA 13",
    icon: "🏢",
  },
  "industrial-low": {
    system: "Kuru Kimyasal Toz Söndürme",
    reason: "Geniş kaplama alanı, mekanik ekipman koruması.",
    standard: "TS EN 12416",
    icon: "🏗️",
  },
  "industrial-high": {
    system: "Köpük Söndürme Sistemi (AFFF/AR)",
    reason: "Yanıcı sıvı ve patlayıcı ortamlarda en etkili çözüm.",
    standard: "NFPA 11 / EN 13565",
    icon: "⚙️",
  },
  parking: {
    system: "Su Sisi veya Sprinkler Sistemi",
    reason: "Araç yangınlarına karşı kanıtlanmış, dayanıklı çözüm.",
    standard: "EN 12845 / NFPA 13",
    icon: "🅿️",
  },
  kitchen: {
    system: "Ansul / K-Tipi Mutfak Söndürme",
    reason: "Yağ yangınlarına (Sınıf K/F) özel soğutma formülü.",
    standard: "NFPA 96 / UL 300",
    icon: "🍳",
  },
  default: {
    system: "Sprinkler + Algılama Sistemi",
    reason: "Genel amaçlı, çok yönlü yangın söndürme altyapısı.",
    standard: "EN 12845 / NFPA 13",
    icon: "🔥",
  },
};

export type FireWizardOption = { label: string; value: string; desc?: string };

export type FireWizardStep = {
  id: string;
  question: string;
  options: FireWizardOption[];
};

export const FIRE_WIZARD_STEPS: FireWizardStep[] = [
  {
    id: "space",
    question: "Alan türünü seçin",
    options: [
      { label: "Veri Merkezi / Server Odası", value: "datacenter", desc: "Elektronik ekipmanların bulunduğu alanlar" },
      { label: "Depo / Lojistik Merkezi", value: "warehouse", desc: "Açık raflı, yüksek tavanlı alanlar" },
      { label: "Ofis / Ticari Alan", value: "office", desc: "İnsan yoğunluğu yüksek çalışma alanları" },
      { label: "Sanayi / Üretim Tesisi", value: "industrial", desc: "Makine ve üretim ekipmanları içeren alanlar" },
      { label: "Araç Parkı / Kapalı Garaj", value: "parking", desc: "Araç ve yakıt içeren kapalı alanlar" },
      { label: "Mutfak / Yemek Hazırlama", value: "kitchen", desc: "Yağlı duman ve yüksek ısı kaynaklı alanlar" },
    ],
  },
  {
    id: "size",
    question: "Alan büyüklüğü nedir?",
    options: [
      { label: "Küçük  (< 100 m²)", value: "small" },
      { label: "Orta   (100–500 m²)", value: "medium" },
      { label: "Büyük  (500–2000 m²)", value: "large" },
      { label: "Çok Büyük (> 2000 m²)", value: "xlarge" },
    ],
  },
  {
    id: "risk",
    question: "Yangın tehlike sınıfı nedir?",
    options: [
      { label: "Düşük Tehlike", value: "low", desc: "Kağıt, mobilya, az yanıcı malzeme" },
      { label: "Orta Tehlike", value: "medium", desc: "Plastik, boyalar, elektronik" },
      { label: "Yüksek Tehlike", value: "high", desc: "Yanıcı sıvılar, gazlar, patlayıcı ortam" },
    ],
  },
  {
    id: "people",
    question: "Alanda sürekli insan bulunuyor mu?",
    options: [
      { label: "Evet, yoğun insan trafiği var", value: "yes" },
      { label: "Hayır, otomasyon / uzaktan izleme", value: "no" },
    ],
  },
];

export function resolveFireRecommendation(answers: Record<string, string>): FireRecommendation {
  const space = answers.space || "";
  const risk = answers.risk || "low";
  const people = answers.people || "yes";
  const keyPeople = `${space}-${people}`;
  const keyRisk = `${space}-${risk}`;
  return (
    FIRE_RECOMMENDATIONS[keyPeople] ||
    FIRE_RECOMMENDATIONS[keyRisk] ||
    FIRE_RECOMMENDATIONS[space] ||
    FIRE_RECOMMENDATIONS.default
  );
}
