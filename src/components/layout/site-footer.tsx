"use client";

import { FooterBrandDisplay } from "@/components/layout/footer-brand-display";
import { PdfViewerModal } from "@/components/publications/pdf-viewer-modal";
import { servicesMenu } from "@/lib/nav-menus";
import { useMirrorT } from "@/lib/i18n/use-mirror-t";
import { useLang } from "@/providers/lang-provider";
import { useTheme } from "@/providers/theme-provider";
import { siteConfig } from "@/lib/site-config";
import { FileText, Mail, MapPin, Phone } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState, type CSSProperties, type ReactNode } from "react";

const FOOTER_PDFS = {
  yst: { src: "/assets/pdf/yst_quality_assurance.pdf", titleKey: "footer.cert.yst" as const },
  sfa: { src: "/assets/pdf/sfa_authorization.pdf", titleKey: "footer.cert.sfa" as const },
  afb: { src: "/assets/pdf/afb_enerji_authorization.pdf", titleKey: "footer.cert.afb" as const },
};

type PdfKey = keyof typeof FOOTER_PDFS;

function FooterColTitle({ children }: { children: ReactNode }) {
  return (
    <h4
      style={{
        fontSize: "0.6875rem",
        fontWeight: 700,
        letterSpacing: "0.1em",
        textTransform: "uppercase",
        color: "var(--text-muted)",
        margin: "0 0 1.25rem",
        paddingBottom: "0.75rem",
        borderBottom: "1px solid var(--border-card)",
      }}
    >
      {children}
    </h4>
  );
}

function FooterNavLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <li>
      <Link href={href} style={footerNavLinkStyle} className="footer-nav-link">
        {children}
      </Link>
    </li>
  );
}

function FooterCertButton({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <li>
      <button type="button" onClick={onClick} style={footerCertBtnStyle} className="footer-cert-btn">
        <FileText size={12} style={{ opacity: 0.6 }} />
        {label}
      </button>
    </li>
  );
}

function logoSubtitle(lang: "tr" | "en" | "de") {
  if (lang === "en") return "Renewable Energy & Electrical";
  if (lang === "de") return "Erneuerbare Energie & Elektrik";
  return "Yenilenebilir Enerji & Elektrik";
}

