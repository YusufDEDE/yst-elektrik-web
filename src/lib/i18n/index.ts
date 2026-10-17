import { de } from "./messages/de";
import { en } from "./messages/en";
import { tr } from "./messages/tr";
import type { Lang, Messages } from "./types";

export type { Lang, Messages };

const catalog: Record<Lang, Messages> = { tr, en, de };

export function getMessages(lang: Lang): Messages {
  return catalog[lang];
}

export const langs: Lang[] = ["tr", "en", "de"];
