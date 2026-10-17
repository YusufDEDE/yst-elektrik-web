"use client";

import { getToolTitle } from "@/lib/tool-labels";
import type { Lang } from "@/lib/i18n";
import { useMirrorT } from "@/lib/i18n/use-mirror-t";
import { useLang } from "@/providers/lang-provider";
import { useTheme } from "@/providers/theme-provider";
import { TOOL_NAV_ORDER } from "@/lib/tools/tool-nav-config";
import { ChevronRight, Cookie, Globe, Moon, Settings, Sun, Zap } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState, type CSSProperties, type RefObject } from "react";

const widgetCopy: Record<
  Lang,
  {
    settings: string;
    theme: string;
    language: string;
    cookies: string;
    cookieTitle: string;
    cookieDesc: string;
    necessary: string;
    analytics: string;
    marketing: string;
    savePrefs: string;
    tools: string;
  }
> = {
  tr: {
    settings: "Ayarlar",
    theme: "Tema",
    language: "Dil",
    cookies: "Çerezler",
    cookieTitle: "Çerez Ayarları",
    cookieDesc: "Çerez tercihlerinizi yönetin.",
    necessary: "Zorunlu",
    analytics: "Analitik",
    marketing: "Pazarlama",
    savePrefs: "Tercihleri Kaydet",
    tools: "Araçlar",
  },
  en: {
    settings: "Settings",
    theme: "Theme",
    language: "Language",
    cookies: "Cookies",
    cookieTitle: "Cookie Settings",
    cookieDesc: "Manage your cookie preferences.",
    necessary: "Necessary",
    analytics: "Analytics",
    marketing: "Marketing",
    savePrefs: "Save Preferences",
    tools: "Tools",
  },
  de: {
    settings: "Einstellungen",
    theme: "Design",
    language: "Sprache",
    cookies: "Cookies",
    cookieTitle: "Cookie-Einstellungen",
    cookieDesc: "Verwalten Sie Ihre Cookie-Präferenzen.",
    necessary: "Notwendig",
    analytics: "Analytik",
    marketing: "Marketing",
    savePrefs: "Einstellungen speichern",
    tools: "Tools",
  },
};

function useClickOutside(ref: RefObject<HTMLElement | null>, open: boolean, onClose: () => void) {
  useEffect(() => {
    if (!open) return;
    const onDoc = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) onClose();
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, [open, onClose, ref]);
}

