"use client";

import { contactUrls } from "@/lib/site-config";
import { useMirrorT } from "@/lib/i18n/use-mirror-t";
import { useTheme } from "@/providers/theme-provider";
import { useEffect, useRef } from "react";
import type mapboxgl from "mapbox-gl";

const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN?.trim() ?? "";

const CENTER: [number, number] = [27.1775, 38.4608];
const MAP_STYLE = "mapbox://styles/mapbox/streets-v12";

function tooltipTheme(isDark: boolean) {
  return {
    bg: isDark ? "#1e293b" : "#ffffff",
    border: isDark ? "#334155" : "#f1f5f9",
    title: isDark ? "#f8fafc" : "#0f172a",
    subtitle: isDark ? "#94a3b8" : "#64748b",
    label: "#64748b",
    rowText: isDark ? "#cbd5e1" : "#334155",
    shadow: isDark
      ? "0 8px 32px rgba(0,0,0,0.5), 0 2px 8px rgba(0,0,0,0.3)"
      : "0 8px 32px rgba(0,0,0,0.14), 0 2px 8px rgba(0,0,0,0.08)",
    arrowShadow: isDark ? "2px 2px 4px rgba(0,0,0,0.3)" : "2px 2px 4px rgba(0,0,0,0.06)",
  };
}

function applyTooltipTheme(tooltip: HTMLDivElement, isDark: boolean) {
  const t = tooltipTheme(isDark);
  tooltip.style.background = t.bg;
  tooltip.style.boxShadow = t.shadow;
  const arrow = tooltip.querySelector(".tt-arrow") as HTMLElement | null;
  if (arrow) {
    arrow.style.background = t.bg;
    arrow.style.boxShadow = t.arrowShadow;
  }
  const title = tooltip.querySelector(".tt-title") as HTMLElement | null;
  const subtitle = tooltip.querySelector(".tt-subtitle") as HTMLElement | null;
  const divider = tooltip.querySelector(".tt-divider") as HTMLElement | null;
  const label = tooltip.querySelector(".tt-label") as HTMLElement | null;
  const row1 = tooltip.querySelector(".tt-row1-text") as HTMLElement | null;
  const row2 = tooltip.querySelector(".tt-row2-text") as HTMLElement | null;
  if (title) title.style.color = t.title;
  if (subtitle) subtitle.style.color = t.subtitle;
  if (divider) divider.style.borderTopColor = t.border;
  if (label) label.style.color = t.label;
  if (row1) row1.style.color = t.rowText;
  if (row2) row2.style.color = t.rowText;
}

function buildTooltip(isDark: boolean): HTMLDivElement {
  const l = tooltipTheme(isDark);
  const el = document.createElement("div");
  el.style.cssText = `
    position: absolute;
    bottom: calc(100% + 14px);
    left: 50%;
    transform: translateX(-50%) translateY(6px);
    background: ${l.bg};
    border-radius: 12px;
    padding: 12px 14px;
    min-width: 220px;
    box-shadow: ${l.shadow};
    pointer-events: none;
    opacity: 0;
    transition: opacity 0.18s ease, transform 0.18s ease, background 0.3s, box-shadow 0.3s;
    font-family: 'Plus Jakarta Sans', sans-serif;
    z-index: 10;
    white-space: normal;
    max-width: 280px;
  `;
  el.innerHTML = `
    <div style="display:flex;align-items:center;gap:8px;margin-bottom:8px;">
      <img src="/assets/images/logo/logo_yst_circle.png"
           style="width:32px;height:32px;border-radius:50%;flex-shrink:0;" alt="" />
      <div>
        <p class="tt-title" style="margin:0;font-weight:700;font-size:0.875rem;color:${l.title};line-height:1.2;">YST Elektrik</p>
        <p class="tt-subtitle" style="margin:0.25rem 0 0;font-size:0.7rem;color:${l.subtitle};line-height:1.4;">${contactUrls.address}</p>
      </div>
    </div>
    <div class="tt-divider" style="border-top:1px solid ${l.border};padding-top:8px;display:flex;flex-direction:column;gap:4px;">
      <p class="tt-label" style="margin:0;font-size:0.7rem;font-weight:600;color:${l.label};text-transform:uppercase;letter-spacing:0.06em;">
        Mesai Saatleri (UTC+3)
      </p>
      <div style="display:flex;justify-content:space-between;align-items:center;gap:12px;">
        <span class="tt-row1-text" style="font-size:0.8rem;color:${l.rowText};">Pazartesi – Cuma</span>
        <span style="font-size:0.8rem;font-weight:600;color:#2563eb;">09:00 – 18:00</span>
      </div>
      <div style="display:flex;justify-content:space-between;align-items:center;gap:12px;">
        <span class="tt-row2-text" style="font-size:0.8rem;color:${l.rowText};">Cumartesi – Pazar</span>
        <span style="font-size:0.8rem;font-weight:600;color:#94a3b8;">Kapalı</span>
      </div>
    </div>
    <div class="tt-arrow" style="position:absolute;bottom:-6px;left:50%;transform:translateX(-50%) rotate(45deg);
      width:12px;height:12px;background:${l.bg};border-radius:2px;
      box-shadow:${l.arrowShadow};transition:background 0.3s;"></div>
  `;
  return el;
}

