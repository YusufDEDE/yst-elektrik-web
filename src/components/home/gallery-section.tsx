"use client";

import { SafeImg } from "@/components/ui/safe-img";
import { galleryItems, type GalleryItem } from "@/lib/home/gallery-items";
import { homeSections } from "@/lib/i18n/home-sections";
import { useLang } from "@/providers/lang-provider";
import { ArrowRight, Play, Volume2, VolumeX } from "lucide-react";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState, type CSSProperties } from "react";

type Filter = "all" | "video" | "image";

const itemShell: CSSProperties = {
  borderRadius: "1.5rem",
  overflow: "hidden",
  border: "1px solid var(--border-card)",
  boxShadow: "0 10px 30px rgba(0,0,0,0.05)",
  width: "100%",
  aspectRatio: "1.3 / 1",
  position: "relative",
};

function GalleryVideo({ src }: { src: string }) {
  const ref = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(true);
  const [muted, setMuted] = useState(true);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onPlay = () => setPlaying(true);
    const onPause = () => setPlaying(false);
    el.addEventListener("play", onPlay);
    el.addEventListener("pause", onPause);
    return () => {
      el.removeEventListener("play", onPlay);
      el.removeEventListener("pause", onPause);
    };
  }, []);

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={() => {
        const v = ref.current;
        if (!v) return;
        if (playing) v.pause();
        else void v.play().catch(() => undefined);
      }}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          const v = ref.current;
          if (!v) return;
          if (playing) v.pause();
          else void v.play().catch(() => undefined);
        }
      }}
      style={{ ...itemShell, background: "#020617", cursor: "pointer" }}
    >
      <video
        ref={ref}
        src={src}
        autoPlay
        muted={muted}
        playsInline
        loop
        className="gallery-image"
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          display: "block",
        }}
      />
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          const v = ref.current;
          if (!v) return;
          v.muted = !muted;
          setMuted(!muted);
        }}
        style={{
          position: "absolute",
          top: "1rem",
          right: "1rem",
          width: 36,
          height: 36,
          borderRadius: "50%",
          background: "rgba(15, 23, 42, 0.6)",
          backdropFilter: "blur(8px)",
          WebkitBackdropFilter: "blur(8px)",
          border: "1px solid rgba(255, 255, 255, 0.2)",
          color: "#fff",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          transition: "all 0.2s ease",
          zIndex: 10,
          outline: "none",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = "rgba(15, 23, 42, 0.8)";
          e.currentTarget.style.transform = "scale(1.05)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = "rgba(15, 23, 42, 0.6)";
          e.currentTarget.style.transform = "scale(1)";
        }}
        aria-label={muted ? "Sesi aç" : "Sesi kapat"}
      >
        {muted ? <VolumeX size={16} /> : <Volume2 size={16} />}
      </button>
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "rgba(0, 0, 0, 0.25)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          opacity: playing ? 0 : 1,
          pointerEvents: "none",
          transition: "opacity 0.3s ease",
          zIndex: 5,
        }}
      >
        <div
          style={{
            width: 56,
            height: 56,
            borderRadius: "50%",
            background: "rgba(255, 255, 255, 0.25)",
            backdropFilter: "blur(8px)",
            WebkitBackdropFilter: "blur(8px)",
            border: "1px solid rgba(255, 255, 255, 0.35)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#fff",
          }}
        >
          <Play size={20} fill="#fff" style={{ marginLeft: 3 }} />
        </div>
      </div>
    </div>
  );
}

function GalleryPhoto({ src, alt }: { src: string; alt: string }) {
  return (
    <div style={{ ...itemShell, background: "var(--bg-card)" }}>
      <SafeImg
        src={src}
        alt={alt}
        className="gallery-image"
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          display: "block",
          transition: "transform 0.4s ease",
        }}
      />
    </div>
  );
}