export function GlobalWidgets() {
  const { theme, toggleTheme } = useTheme();
  const { lang, setLang } = useLang();
  const { t } = useMirrorT();
  const w = widgetCopy[lang];
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [cookiesOpen, setCookiesOpen] = useState(false);
  const [toolsOpen, setToolsOpen] = useState(false);
  const [analyticsCookies, setAnalyticsCookies] = useState(false);
  const [marketingCookies, setMarketingCookies] = useState(false);

  const settingsRef = useRef<HTMLDivElement>(null);
  const cookiesRef = useRef<HTMLDivElement>(null);
  const toolsRef = useRef<HTMLDivElement>(null);

  useClickOutside(settingsRef, settingsOpen, () => setSettingsOpen(false));
  useClickOutside(cookiesRef, cookiesOpen, () => setCookiesOpen(false));
  useClickOutside(toolsRef, toolsOpen, () => setToolsOpen(false));

  useEffect(() => {
    try {
      const raw = localStorage.getItem("yst-cookie-preferences");
      if (!raw) return;
      const parsed = JSON.parse(raw) as { analytics?: boolean; marketing?: boolean };
      if (typeof parsed.analytics === "boolean") setAnalyticsCookies(parsed.analytics);
      if (typeof parsed.marketing === "boolean") setMarketingCookies(parsed.marketing);
    } catch {
      /* ignore */
    }
  }, []);

  const isDark = theme === "dark";
  const toolsBorder = isDark ? "rgba(255,255,255,0.1)" : "#e2e8f0";
  const toolsLinkColor = isDark ? "rgba(248,250,252,0.55)" : "#64748b";

  const saveCookiePreferences = () => {
    try {
      localStorage.setItem(
        "yst-cookie-preferences",
        JSON.stringify({ analytics: analyticsCookies, marketing: marketingCookies, savedAt: Date.now() }),
      );
    } catch {
      /* ignore */
    }
    setCookiesOpen(false);
  };

  const langs: Lang[] = ["tr", "en", "de"];

  const railStyle = (open: boolean): CSSProperties => ({
    position: "fixed",
    top: "50%",
    transform: "translateY(-50%)",
    zIndex: open ? 9010 : 9000,
    display: "flex",
    flexDirection: "row-reverse",
    alignItems: "center",
    pointerEvents: "none",
  });

  const tabBtnStyle: CSSProperties = {
    pointerEvents: "auto",
    background: "var(--bg-card)",
    border: "1px solid var(--border-card)",
    borderLeft: "none",
    borderRadius: "0 1.5rem 1.5rem 0",
    padding: "1rem 1rem 1rem 0.8rem",
    cursor: "pointer",
    boxShadow: "4px 0 15px rgba(0,0,0,0.08)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };

  const drawerShell = (open: boolean, width: number): CSSProperties => ({
    pointerEvents: open ? "auto" : "none",
    width: open ? width : 0,
    minWidth: 0,
    overflow: "hidden",
    background: "var(--bg-card)",
    borderTop: "1px solid var(--border-card)",
    borderBottom: "1px solid var(--border-card)",
    borderRight: open ? "1px solid var(--border-card)" : "none",
    boxShadow: "4px 0 15px rgba(0,0,0,0.08)",
    transition: "width 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
  });

  return (
    <>
      <div ref={settingsRef} style={{ ...railStyle(settingsOpen), left: 0 }}>
        <button
          type="button"
          aria-label={w.settings}
          aria-expanded={settingsOpen}
          onClick={() => setSettingsOpen((v) => !v)}
          style={tabBtnStyle}
        >
          <Settings
            className="h-6 w-6"
            style={{
              color: theme === "dark" ? "#94a3b8" : "#475569",
              animation: settingsOpen ? "none" : "spin 5s linear infinite",
            }}
          />
        </button>
        <div style={drawerShell(settingsOpen, 220)}>
          <div className="flex w-[220px] min-w-[220px] flex-col gap-5 p-5">
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-2 text-sm font-semibold">
                {theme === "dark" ? <Moon size={18} /> : <Sun size={18} />}
                {w.theme}
              </span>
              <input
                type="checkbox"
                className="toggle toggle-primary toggle-sm"
                checked={theme === "dark"}
                onChange={() => toggleTheme()}
              />
            </div>
            <div className="flex items-center justify-between gap-2">
              <span className="flex items-center gap-2 text-sm font-semibold">
                <Globe size={18} />
                {w.language}
              </span>
              <div
                className="flex gap-1 rounded-lg p-1"
                style={{ background: "var(--bg-section-gray)" }}
              >
                {langs.map((code) => (
                  <button
                    key={code}
                    type="button"
                    onClick={() => setLang(code)}
                    className="rounded px-2 py-1 text-xs font-semibold uppercase"
                    style={{
                      background: lang === code ? "var(--bg-card)" : "transparent",
                      color: lang === code ? "var(--text-primary)" : "var(--text-muted)",
                      border: "none",
                      cursor: "pointer",
                    }}
                  >
                    {code}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        ref={cookiesRef}
        style={{ ...railStyle(cookiesOpen), left: 0, top: "calc(50% + 4.5rem)", transform: "translateY(-50%)" }}
      >
        <button
          type="button"
          aria-label={w.cookies}
          aria-expanded={cookiesOpen}
          onClick={() => setCookiesOpen((v) => !v)}
          style={tabBtnStyle}
        >
          <Cookie className="h-6 w-6" style={{ color: "var(--text-secondary)" }} />
        </button>
        <div style={drawerShell(cookiesOpen, 260)}>
          <div className="w-[260px] min-w-[260px] space-y-3 p-5">
            <div>
              <h4 className="text-sm font-bold">{w.cookieTitle}</h4>
              <p className="text-xs" style={{ color: "var(--text-muted)" }}>
                {w.cookieDesc}
              </p>
            </div>
            <label className="flex items-center justify-between text-xs">
              {w.necessary}
              <input type="checkbox" className="toggle toggle-primary toggle-sm" checked disabled />
            </label>
            <label className="flex items-center justify-between text-xs">
              {w.analytics}
              <input
                type="checkbox"
                className="toggle toggle-primary toggle-sm"
                checked={analyticsCookies}
                onChange={(e) => setAnalyticsCookies(e.target.checked)}
              />
            </label>
            <label className="flex items-center justify-between text-xs">
              {w.marketing}
              <input
                type="checkbox"
                className="toggle toggle-primary toggle-sm"
                checked={marketingCookies}
                onChange={(e) => setMarketingCookies(e.target.checked)}
              />
            </label>
            <button type="button" className="btn btn-primary btn-sm w-full" onClick={saveCookiePreferences}>
              {w.savePrefs}
            </button>
          </div>
        </div>
      </div>

      <div
        ref={toolsRef}
        style={{
          ...railStyle(toolsOpen),
          left: "auto",
          right: 0,
          top: "calc(50% + 4.5rem)",
          flexDirection: "row",
        }}
      >
        <button
          type="button"
          aria-label={w.tools}
          aria-expanded={toolsOpen}
          onClick={() => setToolsOpen((v) => !v)}
          className="pointer-events-auto flex items-center justify-center"
          style={{
            background: "linear-gradient(135deg, #f59e0b, #d97706)",
            border: "none",
            borderRadius: "1.5rem 0 0 1.5rem",
            padding: "1rem 0.8rem 1rem 1rem",
            cursor: "pointer",
            boxShadow: toolsOpen
              ? "-4px 0 15px rgba(245,158,11,0.2)"
              : "-4px 0 15px rgba(245,158,11,0.3)",
            transition: "transform 0.2s, box-shadow 0.2s",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "translateX(-4px)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "translateX(0)";
          }}
        >
          <Zap className="h-[26px] w-[26px] text-white" strokeWidth={2} />
        </button>
        <div
          style={{
            pointerEvents: toolsOpen ? "auto" : "none",
            width: toolsOpen ? 260 : 0,
            minWidth: 0,
            overflow: "hidden",
            background: isDark ? "#1e293b" : "#ffffff",
            borderTop: `1px solid ${toolsBorder}`,
            borderBottom: `1px solid ${toolsBorder}`,
            borderLeft: toolsOpen ? `1px solid ${toolsBorder}` : "none",
            boxShadow: isDark ? "-4px 0 15px rgba(0,0,0,0.5)" : "-4px 0 15px rgba(0,0,0,0.05)",
            transition: "width 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div
            style={{
              padding: "1.25rem",
              display: "flex",
              flexDirection: "column",
              gap: "0.5rem",
              minWidth: 260,
            }}
          >
            {TOOL_NAV_ORDER.map((slug) => (
              <Link
                key={slug}
                href={`/tools/${slug}`}
                onClick={() => setToolsOpen(false)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: "0.75rem",
                  padding: "0.5rem 0.75rem",
                  borderRadius: "0.5rem",
                  fontSize: "0.8125rem",
                  fontWeight: 500,
                  color: toolsLinkColor,
                  textDecoration: "none",
                  transition: "background 0.2s, color 0.2s",
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget;
                  el.style.background = isDark ? "rgba(245,158,11,0.15)" : "#fef3c7";
                  el.style.color = isDark ? "#fbbf24" : "#d97706";
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget;
                  el.style.background = "transparent";
                  el.style.color = toolsLinkColor;
                }}
              >
                <span style={{ flex: 1, minWidth: 0, lineHeight: 1.35 }}>{getToolTitle(t, slug)}</span>
                <ChevronRight size={14} style={{ flexShrink: 0, opacity: 0.85 }} aria-hidden />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
