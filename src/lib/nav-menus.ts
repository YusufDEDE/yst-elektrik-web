export type NavMenuItem = { href: string; labelKey: string };

export const servicesMenu: NavMenuItem[] = [
  { href: "/services/solar", labelKey: "nav.svc.solar" },
  { href: "/services/iot-solar", labelKey: "nav.svc.iot" },
  { href: "/services/bess", labelKey: "nav.svc.bess" },
  { href: "/services/fire-suppression", labelKey: "nav.svc.fire" },
  { href: "/services/high-voltage", labelKey: "nav.svc.hv" },
];

/** Publication — prod header (2026 mirror) lists TEDAŞ + EPDK routes. */
export const publicationMenu: NavMenuItem[] = [
  { href: "/technical-publications/tedas-specifications", labelKey: "nav.pub.tedas" },
  { href: "/technical-publications/epdk-decisions", labelKey: "nav.pub.epdk" },
];
