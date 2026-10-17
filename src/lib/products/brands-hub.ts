import type { ProductBrand } from "@/lib/products/types";

export type BrandsHubEntry = {
  id: string;
  productBrand: ProductBrand;
  name: string;
  descKey: string;
  color: string;
  logo: string;
  certificate: string | null;
};

/** Prod /products — Markalarımız kartları (748f32e37852d592.js) */
export const brandsHubEntries: BrandsHubEntry[] = [
  {
    id: "sfa",
    productBrand: "sfa",
    name: "SFA",
    descKey: "brands.sfa.desc",
    color: "#22c55e",
    logo: "/assets/images/logo/logo_sfa_electric.png",
    certificate: "/assets/pdf/sfa_authorization.pdf",
  },
  {
    id: "demofire",
    productBrand: "demofire",
    name: "Demofire",
    descKey: "brands.demofire.desc",
    color: "#ef4444",
    logo: "/assets/images/logo/logo_demofire.png",
    certificate: null,
  },
  {
    id: "afb-enerji",
    productBrand: "afb",
    name: "AFB Enerji",
    descKey: "brands.afb.desc",
    color: "#3b82f6",
    logo: "/assets/images/logo/logo_afb.png",
    certificate: "/assets/pdf/afb_enerji_authorization.pdf",
  },
  {
    id: "elko",
    productBrand: "elko",
    name: "Elko",
    descKey: "brands.elko.desc",
    color: "#0055a5",
    logo: "/assets/images/logo/logo_elko.png",
    certificate: null,
  },
];

export function brandHubProductHref(entry: BrandsHubEntry): string {
  return `/products/${entry.productBrand}`;
}
