"use client";

import { useMirrorT } from "@/lib/i18n/use-mirror-t";
import {
  heroBackgroundPoster,
  heroBackgroundVideoSrc,
} from "@/lib/site-config";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

function useProdCountUp(end: number, durationMs = 1800) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    let current = 0;
    const step = Math.ceil(end / (durationMs / 16));
    const id = setInterval(() => {
      current += step;
      if (current >= end) {
        setValue(end);
        clearInterval(id);
      } else {
        setValue(current);
      }
    }, 16);
    return () => clearInterval(id);
  }, [durationMs, end]);

  return value;
}

function Stat({
  end,
  suffix,
  label,
}: {
  end: number;
  suffix: string;
  label: string;
}) {
  const value = useProdCountUp(end);
  return (
    <div style={{ textAlign: "center" }}>
      <p
        style={{
          margin: 0,
          fontSize: "clamp(1.5rem, 2.5vw, 2.25rem)",
          fontWeight: 800,
          letterSpacing: "-0.02em",
          lineHeight: 1,
          color: "#fff",
        }}
      >
        {value}
        {suffix}
      </p>
      <p
        style={{
          margin: "0.25rem 0 0",
          fontSize: "0.85rem",
          color: "rgba(255,255,255,0.7)",
          fontWeight: 500,
        }}
      >
        {label}
      </p>
    </div>
  );
}

export function HeroSection() {
  const { t } = useMirrorT();

  return (
    <section
      id="anasayfa"
      style={{
        position: "relative",
        overflow: "hidden",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        paddingTop: "200px",
        backgroundColor: "#0f172a",
        zIndex: 0,
      }}
    >
      <video
        autoPlay
        loop
        muted
        playsInline
        poster={heroBackgroundPoster}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          zIndex: -2,
        }}
      >
        <source src={heroBackgroundVideoSrc} type="video/mp4" />
      </video>
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(to bottom, rgba(2,6,23,0.3) 0%, rgba(2,6,23,0.7) 100%)",
          zIndex: -1,
        }}
      />
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "0 1.5rem",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          position: "relative",
          zIndex: 1,
        }}
      >
        <h1
          style={{
            fontSize: "clamp(3rem, 8vw, 6rem)",
            fontWeight: 900,
            letterSpacing: "-0.03em",
            lineHeight: 1.05,
            color: "#fff",
            margin: "0 0 1.5rem",
            maxWidth: 900,
            animation: "heroFadeUp 0.8s ease both",
          }}
        >
          {t("home.hero.title1")}{" "}
          <span style={{ color: "#34d399" }}>{t("home.hero.title2")}</span>
        </h1>
        <p
          style={{
            fontSize: "clamp(1.125rem, 2.5vw, 1.35rem)",
            color: "rgba(255,255,255,0.8)",
            maxWidth: 600,
            lineHeight: 1.6,
            margin: "0 0 3rem",
            fontWeight: 400,
            animation: "heroFadeUp 0.8s 0.2s ease both",
          }}
        >
          {t("home.hero.subtitle")}
        </p>
        <div
          style={{
            display: "flex",
            gap: "1rem",
            flexWrap: "wrap",
            justifyContent: "center",
            marginBottom: "4rem",
            animation: "heroFadeUp 0.8s 0.4s ease both",
          }}
        >
          <Link
            href="/contact"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              padding: "1rem 2.5rem",
              background: "#fff",
              borderRadius: "9999px",
              fontSize: "1rem",
              fontWeight: 700,
              color: "#0f172a",
              textDecoration: "none",
              transition: "all 0.3s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-3px)";
              e.currentTarget.style.boxShadow = "0 10px 40px rgba(255,255,255,0.2)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "";
              e.currentTarget.style.boxShadow = "none";
            }}
          >
            {t("home.hero.cta.start")}
            <ArrowRight size={18} />
          </Link>
          <Link
            href="/services"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              padding: "1rem 2.5rem",
              background: "rgba(255,255,255,0.1)",
              border: "1px solid rgba(255,255,255,0.2)",
              borderRadius: "9999px",
              fontSize: "1rem",
              fontWeight: 600,
              color: "#fff",
              textDecoration: "none",
              backdropFilter: "blur(10px)",
              transition: "all 0.3s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "rgba(255,255,255,0.2)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "rgba(255,255,255,0.1)";
            }}
          >
            {t("home.hero.cta.explore")}
          </Link>
        </div>
        <div
          className="hero-stats-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "2rem",
            width: "100%",
            maxWidth: 700,
            background: "rgba(255,255,255,0.05)",
            border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: "1.5rem",
            padding: "2rem",
            backdropFilter: "blur(16px)",
            animation: "heroFadeUp 0.8s 0.6s ease both",
          }}
        >
          <Stat
            end={100}
            suffix="+"
            label={t("home.hero.stats.projects")}
          />
          <Stat
            end={10}
            suffix={t("home.hero.stats.experience.suffix")}
            label={t("home.hero.stats.experience")}
          />
          <Stat end={50} suffix="+" label={t("home.hero.stats.clients")} />
        </div>
      </div>
      <style>{`
        @media (max-width: 640px) {
          .hero-stats-grid {
            grid-template-columns: 1fr !important;
            gap: 1.5rem;
            padding: 1.5rem;
          }
        }
      `}</style>
    </section>
  );
}
