import type { Lang } from "@/lib/i18n";
import { getCatalog, getProductsByCategory } from "@/lib/products/catalog";
import { localized } from "@/lib/products/localized";
import type { NavLinkNode, ProductBrand, ProductCategory } from "@/lib/products/types";

function demofireByCategory(categoryId: string) {
  return getCatalog("demofire").products.filter((p) => p.categoryId === categoryId);
}

function afbByCategory(categoryId: string) {
  return getCatalog("afb").products.filter((p) => p.categoryId === categoryId);
}

function productLeaves(
  brand: ProductBrand,
  categoryId: string,
  lang: Lang,
): NavLinkNode[] {
  return getProductsByCategory(brand, categoryId).map((p) => ({
    label: localized(p.title, lang),
    href: `/products/${brand}/${p.id}`,
  }));
}

function categoryWithProducts(
  brand: ProductBrand,
  cat: ProductCategory,
  lang: Lang,
  allPrefix: string,
): NavLinkNode {
  const products = getProductsByCategory(brand, cat.id);
  const count = products.length;
  const catLabel = localized(cat.name, lang);
  const label = `${catLabel} (${count})`;
  const listHref = `/products/${brand}?category=${cat.id}`;

  if (count === 0) {
    return { label, href: listHref };
  }
  if (count === 1) {
    return { label, href: `/products/${brand}/${products[0].id}` };
  }

  return {
    label,
    children: [
      ...products.map((p) => ({
        label: localized(p.title, lang),
        href: `/products/${brand}/${p.id}`,
      })),
      { label: `${allPrefix}${catLabel} →`, href: listHref },
    ],
  };
}

export function buildProductsNav(lang: Lang): NavLinkNode[] {
  const allBrands =
    lang === "de" ? "Alle Marken →" : lang === "en" ? "All Brands →" : "Tüm Markalar →";
  const allPrefix = lang === "de" ? "Alle " : lang === "en" ? "All " : "Tüm ";

  const sfaChildren: NavLinkNode[] = getCatalog("sfa").categories.map((cat) => {
    const products = getProductsByCategory("sfa", cat.id);
    const count = products.length;
    const catLabel = localized(cat.name, lang);

    if (cat.subcategories?.length) {
      return {
        label: `${catLabel} (${count})`,
        children: [
          ...cat.subcategories.map((sub) => {
            const subLabel = localized(sub.name, lang);
            const inSub = products.filter((p) => p.subcategoryId === sub.id);
            if (inSub.length === 0) {
              return { label: subLabel, href: `/products/sfa?category=${cat.id}` };
            }
            if (inSub.length === 1) {
              return { label: subLabel, href: `/products/sfa/${inSub[0].id}` };
            }
            return {
              label: subLabel,
              children: inSub.map((p) => ({
                label: localized(p.title, lang),
                href: `/products/sfa/${p.id}`,
              })),
            };
          }),
          { label: `${allPrefix}${catLabel} →`, href: `/products/sfa?category=${cat.id}` },
        ],
      };
    }

    return categoryWithProducts("sfa", cat, lang, allPrefix);
  });

  const elkoChildren: NavLinkNode[] = getCatalog("elko").categories.map((cat) =>
    categoryWithProducts("elko", cat, lang, allPrefix),
  );

  const endothermicLabel =
    lang === "de"
      ? "Endotherme Löschsysteme"
      : lang === "en"
        ? "Endothermic Suppression Systems"
        : "Endotermik Söndürme Sistemleri";

  const endothermicProducts = productLeaves("demofire", "endothermic-suppression", lang);
  const f500Cat = getCatalog("demofire").categories.find((c) => c.id === "f500-suppression");
  const f500CatLabel = f500Cat ? localized(f500Cat.name, lang) : "F500";

  const afbSections: { label: Record<Lang, string>; categoryId: string }[] = [
    {
      label: {
        tr: "AG Güç Dağıtım ve Kontrol",
        en: "LV Power Distribution & Control",
        de: "LV-Energieverteilung",
      },
      categoryId: "ag-guc-dagitim",
    },
    {
      label: {
        tr: "Şebeke Enerji Dağıtım",
        en: "Grid Energy Distribution",
        de: "Netzverteilung",
      },
      categoryId: "sebeke-enerji-dagitim",
    },
    {
      label: {
        tr: "Sac - Beton Trafo Merkezleri",
        en: "Substation Enclosures",
        de: "Umspannwerke",
      },
      categoryId: "trafo-merkezi",
    },
    {
      label: {
        tr: "Power Plant Uygulamaları",
        en: "Power Plant Applications",
        de: "Kraftwerk",
      },
      categoryId: "power-plant",
    },
  ];

  const afbChildren: NavLinkNode[] = [];
  for (const sec of afbSections) {
    const leaves = afbByCategory(sec.categoryId).map((p) => ({
      label: localized(p.title, lang),
      href: `/products/afb/${p.id}`,
    }));
    if (leaves.length > 0) {
      afbChildren.push({ label: sec.label[lang], children: leaves });
    }
  }
  const evLeaves = afbByCategory("ev-charger").map((p) => ({
    label: localized(p.title, lang),
    href: `/products/afb/${p.id}`,
  }));
  if (evLeaves.length > 0) {
    afbChildren.push({ label: "EV Charger (UMAY)", children: evLeaves });
  }

  const demofireChildren: NavLinkNode[] = [
    {
      label: endothermicLabel,
      children:
        endothermicProducts.length > 0
          ? endothermicProducts
          : demofireByCategory("endothermic-suppression").map((p) => ({
              label: localized(p.title, lang),
              href: `/products/demofire/${p.id}`,
            })),
    },
    ...(demofireByCategory("f500-suppression").length > 1
      ? [
          {
            label: f500CatLabel,
            children: productLeaves("demofire", "f500-suppression", lang),
          },
        ]
      : []),
    { label: "F500", href: "/products/demofire/f500" },
  ];

  return [
    { label: "SFA", children: sfaChildren },
    { label: "Demofire", children: demofireChildren },
    { label: "AFB Enerji", children: afbChildren },
    { label: "Elko", children: elkoChildren },
    { label: allBrands, href: "/products" },
  ];
}
