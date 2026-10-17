"use client";

import { ContactMap } from "@/components/contact/contact-map";
import { SiteFooter } from "@/components/layout/site-footer";
import { contactCompany, heroBackgroundVideoSrc } from "@/lib/site-config";
import { useMirrorT } from "@/lib/i18n/use-mirror-t";
import { useTheme } from "@/providers/theme-provider";
import { Mail, MapPin, Phone, Send } from "lucide-react";
import { FormEvent, ReactNode, useState } from "react";

function ContactInfoRow({
  icon,
  label,
  value,
  href,
}: {
  icon: ReactNode;
  label: string;
  value: string;
  href?: string;
}) {
  const inner = (
    <div
      style={{
        display: "flex",
        alignItems: "flex-start",
        gap: "1rem",
        padding: "1.25rem",
        background: "var(--bg-card)",
        border: "1px solid var(--border-card)",
        borderRadius: "1rem",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        transition: "border-color 0.2s, background 0.2s",
        textDecoration: "none",
        color: "inherit",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = "var(--border-hover)";
        e.currentTarget.style.background = "var(--bg-card-hover)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = "var(--border-card)";
        e.currentTarget.style.background = "var(--bg-card)";
      }}
    >
      <div
        style={{
          width: 42,
          height: 42,
          flexShrink: 0,
          background: "rgba(96,165,250,0.15)",
          border: "1px solid rgba(96,165,250,0.25)",
          borderRadius: "0.625rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#60a5fa",
        }}
      >
        {icon}
      </div>
      <div>
        <p
          style={{
            margin: 0,
            fontSize: "0.75rem",
            fontWeight: 600,
            color: "var(--text-muted)",
            textTransform: "uppercase",
            letterSpacing: "0.06em",
          }}
        >
          {label}
        </p>
        <p
          style={{
            margin: "0.25rem 0 0",
            fontSize: "0.9rem",
            fontWeight: 500,
            color: "var(--text-primary)",
            lineHeight: 1.5,
          }}
        >
          {value}
        </p>
      </div>
    </div>
  );

  if (href) {
    return (
      <a href={href} style={{ textDecoration: "none", display: "block" }}>
        {inner}
      </a>
    );
  }
  return <div>{inner}</div>;
}

function FormField({
  label,
  type = "text",
  name,
  placeholder,
  required,
}: {
  label: string;
  type?: string;
  name: string;
  placeholder: string;
  required?: boolean;
}) {
  const focusHandlers = {
    onFocus: (e: React.FocusEvent<HTMLInputElement>) => {
      e.currentTarget.style.borderColor = "#60a5fa";
      e.currentTarget.style.boxShadow = "0 0 0 3px rgba(96,165,250,0.15)";
      e.currentTarget.style.background = "var(--bg-card)";
    },
    onBlur: (e: React.FocusEvent<HTMLInputElement>) => {
      e.currentTarget.style.borderColor = "var(--border-card)";
      e.currentTarget.style.boxShadow = "none";
      e.currentTarget.style.background = "var(--bg-section-gray)";
    },
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}>
      <label style={{ fontSize: "0.8125rem", fontWeight: 600, color: "var(--text-secondary)" }}>
        {label}
        {required ? <span style={{ color: "#f87171", marginLeft: 2 }}>*</span> : null}
      </label>
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        required={required}
        style={{
          padding: "0.7rem 1rem",
          background: "var(--bg-section-gray)",
          border: "1px solid var(--border-card)",
          borderRadius: "0.625rem",
          fontSize: "0.875rem",
          color: "var(--text-primary)",
          fontFamily: "var(--font-sans)",
          outline: "none",
          transition: "border-color 0.2s, box-shadow 0.2s, background 0.2s",
          width: "100%",
          boxSizing: "border-box",
        }}
        {...focusHandlers}
      />
    </div>
  );
}

