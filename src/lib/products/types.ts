import type { Lang } from "@/lib/i18n";

export type LocalizedString = Record<Lang, string>;

export type ProductCategory = {
  id: string;
  name: LocalizedString;
  image?: string;
  sfaUrl?: string;
  subcategories?: { id: string; name: LocalizedString }[];
};

export type ProductRecord = {
  id: string;
  categoryId: string;
  subcategoryId?: string | null;
  title: LocalizedString;
  description: LocalizedString;
  longDescription?: LocalizedString;
  image?: string;
  gallery?: string[];
  features?: Partial<Record<Lang, string[]>>;
  specs?: Record<string, string | undefined>;
  sfaUrl?: string;
  catalogUrl?: string;
};

export type ProductCatalog = {
  categories: ProductCategory[];
  products: ProductRecord[];
};

export type ProductBrand = "sfa" | "demofire" | "afb" | "elko";

export type NavLinkNode = {
  label: string;
  href?: string;
  children?: NavLinkNode[];
};
