"use client";

import { defaultFallbackImageSrc } from "@/lib/site-config";
import { useCallback, useEffect, useMemo, useState } from "react";

type ProductGalleryProps = {
  images: string[];
  alt: string;
  noImageLabel: string;
  accentColor?: string;
  fallbackSrc?: string;
};

export function ProductGallery({
  images,
  alt,
  noImageLabel,
  accentColor = "#ef4444",
  fallbackSrc = defaultFallbackImageSrc,
}: ProductGalleryProps) {
  const [active, setActive] = useState(0);
  const [broken, setBroken] = useState<Set<number>>(() => new Set());
  const list = useMemo(() => images.filter(Boolean), [images]);

  useEffect(() => {
    setActive(0);
    setBroken(new Set());
  }, [images]);

  const markBroken = useCallback((index: number) => {
    setBroken((prev) => {
      if (prev.has(index)) return prev;
      const next = new Set(prev);
      next.add(index);
      return next;
    });
  }, []);

  const mainSrc =
    list.length === 0 || broken.has(active) ? fallbackSrc : list[active];
  const mainIsFallback = list.length === 0 || broken.has(active);

  const mainImgStyle = mainIsFallback
    ? { maxWidth: "45%", maxHeight: "45%", objectFit: "contain" as const }
    : { maxWidth: "80%", maxHeight: "80%", objectFit: "contain" as const };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      <div
        style={{
          width: "100%",
          aspectRatio: "4/3",
          borderRadius: "1.5rem",
          background: "#fff",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
          border: "1px solid var(--border-card)",
          boxShadow: "0 10px 40px rgba(0,0,0,0.03)",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={mainSrc}
          alt={mainIsFallback ? noImageLabel : alt}
          style={mainImgStyle}
          onError={() => {
            if (list.length === 0) return;
            markBroken(active);
          }}
        />
      </div>
      {list.length > 1 ? (
        <div style={{ display: "flex", gap: "0.75rem", overflowX: "auto", paddingBottom: "0.5rem" }}>
          {list.map((src, index) => {
            const thumbBroken = broken.has(index);
            const thumbSrc = thumbBroken ? fallbackSrc : src;
            return (
              <button
                key={`${src}-${index}`}
                type="button"
                onClick={() => setActive(index)}
                style={{
                  width: 88,
                  height: 88,
                  borderRadius: "1rem",
                  background: "#fff",
                  border:
                    index === active ? `2.5px solid ${accentColor}` : "1px solid var(--border-card)",
                  padding: "0.5rem",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  flexShrink: 0,
                  transition: "all 0.2s",
                  boxShadow: index === active ? `0 0 0 3px ${accentColor}26` : "none",
                  outline: "none",
                }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={thumbSrc}
                  alt={`${alt} — ${index + 1}`}
                  style={{
                    maxWidth: thumbBroken ? "70%" : "100%",
                    maxHeight: thumbBroken ? "70%" : "100%",
                    objectFit: "contain",
                  }}
                  onError={() => markBroken(index)}
                />
              </button>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}