export function ContactPage() {
  const { t } = useMirrorT();
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitError(null);
    setSending(true);

    const form = e.currentTarget;
    const data = new FormData(form);
    const payload = {
      firstName: String(data.get("firstName") ?? ""),
      lastName: String(data.get("lastName") ?? ""),
      email: String(data.get("email") ?? ""),
      phone: String(data.get("phone") ?? ""),
      message: String(data.get("message") ?? ""),
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        setSubmitError(t("contact.form.error.send"));
        return;
      }
      setSubmitted(true);
      form.reset();
    } catch {
      setSubmitError(t("contact.form.error.network"));
    } finally {
      setSending(false);
    }
  };

  return (
    <div
      className="contact-page"
      style={{
        minHeight: "100vh",
        position: "relative",
        isolation: "isolate",
        background: "var(--bg-page)",
      }}
    >
      <div style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none" }}>
        <video
          autoPlay
          muted
          loop
          playsInline
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
        >
          <source src={heroBackgroundVideoSrc} type="video/mp4" />
        </video>
      </div>

      <div style={{ position: "relative", zIndex: 1, paddingTop: "5.25rem" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "4rem 1.5rem 6rem" }}>
          <div style={{ marginBottom: "3rem" }}>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                background: "rgba(96,165,250,0.15)",
                border: "1px solid rgba(96,165,250,0.25)",
                borderRadius: "9999px",
                padding: "0.3rem 0.875rem",
                marginBottom: "1.25rem",
                backdropFilter: "blur(8px)",
                WebkitBackdropFilter: "blur(8px)",
              }}
            >
              <MapPin size={13} color="#60a5fa" />
              <span
                style={{
                  fontSize: "0.75rem",
                  fontWeight: 600,
                  color: "#60a5fa",
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                }}
              >
                {t("contact.label")}
              </span>
            </div>
            <h1
              style={{
                fontSize: "clamp(2rem, 5vw, 3.25rem)",
                fontWeight: 800,
                color: "var(--text-primary)",
                margin: 0,
                letterSpacing: "-0.03em",
                lineHeight: 1.15,
                textShadow: isDark ? "0 2px 20px rgba(0,0,0,0.4)" : "none",
              }}
            >
              {t("contact.title1")}
              <br />
              <span style={{ color: "#60a5fa" }}>{t("contact.title2")}</span>
            </h1>
            <p
              style={{
                margin: "1rem 0 0",
                fontSize: "1.0625rem",
                color: "var(--text-secondary)",
                maxWidth: 520,
                lineHeight: 1.7,
              }}
            >
              {t("contact.subtitle")}
            </p>
          </div>

          <div
            className="contact-grid"
            style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2.5rem", alignItems: "start" }}
          >
            <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
              <ContactInfoRow
                icon={<Phone size={18} />}
                label={t("contact.info.phone")}
                value={contactCompany.phoneDisplay}
                href={contactCompany.phone}
              />
              <ContactInfoRow
                icon={<Mail size={18} />}
                label={t("contact.info.email")}
                value={contactCompany.emailDisplay}
                href={contactCompany.email}
              />
              <ContactInfoRow
                icon={<MapPin size={18} />}
                label={t("contact.info.address")}
                value={contactCompany.address}
              />
              <div
                style={{
                  height: 340,
                  borderRadius: "1rem",
                  overflow: "hidden",
                  border: "1px solid rgba(255,255,255,0.12)",
                  boxShadow: "0 4px 32px rgba(0,0,0,0.3)",
                }}
              >
                <ContactMap />
              </div>
            </div>

            <div
              style={{
                background: "var(--bg-card)",
                border: "1px solid var(--border-card)",
                borderRadius: "1.25rem",
                padding: "2.5rem",
                backdropFilter: "blur(20px)",
                WebkitBackdropFilter: "blur(20px)",
                boxShadow: isDark ? "0 8px 48px rgba(0,0,0,0.35)" : "0 8px 32px rgba(0,0,0,0.08)",
              }}
            >
              {submitted ? (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "1rem",
                    textAlign: "center",
                    padding: "3rem 1rem",
                  }}
                >
                  <div
                    style={{
                      width: 64,
                      height: 64,
                      background: "rgba(34,197,94,0.15)",
                      border: "1px solid rgba(34,197,94,0.3)",
                      borderRadius: "50%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "1.75rem",
                    }}
                  >
                    ✓
                  </div>
                  <h3 style={{ margin: 0, fontSize: "1.25rem", fontWeight: 700, color: "var(--text-primary)" }}>
                    {t("contact.form.success.title")}
                  </h3>
                  <p style={{ margin: 0, fontSize: "0.9rem", color: "var(--text-secondary)", lineHeight: 1.6 }}>
                    {t("contact.form.success.desc")}
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setSubmitted(false);
                      setSubmitError(null);
                    }}
                    style={{
                      marginTop: "0.5rem",
                      padding: "0.6rem 1.5rem",
                      background: "var(--bg-section-gray)",
                      border: "1px solid var(--border-card)",
                      borderRadius: "9999px",
                      fontSize: "0.875rem",
                      fontWeight: 500,
                      color: "var(--text-primary)",
                      cursor: "pointer",
                      fontFamily: "var(--font-sans)",
                    }}
                  >
                    {t("contact.form.success.button")}
                  </button>
                </div>
              ) : (
                <>
                  <h2
                    style={{
                      margin: "0 0 0.5rem",
                      fontSize: "1.375rem",
                      fontWeight: 700,
                      color: "var(--text-primary)",
                      letterSpacing: "-0.02em",
                    }}
                  >
                    {t("contact.form.title")}
                  </h2>
                  <p style={{ margin: "0 0 2rem", fontSize: "0.875rem", color: "var(--text-secondary)" }}>
                    {t("contact.form.subtitle")}
                  </p>
                  <form onSubmit={onSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
                    {submitError ? (
                      <p
                        role="alert"
                        style={{
                          margin: 0,
                          padding: "0.75rem 1rem",
                          borderRadius: "0.625rem",
                          fontSize: "0.8125rem",
                          background: "rgba(248,113,113,0.12)",
                          border: "1px solid rgba(248,113,113,0.35)",
                          color: "#f87171",
                        }}
                      >
                        {submitError}
                      </p>
                    ) : null}
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                      <FormField
                        label={t("contact.form.firstname")}
                        name="firstName"
                        placeholder={t("contact.form.firstname_ph")}
                        required
                      />
                      <FormField
                        label={t("contact.form.lastname")}
                        name="lastName"
                        placeholder={t("contact.form.lastname_ph")}
                        required
                      />
                    </div>
                    <FormField
                      label={t("contact.form.email")}
                      type="email"
                      name="email"
                      placeholder={t("contact.form.email_ph")}
                      required
                    />
                    <FormField
                      label={t("contact.form.phone")}
                      type="tel"
                      name="phone"
                      placeholder={t("contact.form.phone_ph")}
                    />
                    <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}>
                      <label style={{ fontSize: "0.8125rem", fontWeight: 600, color: "var(--text-secondary)" }}>
                        {t("contact.form.message")} <span style={{ color: "#f87171" }}>*</span>
                      </label>
                      <textarea
                        name="message"
                        placeholder={t("contact.form.message_ph")}
                        required
                        rows={5}
                        style={{
                          padding: "0.7rem 1rem",
                          background: "var(--bg-section-gray)",
                          border: "1px solid var(--border-card)",
                          borderRadius: "0.625rem",
                          fontSize: "0.875rem",
                          color: "var(--text-primary)",
                          fontFamily: "var(--font-sans)",
                          outline: "none",
                          transition: "border-color 0.2s, box-shadow 0.2s, background 0.2s",
                          resize: "none",
                          width: "100%",
                          boxSizing: "border-box",
                        }}
                        onFocus={(e) => {
                          e.currentTarget.style.borderColor = "#60a5fa";
                          e.currentTarget.style.boxShadow = "0 0 0 3px rgba(96,165,250,0.15)";
                          e.currentTarget.style.background = "var(--bg-card)";
                        }}
                        onBlur={(e) => {
                          e.currentTarget.style.borderColor = "var(--border-card)";
                          e.currentTarget.style.boxShadow = "none";
                          e.currentTarget.style.background = "var(--bg-section-gray)";
                        }}
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={sending}
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "0.5rem",
                        padding: "0.8rem 1.75rem",
                        background: sending
                          ? "rgba(37,99,235,0.5)"
                          : "linear-gradient(135deg, #2563eb, #1d4ed8)",
                        border: "1px solid rgba(96,165,250,0.3)",
                        borderRadius: "9999px",
                        fontSize: "0.9375rem",
                        fontWeight: 600,
                        color: "#fff",
                        cursor: sending ? "not-allowed" : "pointer",
                        fontFamily: "var(--font-sans)",
                        boxShadow: "0 4px 20px rgba(37,99,235,0.4)",
                        transition: "opacity 0.2s",
                        width: "100%",
                      }}
                      onMouseEnter={(e) => {
                        if (!sending) e.currentTarget.style.opacity = "0.88";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.opacity = "1";
                      }}
                    >
                      {sending ? (
                        <>
                          <span
                            style={{
                              width: 16,
                              height: 16,
                              border: "2px solid rgba(255,255,255,0.3)",
                              borderTopColor: "#fff",
                              borderRadius: "50%",
                              animation: "spin 0.7s linear infinite",
                              display: "inline-block",
                            }}
                          />
                          {t("contact.form.sending")}
                        </>
                      ) : (
                        <>
                          <Send size={15} />
                          {t("contact.form.send")}
                        </>
                      )}
                    </button>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>

        <div className={`contact-footer-wrapper ${isDark ? "contact-footer-dark" : "contact-footer-light"}`}>
          <SiteFooter />
        </div>
      </div>
      <style>{`
        input::placeholder,
        textarea::placeholder {
          color: var(--text-muted);
        }
      `}</style>
    </div>
  );
}
