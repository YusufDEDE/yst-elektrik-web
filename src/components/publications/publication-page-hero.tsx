"use client";

import { useTheme } from "@/providers/theme-provider";
import { BookOpen } from "lucide-react";
import type { ReactNode } from "react";

const HERO_DARK =
  "linear-gradient(135deg, #0a0f1e 0%, #0f1d3a 25%, #162650 50%, #1a1f40 75%, #0d1225 100%)";
const HERO_LIGHT =
  "linear-gradient(135deg, #0f2044 0%, #1a3a6e 20%, #1e50a0 45%, #2563eb 70%, #1a3a6e 100%)";

const RADIAL =
  "radial-gradient(ellipse at 20% 40%, rgba(59,130,246,0.2) 0%, transparent 50%), radial-gradient(ellipse at 80% 20%, rgba(99,102,241,0.15) 0%, transparent 50%), radial-gradient(ellipse at 50% 90%, rgba(37,99,235,0.12) 0%, transparent 50%)";

type PublicationPageHeroProps = {
  title: string;
  description: string;
  disclaimer: ReactNode;
  topRight: ReactNode;
};

export function PublicationPageHero({
  title,
  description,
  disclaimer,
  topRight,
}: PublicationPageHeroProps) {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <div
      style={{
        background: isDark ? HERO_DARK : HERO_LIGHT,
        padding: "calc(160px + 4rem) 1.5rem 3rem",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: RADIAL,
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          top: -80,
          right: -40,
          width: 300,
          height: 300,
          borderRadius: "50%",
          background: "rgba(96,165,250,0.08)",
          filter: "blur(50px)",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: -60,
          left: -60,
          width: 250,
          height: 250,
          borderRadius: "50%",
          background: "rgba(99,102,241,0.06)",
          filter: "blur(40px)",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
          pointerEvents: "none",
        }}
      />
      <div style={{ maxWidth: 1100, margin: "0 auto", position: "relative", zIndex: 1 }}>
        <div
          style={{
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "space-between",
            marginBottom: "0.75rem",
            flexWrap: "wrap",
            gap: "1rem",
          }}
        >
          <h1
            style={{
              margin: 0,
              fontSize: "clamp(1.75rem, 4vw, 2.75rem)",
              fontWeight: 900,
              color: "#f8fafc",
              letterSpacing: "-0.03em",
              lineHeight: 1.1,
            }}
          >
            {title}
          </h1>
          {topRight}
        </div>
        <p
          style={{
            fontSize: "clamp(0.875rem, 1.5vw, 1rem)",
            color: "rgba(248,250,252,0.75)",
            maxWidth: 540,
            lineHeight: 1.7,
            margin: "0 0 1.5rem",
          }}
        >
          {description}
        </p>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.75rem",
            padding: "0.875rem 1.5rem",
            background: "rgba(255,255,255,0.06)",
            border: "1px solid rgba(255,255,255,0.15)",
            borderRadius: "0.75rem",
            margin: "0 auto 1.5rem",
            width: "fit-content",
            textAlign: "left",
          }}
        >
          {disclaimer}
        </div>
      </div>
    </div>
  );
}

export function PublicationBadge({ label }: { label: string }) {
  return (
    <div
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "0.5rem",
        padding: "0.35rem 0.875rem",
        background: "rgba(255,255,255,0.1)",
        border: "1px solid rgba(255,255,255,0.2)",
        borderRadius: "9999px",
      }}
    >
      <BookOpen size={14} color="#93c5fd" />
      <span
        style={{
          fontSize: "0.75rem",
          fontWeight: 700,
          color: "#93c5fd",
          letterSpacing: "0.05em",
          textTransform: "uppercase",
        }}
      >
        {label}
      </span>
    </div>
  );
}
