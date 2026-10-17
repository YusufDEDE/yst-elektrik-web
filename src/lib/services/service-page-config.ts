import type { ServiceSlug } from "@/lib/site-config";
import { serviceImages } from "@/lib/site-config";
import { Battery, Cpu, Flame, Sun, Zap, type LucideIcon } from "lucide-react";

export type ServicePageVisual = {
  /** Key segment in mirror catalog: `svc.${catalogKey}.*` */
  catalogKey: string;
  heroImage: string;
  accentColor: string;
  accentBg: string;
  accentBorder: string;
  icon: LucideIcon;
};

export const servicePageConfig: Record<ServiceSlug, ServicePageVisual> = {
  solar: {
    catalogKey: "solar",
    heroImage:
      "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=1600&q=80",
    accentColor: "#f59e0b",
    accentBg: "rgba(245,158,11,0.1)",
    accentBorder: "rgba(245,158,11,0.2)",
    icon: Sun,
  },
  bess: {
    catalogKey: "bess",
    heroImage: serviceImages.bess,
    accentColor: "#8b5cf6",
    accentBg: "rgba(139,92,246,0.1)",
    accentBorder: "rgba(139,92,246,0.2)",
    icon: Battery,
  },
  "high-voltage": {
    catalogKey: "high-voltage",
    heroImage: serviceImages["high-voltage"],
    accentColor: "#2563eb",
    accentBg: "rgba(37,99,235,0.1)",
    accentBorder: "rgba(37,99,235,0.2)",
    icon: Zap,
  },
  "iot-solar": {
    catalogKey: "iot",
    heroImage: serviceImages["iot-solar"],
    accentColor: "#06b6d4",
    accentBg: "rgba(6,182,212,0.1)",
    accentBorder: "rgba(6,182,212,0.2)",
    icon: Cpu,
  },
  "fire-suppression": {
    catalogKey: "fire",
    heroImage: serviceImages["fire-suppression"],
    accentColor: "#ef4444",
    accentBg: "rgba(239,68,68,0.1)",
    accentBorder: "rgba(239,68,68,0.2)",
    icon: Flame,
  },
};
