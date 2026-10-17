import type { CSSProperties, FocusEvent } from "react";

export const toolInputStyle: CSSProperties = {
  padding: "0.75rem 1rem",
  background: "var(--bg-card)",
  border: "1px solid var(--border-card)",
  borderRadius: "0.75rem",
  fontSize: "0.9rem",
  color: "var(--text-primary)",
  fontFamily: "var(--font-sans)",
  outline: "none",
  width: "100%",
  boxSizing: "border-box",
  transition: "border-color 0.2s, box-shadow 0.2s",
};

export const toolLabelStyle: CSSProperties = {
  fontSize: "0.8125rem",
  fontWeight: 600,
  color: "var(--text-secondary)",
  marginBottom: "0.375rem",
  display: "block",
};

export function toolInputFocusHandlers(accent = "#2563eb", glow = "rgba(37,99,235,0.1)") {
  return {
    onFocus: (e: FocusEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
      e.currentTarget.style.borderColor = accent;
      e.currentTarget.style.boxShadow = `0 0 0 3px ${glow}`;
    },
    onBlur: (e: FocusEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
      e.currentTarget.style.borderColor = "var(--border-card)";
      e.currentTarget.style.boxShadow = "none";
    },
  };
}

export const SOLAR_CITIES: Record<
  string,
  { peak: number; label: string; lat: number; lon: number }
> = {
  istanbul: { peak: 1480, label: "İstanbul", lat: 41.01, lon: 28.95 },
  ankara: { peak: 1700, label: "Ankara", lat: 39.92, lon: 32.85 },
  izmir: { peak: 1820, label: "İzmir", lat: 38.42, lon: 27.14 },
  antalya: { peak: 1980, label: "Antalya", lat: 36.89, lon: 30.71 },
  bursa: { peak: 1560, label: "Bursa", lat: 40.18, lon: 29.06 },
  adana: { peak: 1920, label: "Adana", lat: 37, lon: 35.32 },
  konya: { peak: 1850, label: "Konya", lat: 37.87, lon: 32.49 },
  kayseri: { peak: 1790, label: "Kayseri", lat: 38.72, lon: 35.49 },
  trabzon: { peak: 1310, label: "Trabzon", lat: 41, lon: 39.72 },
  diyarbakir: { peak: 1960, label: "Diyarbakır", lat: 37.91, lon: 40.22 },
  samsun: { peak: 1340, label: "Samsun", lat: 41.29, lon: 36.33 },
  erzurum: { peak: 1640, label: "Erzurum", lat: 39.9, lon: 41.27 },
  gaziantep: { peak: 1940, label: "Gaziantep", lat: 37.07, lon: 37.38 },
  mersin: { peak: 1950, label: "Mersin", lat: 36.8, lon: 34.63 },
  mugla: { peak: 1900, label: "Muğla", lat: 37.21, lon: 28.37 },
};

export const BILL_TARIFFS = {
  konut: { name: "Konut (Mesken)", rate: 4.2 },
  isyeri: { name: "İşyeri / Ticarethane", rate: 5.8 },
  sanayi: { name: "Sanayi", rate: 4.95 },
} as const;

export const BILL_CITY_PEAK: Record<string, number> = {
  istanbul: 1480,
  ankara: 1700,
  izmir: 1820,
  antalya: 1980,
  bursa: 1560,
  adana: 1920,
  konya: 1850,
  kayseri: 1790,
  trabzon: 1310,
  diyarbakir: 1960,
  samsun: 1340,
  erzurum: 1640,
};

export const ELECTRICITY_BASE_HOURLY = [
  620, 590, 570, 560, 575, 610, 680, 760, 820, 870, 890, 880, 860, 845, 850, 870, 920, 980, 1010,
  990, 940, 870, 780, 690,
];
