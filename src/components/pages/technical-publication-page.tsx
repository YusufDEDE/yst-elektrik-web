"use client";

import { useLang } from "@/providers/lang-provider";
import { useMirrorT } from "@/lib/i18n/use-mirror-t";
import Link from "next/link";

export function TechnicalPublicationPage({
  titleKey,
  descriptionTr,
  descriptionEn,
  descriptionDe,
}: {
  titleKey: string;
  descriptionTr: string;
  descriptionEn: string;
  descriptionDe: string;
}) {
  const { t } = useMirrorT();
  const { lang } = useLang();
  const desc = lang === "en" ? descriptionEn : lang === "de" ? descriptionDe : descriptionTr;

  return (
    <div className="site-content-top" style={{ paddingBottom: "4rem", background: "var(--bg-page)" }}>
      <div style={{ maxWidth: 720, margin: "0 auto", padding: "0 1.5rem" }}>
        <h1 style={{ margin: "0 0 1rem", fontSize: "1.75rem", fontWeight: 800, color: "var(--text-primary)" }}>
          {t(titleKey)}
        </h1>
        <p style={{ color: "var(--text-secondary)", lineHeight: 1.7 }}>{desc}</p>
        <Link href="/contact" className="btn-primary-custom" style={{ marginTop: "1.5rem" }}>
          {t("nav.contact.cta")}
        </Link>
      </div>
    </div>
  );
}
