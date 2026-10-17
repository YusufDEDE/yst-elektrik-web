"use client";

import type { NavLinkNode } from "@/lib/products/types";
import { ChevronDown } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

type StackFrame = { label: string; children: NavLinkNode[] };

export function NestedNavDropdown({
  label,
  items,
  isActive,
  navId,
}: {
  label: string;
  items: NavLinkNode[];
  isActive: boolean;
  navId: string;
}) {
  const [open, setOpen] = useState(false);
  const [stack, setStack] = useState<StackFrame[]>([]);
  const ref = useRef<HTMLDivElement>(null);

  const currentItems = stack.length ? stack[stack.length - 1].children : items;

  useEffect(() => {
    if (!open) return;
    const onDoc = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
        setStack([]);
      }
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, [open]);

  const closeAll = () => {
    setOpen(false);
    setStack([]);
  };

  return (
    <div
      ref={ref}
      style={{ position: "relative" }}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => {
        setOpen(false);
        setStack([]);
      }}
    >
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "0.25rem",
          padding: "0.375rem 0.875rem",
          fontSize: "0.8125rem",
          fontWeight: isActive ? 600 : 500,
          color: isActive ? "var(--text-primary)" : "var(--text-secondary)",
          background: isActive ? "var(--bg-card)" : "transparent",
          boxShadow: isActive ? "0 1px 4px rgba(0,0,0,0.08)" : "none",
          border: "none",
          borderRadius: "9999px",
          cursor: "pointer",
          whiteSpace: "nowrap",
          transition: "all 0.2s ease",
          fontFamily: "inherit",
        }}
        data-nav-id={navId}
      >
        {label}
        <ChevronDown
          size={12}
          style={{
            transition: "transform 0.2s",
            transform: open ? "rotate(180deg)" : "rotate(0deg)",
          }}
        />
      </button>
      {open ? (
        <div
          style={{
            position: "absolute",
            top: "100%",
            left: "50%",
            transform: "translateX(-50%)",
            paddingTop: "0.5rem",
            zIndex: 10001,
            pointerEvents: "auto",
          }}
        >
          <div
            style={{
              minWidth: "260px",
              maxWidth: "360px",
              background: "var(--drawer-bg)",
              border: "1px solid var(--drawer-border)",
              borderRadius: "0.875rem",
              boxShadow: "0 12px 40px rgba(0,0,0,0.12)",
              padding: "0.375rem",
              animation: "dropdownIn 0.15s ease",
              maxHeight: "70vh",
              overflowY: "auto",
            }}
          >
            {stack.length > 0 ? (
              <button
                type="button"
                onClick={() => setStack((s) => s.slice(0, -1))}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  width: "100%",
                  padding: "0.625rem 0.875rem",
                  marginBottom: "0.25rem",
                  fontSize: "0.75rem",
                  fontWeight: 700,
                  color: "#2563eb",
                  background: "rgba(37,99,235,0.05)",
                  border: "none",
                  borderRadius: "0.5rem",
                  cursor: "pointer",
                  fontFamily: "inherit",
                }}
              >
                <ChevronDown size={12} style={{ transform: "rotate(90deg)" }} />←{" "}
                {stack[stack.length - 1].label}
              </button>
            ) : null}
            {currentItems.map((item) =>
              item.children?.length ? (
                <div
                  key={item.label}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      setStack((s) => [...s, { label: item.label, children: item.children! }]);
                    }
                  }}
                  onClick={() => setStack((s) => [...s, { label: item.label, children: item.children! }])}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "0.625rem 0.875rem",
                    fontSize: "0.8125rem",
                    fontWeight: 500,
                    color: "var(--text-secondary)",
                    cursor: "pointer",
                    borderRadius: "0.5rem",
                  }}
                  className="f500-menu-item"
                >
                  <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                    {item.label}
                  </span>
                  <ChevronDown size={14} style={{ transform: "rotate(-90deg)", flexShrink: 0 }} />
                </div>
              ) : (
                <Link
                  key={item.label + (item.href ?? "")}
                  href={item.href ?? "#"}
                  onClick={closeAll}
                  className={
                    item.label === "F500" ? "f500-menu-item f500-nav-link" : "f500-menu-item"
                  }
                  style={{
                    display: "block",
                    padding: "0.625rem 0.875rem",
                    fontSize: "0.8125rem",
                    textDecoration: "none",
                    borderRadius: "0.5rem",
                    color: item.label === "F500" ? undefined : "var(--text-secondary)",
                    fontWeight: item.label === "F500" ? 700 : 500,
                  }}
                >
                  {item.label}
                </Link>
              ),
            )}
          </div>
        </div>
      ) : null}
    </div>
  );
}