function buildMarker(tooltip: HTMLDivElement): HTMLDivElement {
  const root = document.createElement("div");
  root.style.cssText =
    "position:relative;display:flex;align-items:center;justify-content:center;";

  const pin = document.createElement("div");
  pin.style.cssText = `
    width: 52px; height: 52px;
    border-radius: 50%;
    overflow: hidden;
    border: 3px solid #fff;
    box-shadow: 0 0 0 6px rgba(255,255,255,0.25), 0 4px 24px rgba(37,99,235,0.5);
    cursor: pointer;
    background: #fff;
    position: relative;
    z-index: 1;
  `;
  const img = document.createElement("img");
  img.src = "/assets/images/logo/logo_yst_circle.png";
  img.alt = "";
  img.style.cssText = "width:100%;height:100%;object-fit:cover;border-radius:50%;display:block;";
  pin.appendChild(img);

  root.appendChild(tooltip);
  root.appendChild(pin);

  const show = () => {
    tooltip.style.opacity = "1";
    tooltip.style.transform = "translateX(-50%) translateY(0)";
  };
  const hide = () => {
    tooltip.style.opacity = "0";
    tooltip.style.transform = "translateX(-50%) translateY(6px)";
  };
  root.addEventListener("mouseenter", show);
  root.addEventListener("mouseleave", hide);

  return root;
}

function ContactMapPlaceholder() {
  const { t } = useMirrorT();
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        borderRadius: "1rem",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "1.5rem",
        textAlign: "center",
        background: "var(--bg-section-gray)",
        border: "1px dashed var(--border-card)",
        color: "var(--text-secondary)",
        fontSize: "0.875rem",
        lineHeight: 1.5,
      }}
    >
      {t("contact.map.unconfigured")}
    </div>
  );
}

function ContactMapInner() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const tooltipRef = useRef<HTMLDivElement | null>(null);
  const { theme } = useTheme();
  const isDark = theme === "dark";

  useEffect(() => {
    if (tooltipRef.current) applyTooltipTheme(tooltipRef.current, isDark);
    mapRef.current?.setStyle(MAP_STYLE);
  }, [isDark]);

  useEffect(() => {
    if (!containerRef.current || !MAPBOX_TOKEN) return;

    let cancelled = false;
    let map: mapboxgl.Map | null = null;

    void import("mapbox-gl").then((mapbox) => {
      if (cancelled || !containerRef.current) return;
      mapbox.default.accessToken = MAPBOX_TOKEN;
      const tooltip = buildTooltip(isDark);
      tooltipRef.current = tooltip;
      const markerEl = buildMarker(tooltip);

      map = new mapbox.default.Map({
        container: containerRef.current,
        style: MAP_STYLE,
        center: CENTER,
        zoom: 14,
        attributionControl: false,
      });
      mapRef.current = map;

      new mapbox.default.Marker({ element: markerEl, anchor: "center", offset: [0, 60] })
        .setLngLat(CENTER)
        .addTo(map);

      map.on("load", () => {
        map?.getCanvas().style.setProperty("cursor", "default");
        tooltip.style.opacity = "1";
        tooltip.style.transform = "translateX(-50%) translateY(0)";
        window.setTimeout(() => {
          tooltip.style.opacity = "0";
          tooltip.style.transform = "translateX(-50%) translateY(6px)";
        }, 3000);
      });
    });

    return () => {
      cancelled = true;
      map?.remove();
      mapRef.current = null;
      tooltipRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps -- init once
  }, []);

  return (
    <div style={{ position: "relative", width: "100%", height: "100%", borderRadius: "1rem", overflow: "hidden" }}>
      <div ref={containerRef} style={{ width: "100%", height: "100%" }} />
      <style>{`
        @import url('https://api.mapbox.com/mapbox-gl-js/v3.3.0/mapbox-gl.css');
      `}</style>
    </div>
  );
}

export function ContactMap() {
  if (!MAPBOX_TOKEN) return <ContactMapPlaceholder />;
  return <ContactMapInner />;
}