export function GallerySection() {
  const { lang } = useLang();
  const copy = homeSections[lang];
  const [filter, setFilter] = useState<Filter>("all");

  const filtered = useMemo(() => {
    if (filter === "all") return galleryItems;
    return galleryItems.filter((g) => g.type === filter);
  }, [filter]);

  const counts = {
    all: galleryItems.length,
    video: galleryItems.filter((g) => g.type === "video").length,
    image: galleryItems.filter((g) => g.type === "image").length,
  };

  const filters: { id: Filter; label: string; count: number }[] = [
    { id: "all", label: copy.filterAll, count: counts.all },
    { id: "video", label: copy.filterVideos, count: counts.video },
    {
      id: "image",
      label: lang === "de" ? "Bilder" : copy.filterPhotos,
      count: counts.image,
    },
  ];

  return (
    <section
      id="galeri"
      style={{ background: "var(--bg-page)", padding: "6rem 0", position: "relative" }}
    >
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 1.5rem" }}>
        <div
          style={{
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
            marginBottom: "3rem",
            flexWrap: "wrap",
            gap: "1.5rem",
          }}
        >
          <div>
            <span
              className="section-label"
              style={{ marginBottom: "0.875rem", display: "inline-flex" }}
            >
              {copy.galleryLabel}
            </span>
            <h2
              style={{
                fontSize: "clamp(2rem, 3.5vw, 2.75rem)",
                fontWeight: 800,
                letterSpacing: "-0.03em",
                color: "var(--text-primary)",
                margin: 0,
                lineHeight: 1.1,
              }}
            >
              {copy.galleryTitle1}{" "}
              <span style={{ color: "#10b981" }}>{copy.galleryTitle2}</span>
            </h2>
            <p
              style={{
                margin: "0.75rem 0 0",
                fontSize: "1rem",
                color: "var(--text-secondary)",
                maxWidth: 500,
                lineHeight: 1.6,
              }}
            >
              {copy.galleryDesc}
            </p>
          </div>
          <Link
            href="/services"
            className="btn-outline-custom"
            style={{
              gap: "0.5rem",
              flexShrink: 0,
              textDecoration: "none",
              display: "inline-flex",
              alignItems: "center",
            }}
          >
            {copy.galleryCta}
            <ArrowRight size={14} />
          </Link>
        </div>

        <div
          style={{
            display: "flex",
            gap: "0.5rem",
            marginBottom: "2.5rem",
            overflowX: "auto",
            scrollbarWidth: "none",
            paddingBottom: "0.25rem",
          }}
        >
          {filters.map((tab) => {
            const active = filter === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setFilter(tab.id)}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  padding: "0.5rem 1.125rem",
                  borderRadius: "9999px",
                  border: active
                    ? "1.5px solid #10b981"
                    : "1.5px solid var(--border-card)",
                  background: active ? "rgba(16, 185, 129, 0.08)" : "var(--bg-card)",
                  color: active ? "#10b981" : "var(--text-secondary)",
                  fontSize: "0.8125rem",
                  fontWeight: active ? 700 : 600,
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                  fontFamily: "inherit",
                  whiteSpace: "nowrap",
                }}
              >
                {tab.label}
                <span
                  style={{
                    fontSize: "0.6875rem",
                    fontWeight: 700,
                    padding: "0.125rem 0.5rem",
                    borderRadius: "9999px",
                    background: active ? "rgba(16, 185, 129, 0.2)" : "rgba(0,0,0,0.05)",
                    color: active ? "#10b981" : "var(--text-muted)",
                  }}
                >
                  {tab.count}
                </span>
              </button>
            );
          })}
        </div>

        <div className="gallery-grid">
          {filtered.map((item: GalleryItem, i) => (
            <div
              key={item.src}
              className="gallery-item-wrapper"
              style={{
                animation: `galleryIn 0.5s ${i * 0.06}s ease both`,
                position: "relative",
              }}
            >
              {item.type === "video" ? (
                <GalleryVideo src={item.src} />
              ) : (
                <GalleryPhoto src={item.src} alt={item.alt} />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
