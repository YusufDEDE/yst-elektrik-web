"use client";

import { useState } from "react";

const LETTER_COLORS = [
  "#60a5fa",
  "#818cf8",
  "#34d399",
  "#f472b6",
  "#fb923c",
  "#a78bfa",
  "#38bdf8",
  "#4ade80",
  "#f87171",
  "#facc15",
  "#2dd4bf",
  "#c084fc",
];

export function FooterBrandDisplay({ name }: { name: string }) {
  const [hovered, setHovered] = useState<number | null>(null);
  const letters = name.split("");

  return (
    <div style={{ overflow: "hidden", userSelect: "none", textAlign: "center" }}>
      <p
        style={{
          fontSize: "clamp(4rem, 14vw, 11rem)",
          fontWeight: 900,
          margin: 0,
          letterSpacing: "-0.04em",
          whiteSpace: "nowrap",
          lineHeight: 1,
          display: "inline-flex",
          alignItems: "flex-end",
        }}
      >
        {letters.map((char, index) => {
          const isHovered = hovered === index;
          const isNeighbor = hovered !== null && Math.abs(hovered - index) === 1;
          const color = isHovered
            ? LETTER_COLORS[index % LETTER_COLORS.length]
            : isNeighbor
              ? `${LETTER_COLORS[hovered! % LETTER_COLORS.length]}55`
              : "var(--border-card)";

          return (
            <span
              key={`${char}-${index}`}
              onMouseEnter={() => setHovered(index)}
              onMouseLeave={() => setHovered(null)}
              style={{
                display: "inline-block",
                color,
                transform: isHovered
                  ? "translateY(-12px) scale(1.15)"
                  : isNeighbor
                    ? "translateY(-5px) scale(1.05)"
                    : "translateY(0) scale(1)",
                transition: "color 0.2s ease, transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1)",
                cursor: "default",
              }}
            >
              {char === " " ? "\u00a0" : char}
            </span>
          );
        })}
      </p>
    </div>
  );
}