export function SiteFooter() {
  const { t } = useMirrorT();
  const { lang } = useLang();
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const [pdfModal, setPdfModal] = useState<PdfKey | null>(null);

  useEffect(() => {
    if (!pdfModal) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setPdfModal(null);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [pdfModal]);

  const corporateItems: ({ label: string; href: string } | { label: string; pdf: PdfKey })[] = [
    { label: t("footer.col.about"), href: "/about" },
    { label: t("footer.cert.yst"), pdf: "yst" },
    { label: t("footer.col.services"), href: "/#hizmetler" },
    { label: t("footer.cert.sfa"), pdf: "sfa" },
    { label: t("footer.cert.afb"), pdf: "afb" },
  ];

  const socialLinks = [
    { href: siteConfig.linkedin, label: "LinkedIn", icon: "linkedin" as const },
    { href: siteConfig.youtube, label: "YouTube", icon: "youtube" as const },
  ];

  return (
    <>
      <footer
        id="iletisim"
        className="site-global-footer"
        style={{
          background: "var(--footer-bg)",
          color: "var(--text-primary)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: 1,
            background: isDark
              ? "linear-gradient(90deg, transparent, rgba(96,165,250,0.4), transparent)"
              : "linear-gradient(90deg, transparent, rgba(37,99,235,0.15), transparent)",
          }}
        />

        <div className="footer-grid">
          <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
            <Link href="/" style={{ display: "inline-flex", alignItems: "center", gap: "0.875rem", textDecoration: "none" }}>
              <Image
                src="/assets/images/logo/logo_yst_circle.png"
                alt="YST Elektrik"
                width={56}
                height={56}
                style={{ borderRadius: "50%", display: "block", flexShrink: 0, width: 56, height: 56 }}
              />
              <div>
                <p
                  style={{
                    margin: 0,
                    fontSize: "1.125rem",
                    fontWeight: 700,
                    color: "var(--text-primary)",
                    letterSpacing: "-0.02em",
                    lineHeight: 1.2,
                  }}
                >
                  {siteConfig.name}
                </p>
                <p style={{ margin: 0, fontSize: "0.75rem", color: "var(--text-muted)", marginTop: "0.2rem" }}>
                  {logoSubtitle(lang)}
                </p>
              </div>
            </Link>
            <p style={{ fontSize: "0.875rem", color: "var(--text-muted)", lineHeight: 1.75, margin: 0, maxWidth: 280 }}>
              {t("footer.desc")}
            </p>
            <div style={{ display: "flex", gap: "0.5rem" }}>
              {socialLinks.map(({ href, label, icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={label}
                  className="footer-social-icon"
                  style={socialIconStyle}
                >
                  <FooterSocialIcon kind={icon} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <FooterColTitle>{t("footer.about")}</FooterColTitle>
            <ul style={linkList}>
              {corporateItems.map((item) =>
                "href" in item ? (
                  <FooterNavLink key={item.label} href={item.href}>
                    {item.label}
                  </FooterNavLink>
                ) : (
                  <FooterCertButton key={item.label} label={item.label} onClick={() => setPdfModal(item.pdf)} />
                ),
              )}
            </ul>
          </div>

          <div>
            <FooterColTitle>{t("footer.services")}</FooterColTitle>
            <ul style={linkList}>
              {servicesMenu.map((item) => (
                <FooterNavLink key={item.href} href={item.href}>
                  {t(item.labelKey)}
                </FooterNavLink>
              ))}
            </ul>
          </div>

          <div>
            <FooterColTitle>{t("footer.contact")}</FooterColTitle>
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              <Link href={`mailto:${siteConfig.email}`} style={contactRowStyle} className="footer-contact-row">
                <Mail size={15} style={{ marginTop: 2, flexShrink: 0, color: "var(--text-secondary)" }} />
                <span>{siteConfig.email}</span>
              </Link>
              <Link href={`tel:${siteConfig.phoneTel}`} style={contactRowStyle} className="footer-contact-row">
                <Phone size={15} style={{ marginTop: 2, flexShrink: 0, color: "var(--text-secondary)" }} />
                <span>{siteConfig.phone}</span>
              </Link>
              <div style={{ ...contactRowStyle, cursor: "default" }}>
                <MapPin size={15} style={{ marginTop: 2, flexShrink: 0, color: "var(--text-secondary)" }} />
                <span style={{ lineHeight: 1.6 }}>{siteConfig.address}</span>
              </div>
              <Link href="/contact" style={contactCtaStyle(isDark)} className="footer-contact-cta">
                <Mail size={13} />
                {t("footer.col.call.asgard")}
              </Link>
            </div>
          </div>
        </div>

        <FooterBrandDisplay name={siteConfig.name} />

        <p
          style={{
            textAlign: "center",
            fontSize: "0.8125rem",
            color: "var(--text-muted)",
            fontStyle: "italic",
            margin: "-1rem auto 3rem",
            padding: "0 1.5rem",
            opacity: 0.7,
            lineHeight: 1.6,
          }}
        >
          {t("footer.slogan")}
        </p>

        <div style={{ borderTop: "1px solid var(--border-card)", padding: "1.25rem 1.5rem" }}>
          <div
            style={{
              maxWidth: 1200,
              margin: "0 auto",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: "0.5rem",
            }}
          >
            <p style={{ fontSize: "0.8125rem", color: "var(--text-muted)", margin: 0 }}>
              © {siteConfig.copyrightYear} {siteConfig.name}. {t("footer.rights")}
            </p>
            <p style={{ fontSize: "0.8125rem", color: "var(--text-muted)", margin: 0 }}>
              {t("footer.credit.prefix")}{" "}
              <span
                title={t("footer.credit.hint")}
                style={{
                  color: "var(--text-secondary)",
                  fontWeight: 600,
                  fontStyle: "italic",
                  cursor: "help",
                }}
              >
                {t("footer.credit.name")}
              </span>
            </p>
          </div>
        </div>
      </footer>

      {pdfModal ? (
        <PdfViewerModal
          open
          title={t(FOOTER_PDFS[pdfModal].titleKey)}
          src={FOOTER_PDFS[pdfModal].src}
          onClose={() => setPdfModal(null)}
        />
      ) : null}
    </>
  );
}

const linkList: CSSProperties = {
  listStyle: "none",
  margin: 0,
  padding: 0,
  display: "flex",
  flexDirection: "column",
  gap: "0.875rem",
};

const footerNavLinkStyle: CSSProperties = {
  fontSize: "0.875rem",
  color: "var(--text-secondary)",
  textDecoration: "none",
  transition: "color 0.2s, padding-left 0.2s",
  display: "inline-flex",
  alignItems: "center",
  gap: "0.375rem",
  lineHeight: 1.5,
};

const footerCertBtnStyle: CSSProperties = {
  background: "none",
  border: "none",
  cursor: "pointer",
  fontSize: "0.875rem",
  color: "var(--text-secondary)",
  padding: 0,
  display: "inline-flex",
  alignItems: "center",
  gap: "0.375rem",
  lineHeight: 1.5,
  fontFamily: "inherit",
  transition: "color 0.2s, padding-left 0.2s",
};

const contactRowStyle: CSSProperties = {
  display: "flex",
  alignItems: "flex-start",
  gap: "0.625rem",
  textDecoration: "none",
  color: "var(--text-secondary)",
  fontSize: "0.875rem",
  transition: "color 0.2s",
};

function contactCtaStyle(isDark: boolean): CSSProperties {
  return {
    marginTop: "0.5rem",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "0.4rem",
    padding: "0.6rem 1.25rem",
    background: isDark ? "rgba(37,99,235,0.2)" : "#2563eb",
    border: `1px solid ${isDark ? "rgba(59,130,246,0.3)" : "#2563eb"}`,
    borderRadius: "9999px",
    fontSize: "0.8125rem",
    fontWeight: 600,
    color: isDark ? "#93c5fd" : "#ffffff",
    textDecoration: "none",
    transition: "background 0.2s, border-color 0.2s, color 0.2s, box-shadow 0.2s",
    boxShadow: isDark ? "none" : "0 4px 12px rgba(37,99,235,0.2)",
  };
}

function FooterSocialIcon({ kind }: { kind: "linkedin" | "youtube" }) {
  if (kind === "linkedin") {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
        <rect width="4" height="12" x="2" y="9" />
        <circle cx="4" cy="4" r="2" />
      </svg>
    );
  }
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />
      <path d="m10 15 5-3-5-3z" />
    </svg>
  );
}

const socialIconStyle: CSSProperties = {
  width: 36,
  height: 36,
  borderRadius: "0.5rem",
  background: "var(--bg-card)",
  border: "1px solid var(--border-card)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: "var(--text-muted)",
  textDecoration: "none",
  transition: "background 0.2s, color 0.2s, border-color 0.2s",
};
