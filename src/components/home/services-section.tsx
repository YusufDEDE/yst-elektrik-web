"use client";

import { homeServiceCards } from "@/lib/home/service-cards";
import { useMirrorT } from "@/lib/i18n/use-mirror-t";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export function ServicesSection() {
  const { t } = useMirrorT();

  return (
    <section
      id="hizmetler"
      style={{
        background: "var(--bg-page)",
        padding: "7rem 0",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 1.5rem" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            marginBottom: "4rem",
            flexWrap: "wrap",
            gap: "2rem",
          }}
        >
          <div style={{ maxWidth: 600 }}>
            <span className="section-label" style={{ marginBottom: "1rem" }}>
              {t("home.services.label")}
            </span>
            <h2
              style={{
                fontSize: "clamp(2rem, 3.5vw, 2.75rem)",
                fontWeight: 800,
                letterSpacing: "-0.03em",
                lineHeight: 1.1,
                color: "var(--text-primary)",
                margin: "0.75rem 0 1rem",
              }}
            >
              {t("home.services.title1")}{" "}
              <span style={{ color: "#34d399" }}>{t("home.services.title2")}</span>
            </h2>
            <p
              style={{
                fontSize: "1.05rem",
                color: "var(--text-secondary)",
                lineHeight: 1.6,
                margin: 0,
              }}
            >
              {t("home.services.subtitle")}
            </p>
          </div>
          <Link href="/services" className="btn-outline-custom">
            {t("home.services.viewAll")}
            <ArrowRight size={14} />
          </Link>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: "1.5rem",
          }}
        >
          {homeServiceCards.map((card) => {
            const Icon = card.icon;
            return (
              <div
                key={card.href}
                className="glass-card glass-card-hover"
                style={{
                  position: "relative",
                  borderRadius: "1.25rem",
                  overflow: "hidden",
                  display: "flex",
                  flexDirection: "column",
                  animation: `svcCardIn 0.5s ${card.delay} ease both`,
                }}
              >
                <div
                  style={{
                    position: "relative",
                    height: 200,
                    width: "100%",
                    overflow: "hidden",
                  }}
                >
                  <Image
                    src={card.image}
                    alt={t(card.titleKey)}
                    fill
                    sizes="(max-width:768px) 100vw, 400px"
                    style={{
                      objectFit: "cover",
                      transition: "transform 0.5s ease",
                    }}
                  />
                </div>
                <div
                  style={{
                    position: "absolute",
                    top: 178,
                    right: "1.5rem",
                    width: 44,
                    height: 44,
                    borderRadius: "0.75rem",
                    background: "var(--bg-card)",
                    border: `1px solid ${card.border}`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: card.color,
                    boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
                    zIndex: 10,
                  }}
                >
                  <Icon size={24} />
                </div>
                <div
                  style={{
                    padding: "2.5rem 1.5rem 1.5rem",
                    display: "flex",
                    flexDirection: "column",
                    flex: 1,
                  }}
                >
                  <h3
                    style={{
                      margin: "0 0 0.75rem",
                      fontSize: "1.125rem",
                      fontWeight: 700,
                      color: "var(--text-primary)",
                      lineHeight: 1.3,
                    }}
                  >
                    {t(card.titleKey)}
                  </h3>
                  <p
                    style={{
                      margin: "0 0 1.5rem",
                      fontSize: "0.9rem",
                      color: "var(--text-secondary)",
                      lineHeight: 1.5,
                      flex: 1,
                    }}
                  >
                    {t(card.descKey)}
                  </p>
                  <Link
                    href={card.href}
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "0.5rem",
                      fontSize: "0.875rem",
                      fontWeight: 700,
                      color: "#f59e0b",
                      textDecoration: "none",
                    }}
                  >
                    {t("home.services.moreInfo")}
                    <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
