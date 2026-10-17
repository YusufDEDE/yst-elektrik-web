"use client";

import { SafeImg } from "@/components/ui/safe-img";
import { useMirrorT } from "@/lib/i18n/use-mirror-t";
import { useTheme } from "@/providers/theme-provider";
import { useEffect, useRef, useState } from "react";

const logos = Array.from({ length: 21 }, (_, i) => ({
  id: i + 1,
  src: `/assets/images/logo/trusted/${i + 1}.png`,
  alt: `İş Ortağı ${i + 1}`,
}));

const CARD_W = 184;

export function TrustedMarquee() {
  const { t } = useMirrorT();
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const track = [...logos, ...logos, ...logos];
  const loopWidth = CARD_W * logos.length;
  const [offset, setOffset] = useState(loopWidth);
  const paused = useRef(false);
  const last = useRef(0);

  useEffect(() => {
    let frame = 0;
    const tick = (now: number) => {
      if (!last.current) last.current = now;
      const dt = now - last.current;
      last.current = now;
      if (!paused.current) {
        setOffset((prev) => {
          let next = prev + dt * 0.05;
          if (next >= loopWidth * 2) next -= loopWidth;
          return next;
        });
      }
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [loopWidth]);

  return (
    <section
      style={{
        background: "var(--bg-section-alt)",
        padding: "4rem 0",
        overflow: "hidden",
        position: "relative",
        // mirror CSS vars on section
        ["--card-bg-gradient" as string]: isDark
          ? "radial-gradient(circle, rgba(255, 255, 255, 0.09) 0%, var(--bg-card) 85%)"
          : "radial-gradient(circle, rgba(15, 23, 42, 0.16) 0%, var(--bg-card) 85%)",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          zIndex: 2,
          background:
            "linear-gradient(to right, var(--bg-section-alt) 0%, transparent 8%, transparent 92%, var(--bg-section-alt) 100%)",
        }}
      />
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 1.5rem", marginBottom: "2rem" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          <p
            style={{
              margin: 0,
              fontSize: "0.7rem",
              fontWeight: 700,
              color: "var(--text-muted)",
              textTransform: "uppercase",
              letterSpacing: "0.1em",
              whiteSpace: "nowrap",
            }}
          >
            {t("footer.trusted")}
          </p>
          <div style={{ flex: 1, height: 1, background: "var(--border-card)" }} />
        </div>
      </div>
      <div
        style={{ overflow: "hidden", cursor: "grab" }}
        onMouseEnter={() => {
          paused.current = true;
        }}
        onMouseLeave={() => {
          paused.current = false;
        }}
      >
        <div
          style={{
            display: "flex",
            gap: 24,
            willChange: "transform",
            transform: `translateX(-${offset}px)`,
            padding: "0.5rem 0",
          }}
        >
          {track.map((logo, idx) => (
            <div
              key={`${logo.id}-${idx}`}
              style={{
                flexShrink: 0,
                width: 160,
                height: 72,
                border: "1px solid var(--border-card)",
                borderRadius: "0.875rem",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "0.75rem 1.25rem",
                background: "var(--card-bg-gradient, var(--bg-card))",
              }}
            >
              <SafeImg
                src={logo.src}
                alt={logo.alt}
                width={120}
                height={48}
                loading="lazy"
                decoding="async"
                useFallbackImage={false}
                style={{
                  objectFit: "contain",
                  maxWidth: "100%",
                  maxHeight: 48,
                  filter: "var(--logo-filter)",
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
