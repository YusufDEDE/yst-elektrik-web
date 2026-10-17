import { Battery, Cpu, Sun, Zap, type LucideIcon } from "lucide-react";

export type HomeServiceCard = {
  titleKey: string;
  descKey: string;
  href: string;
  image: string;
  icon: LucideIcon;
  color: string;
  bg: string;
  border: string;
  delay: string;
};

/** Mirror `bc58c073` ServicesSection card config. */
export const homeServiceCards: HomeServiceCard[] = [
  {
    titleKey: "svc.solar.title",
    descKey: "svc.solar.card_desc",
    href: "/services/solar",
    image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800&q=80",
    icon: Sun,
    color: "#f59e0b",
    bg: "rgba(245,158,11,0.1)",
    border: "rgba(245,158,11,0.2)",
    delay: "0s",
  },
  {
    titleKey: "svc.bess.title",
    descKey: "svc.bess.card_desc",
    href: "/services/bess",
    image: "/assets/images/services/bess_storage.jpg",
    icon: Battery,
    color: "#8b5cf6",
    bg: "rgba(139,92,246,0.1)",
    border: "rgba(139,92,246,0.2)",
    delay: "0.1s",
  },
  {
    titleKey: "nav.svc.hv",
    descKey: "svc.high-voltage.card_desc",
    href: "/services/high-voltage",
    image: "/assets/images/services/high_voltage.jpg",
    icon: Zap,
    color: "#2563eb",
    bg: "rgba(37,99,235,0.1)",
    border: "rgba(37,99,235,0.2)",
    delay: "0.2s",
  },
  {
    titleKey: "nav.svc.iot",
    descKey: "svc.iot-solar.card_desc",
    href: "/services/iot-solar",
    image: "/assets/images/services/iot_monitoring.jpg",
    icon: Cpu,
    color: "#06b6d4",
    bg: "rgba(6,182,212,0.1)",
    border: "rgba(6,182,212,0.2)",
    delay: "0.3s",
  },
];
