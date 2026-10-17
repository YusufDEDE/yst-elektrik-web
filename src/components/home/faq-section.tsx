"use client";

import { homeSections } from "@/lib/i18n/home-sections";
import { useLang } from "@/providers/lang-provider";
import { useMirrorT } from "@/lib/i18n/use-mirror-t";
import { ChevronDown } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const FAQ_COUNT = 5;

export function FaqSection() {
  const { t } = useMirrorT();
  const { lang } = useLang();
  const copy = homeSections[lang];
  const [open, setOpen] = useState(0);

  return (
    <section
      id="sss"
      style={{
        background: "var(--bg-page)",
        padding: "6rem 0",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 1.5rem" }}>
        <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
          <span className="section-label" style={{ marginBottom: "1rem" }}>
            {copy.faqLabel}
          </span>
          <h2
            style={{
              fontSize: "clamp(1.875rem, 4vw, 2.75rem)",
              fontWeight: 800,
              letterSpacing: "-0.03em",
              lineHeight: 1.15,
              color: "var(--text-primary)",
              margin: "0.75rem 0 0",
            }}
          >
            {t("faq.heading")}
          </h2>
        </div>
        <div
          style={{
            maxWidth: 860,
            margin: "0 auto",
            border: "1px solid var(--border-card)",
            borderRadius: "1rem",
            overflow: "hidden",
          }}
        >
          {Array.from({ length: FAQ_COUNT }, (_, i) => {
            const isOpen = open === i;
            return (
              <div key={i} className="faq-item">
                <button
                  type="button"
                  className="faq-trigger"
                  onClick={() => setOpen(isOpen ? -1 : i)}
                  style={{ color: isOpen ? "#2563eb" : undefined }}
                >
                  <span style={{ paddingRight: "1rem" }}>{t(`faq.${i}.question`)}</span>
                  <span
                    style={{
                      flexShrink: 0,
                      width: 28,
                      height: 28,
                      borderRadius: "50%",
                      background: isOpen ? "#2563eb" : "transparent",
                      border: `1px solid ${isOpen ? "#2563eb" : "var(--border-card)"}`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: isOpen ? "#fff" : "var(--text-muted)",
                      transition: "background 0.2s",
                    }}
                  >
                    <ChevronDown
                      size={16}
                      style={{
                        transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                        transition: "transform 0.2s",
                      }}
                    />
                  </span>
                </button>
                {isOpen ? (
                  <div className="faq-content">{t(`faq.${i}.answer`)}</div>
                ) : null}
              </div>
            );
          })}
        </div>
        <div style={{ textAlign: "center", marginTop: "2rem" }}>
          <Link href="/about#faq" className="btn-outline-custom">
            {copy.faqViewAll}
          </Link>
        </div>
      </div>
    </section>
  );
}
