"use client";

import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";

export type FaqItem = { q: string; a: string };

export function FaqAccordion({
  items,
  initialOpen = 0,
}: {
  items: FaqItem[];
  initialOpen?: number | null;
}) {
  const [open, setOpen] = useState<number | null>(initialOpen);

  return (
    <div
      style={{
        border: "1px solid var(--border-card)",
        borderRadius: "1rem",
        overflow: "hidden",
      }}
    >
      {items.map((item, i) => {
        const isOpen = open === i;
        return (
          <div
            key={item.q}
            style={{
              borderBottom: i < items.length - 1 ? "1px solid var(--border-card)" : "none",
            }}
          >
            <button
              type="button"
              onClick={() => setOpen(isOpen ? null : i)}
              style={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "1.25rem 1.5rem",
                background: "none",
                border: "none",
                cursor: "pointer",
                textAlign: "left",
                fontFamily: "inherit",
                color: isOpen ? "#2563eb" : "var(--text-primary)",
                fontWeight: 600,
                fontSize: "0.9375rem",
                transition: "color 0.2s",
              }}
            >
              <span style={{ paddingRight: "1rem" }}>{item.q}</span>
              <span
                style={{
                  flexShrink: 0,
                  width: 28,
                  height: 28,
                  borderRadius: "50%",
                  background: isOpen ? "#2563eb" : "var(--bg-section-alt)",
                  border: `1px solid ${isOpen ? "#2563eb" : "var(--border-card)"}`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  transition: "background 0.2s, border-color 0.2s",
                }}
              >
                {isOpen ? (
                  <ChevronUp size={14} color="#fff" />
                ) : (
                  <ChevronDown size={14} color="var(--text-muted)" />
                )}
              </span>
            </button>
            {isOpen ? (
              <div
                style={{
                  padding: "0 1.5rem 1.25rem",
                  fontSize: "0.9375rem",
                  color: "var(--text-secondary)",
                  lineHeight: 1.75,
                }}
              >
                {item.a}
              </div>
            ) : null}
          </div>
        );
      })}
    </div>
  );
}
