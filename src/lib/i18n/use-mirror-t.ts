"use client";

import mirrorCatalog from "@/lib/i18n/mirror-catalog.json";
import { useLang } from "@/providers/lang-provider";
import { useCallback } from "react";

type Localized = { tr: string; en: string; de: string };

export function useMirrorT() {
  const { lang } = useLang();

  const t = useCallback(
    (key: string) => {
      const table = mirrorCatalog[lang] as Record<string, string>;
      const fallback = mirrorCatalog.tr as Record<string, string>;
      return table[key] ?? fallback[key] ?? key;
    },
    [lang],
  );

  const tl = useCallback(
    <T extends Localized>(obj: T) => obj[lang],
    [lang],
  );

  return { t, tl, lang };
}
