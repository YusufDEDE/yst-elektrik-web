import type { Lang } from "@/lib/i18n";
import type { LocalizedString } from "@/lib/products/types";

export function localized(value: LocalizedString | Partial<LocalizedString>, lang: Lang): string {
  return value[lang] ?? value.tr ?? value.en ?? value.de ?? "";
}
