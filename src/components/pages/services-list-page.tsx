"use client";

import { homeServiceCards } from "@/lib/home/service-cards";
import { useMirrorT } from "@/lib/i18n/use-mirror-t";
import Image from "next/image";
import Link from "next/link";

export function ServicesListPage() {
  const { t } = useMirrorT();

  return (
    <div className="mx-auto max-w-6xl px-6 pb-20 pt-28" style={{ paddingTop: 200 }}>
      <span className="section-label">{t("home.services.label")}</span>
      <h1 className="mt-4 text-4xl font-extrabold tracking-tight md:text-5xl">
        {t("home.services.title1")}{" "}
        <span style={{ color: "#34d399" }}>{t("home.services.title2")}</span>
      </h1>
      <p className="mt-4 max-w-2xl text-lg" style={{ color: "var(--text-secondary)" }}>
        {t("home.services.subtitle")}
      </p>
      <div className="mt-12 grid gap-6 md:grid-cols-2">
        {homeServiceCards.map((card) => (
          <Link
            key={card.href}
            href={card.href}
            className="glass-card overflow-hidden rounded-2xl no-underline"
          >
            <div className="relative h-52">
              <Image src={card.image} alt={t(card.titleKey)} fill className="object-cover" sizes="500px" />
            </div>
            <div className="p-6">
              <h2 className="text-xl font-bold">{t(card.titleKey)}</h2>
              <p className="mt-2 text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                {t(card.descKey)}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
