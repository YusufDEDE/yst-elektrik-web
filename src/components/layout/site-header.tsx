"use client";

import { publicationMenu, servicesMenu, type NavMenuItem } from "@/lib/nav-menus";
import { buildProductsNav } from "@/lib/products/build-products-nav";
import type { NavLinkNode } from "@/lib/products/types";
import { NestedNavDropdown } from "@/components/layout/nested-nav-dropdown";
import { useMirrorT } from "@/lib/i18n/use-mirror-t";
import { useLang } from "@/providers/lang-provider";
import { useTheme } from "@/providers/theme-provider";
import { ChevronDown, Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

type HeaderNavItem = {
  id: string;
  label: string;
  href?: string;
  children?: NavLinkNode[];
  nestedMenu?: boolean;
};

function menuToChildren(
  items: NavMenuItem[],
  t: (key: string) => string,
): { label: string; href: string }[] {
  return items.map((item) => ({ label: t(item.labelKey), href: item.href }));
}

function navIdFromPath(pathname: string): string {
  if (pathname === "/") return "anasayfa";
  if (pathname.startsWith("/about")) return "hakkimizda";
  if (pathname.startsWith("/services")) return "hizmetler";
  if (pathname.startsWith("/products")) return "urunler";
  if (pathname.startsWith("/technical-publications")) return "teknik-yayin";
  if (pathname.startsWith("/contact")) return "iletisim";
  if (pathname.startsWith("/tools")) return "araclar";
  return "";
}

function NavDropdown({
  label,
  items,
  t,
  navId,
  isActive,
}: {
  label: string;
  items: NavMenuItem[];
  t: (key: string) => string;
  navId: string;
  isActive: boolean;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onDoc = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, [open]);

  return (
    <div
      ref={ref}
      style={{ position: "relative" }}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
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
          color: open || isActive ? "var(--text-primary)" : "var(--text-secondary)",
          background: open || isActive ? "var(--bg-card)" : "transparent",
          boxShadow: open || isActive ? "0 1px 4px rgba(0,0,0,0.08)" : "none",
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
          }}
        >
          <div
            style={{
              minWidth: 240,
              background: "var(--drawer-bg)",
              border: "1px solid var(--drawer-border)",
              borderRadius: "1rem",
              padding: "0.5rem",
              boxShadow: "0 12px 40px rgba(0,0,0,0.12)",
              animation: "dropdownIn 0.2s ease",
            }}
          >
            {items.map((item) => (
              <Link
                key={item.labelKey}
                href={item.href}
                className="f500-menu-item"
                onClick={() => setOpen(false)}
                style={{
                  display: "block",
                  padding: "0.625rem 0.875rem",
                  borderRadius: "0.625rem",
                  fontSize: "0.8125rem",
                  fontWeight: 500,
                  color: "var(--text-secondary)",
                  textDecoration: "none",
                }}
              >
                {t(item.labelKey)}
              </Link>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
}

function MobileNavChild({
  child,
  onClose,
  depth = 1,
}: {
  child: NavLinkNode;
  onClose: () => void;
  depth?: number;
}) {
  const [open, setOpen] = useState(false);

  if (child.children?.length) {
    return (
      <div>
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
            padding: `0.625rem 1rem 0.625rem ${1 + 0.75 * depth}rem`,
            fontSize: "0.875rem",
            fontWeight: 500,
            color: "var(--text-secondary)",
            background: "transparent",
            border: "none",
            cursor: "pointer",
            fontFamily: "inherit",
          }}
        >
          {child.label}
          <ChevronDown
            size={14}
            style={{
              transition: "transform 0.2s",
              transform: open ? "rotate(180deg)" : "rotate(0deg)",
              color: "var(--text-muted)",
            }}
          />
        </button>
        {open ? (
          <div>
            {child.children.map((c) => (
              <MobileNavChild
                key={c.href + c.label}
                child={c}
                onClose={onClose}
                depth={depth + 1}
              />
            ))}
          </div>
        ) : null}
      </div>
    );
  }

  return (
    <Link
      href={child.href ?? "#"}
      onClick={onClose}
      style={{
        display: "block",
        padding: `0.625rem 1rem 0.625rem ${1 + 0.75 * depth}rem`,
        fontSize: "0.875rem",
        fontWeight: 400,
        color: "var(--text-secondary)",
        textDecoration: "none",
        transition: "color 0.15s",
      }}
    >
      {child.label}
    </Link>
  );
}

function MobileNavRow({
  item,
  onClose,
}: {
  item: HeaderNavItem;
  onClose: () => void;
}) {
  const [open, setOpen] = useState(false);

  if (item.children?.length) {
    return (
      <div style={{ borderBottom: "1px solid var(--border-card)" }}>
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
            padding: "0.875rem 1rem",
            fontSize: "0.9375rem",
            fontWeight: 500,
            color: "var(--text-primary)",
            background: "transparent",
            border: "none",
            cursor: "pointer",
            fontFamily: "inherit",
          }}
        >
          {item.label}
          <ChevronDown
            size={16}
            style={{
              transition: "transform 0.2s",
              transform: open ? "rotate(180deg)" : "rotate(0deg)",
              color: "var(--text-muted)",
            }}
          />
        </button>
        {open ? (
          <div style={{ paddingBottom: "0.5rem" }}>
            {item.children.map((child) => (
              <MobileNavChild
                key={child.href + child.label}
                child={child}
                onClose={onClose}
                depth={1}
              />
            ))}
          </div>
        ) : null}
      </div>
    );
  }

  return (
    <Link
      href={item.href ?? "/"}
      onClick={onClose}
      style={{
        display: "block",
        padding: "0.875rem 1rem",
        fontSize: "0.9375rem",
        fontWeight: 500,
        color: "var(--text-primary)",
        textDecoration: "none",
        borderBottom: "1px solid var(--border-card)",
      }}
    >
      {item.label}
    </Link>
  );
}

export function SiteHeader() {
  const { t } = useMirrorT();
  const { lang } = useLang();
  const pathname = usePathname();
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const activeId = navIdFromPath(pathname);

  const navItems: HeaderNavItem[] = useMemo(
    () => [
      { id: "anasayfa", label: t("nav.home"), href: "/" },
      { id: "hakkimizda", label: t("nav.corporate"), href: "/about" },
      {
        id: "hizmetler",
        label: t("nav.services"),
        children: menuToChildren(servicesMenu, t),
      },
      {
        id: "urunler",
        label: t("nav.products"),
        children: buildProductsNav(lang),
        nestedMenu: true,
      },
      {
        id: "teknik-yayin",
        label: t("nav.publication"),
        children: menuToChildren(publicationMenu, t),
      },
    ],
    [t, lang],
  );

  const closeMobile = useCallback(() => setMobileOpen(false), []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!mobileOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [mobileOpen]);

  const headerBg = mobileOpen
    ? "var(--bg-card)"
    : scrolled
      ? "var(--header-bg-scrolled)"
      : "var(--header-pill-bg)";

  const navLink = (href: string, label: string, id: string) => {
    const active = activeId === id;
    return (
      <Link
        href={href}
        style={{
          padding: "0.375rem 0.875rem",
          fontSize: "0.8125rem",
          fontWeight: active ? 600 : 500,
          color: active ? "var(--text-primary)" : "var(--text-secondary)",
          textDecoration: "none",
          borderRadius: "9999px",
          background: active ? "var(--bg-card)" : "transparent",
          boxShadow: active ? "0 1px 4px rgba(0,0,0,0.08)" : "none",
          transition: "all 0.2s ease",
          whiteSpace: "nowrap",
        }}
      >
        {label}
      </Link>
    );
  };

  return (
    <>
      <div className="pointer-events-none fixed left-0 right-0 top-0 z-[10000] px-4 pt-3">
        <header
          className="pointer-events-auto mx-auto flex h-[58px] max-w-[1100px] items-center justify-between gap-3 overflow-visible rounded-full border backdrop-blur-[18px]"
          style={{
            background: headerBg,
            borderColor: "var(--header-pill-border)",
            backdropFilter: mobileOpen ? "none" : "blur(18px)",
            WebkitBackdropFilter: mobileOpen ? "none" : "blur(18px)",
            boxShadow: scrolled
              ? "0 8px 32px rgba(0,0,0,0.12)"
              : "0 2px 16px rgba(0,0,0,0.08)",
            transition: "background 0.3s ease, box-shadow 0.3s ease",
          }}
        >
          <div className="flex h-[58px] w-full items-center justify-between gap-3 px-5">
            <Link
              href="/"
              className="flex shrink-0 items-center gap-2 no-underline"
              onClick={closeMobile}
            >
              <Image
                src="/assets/images/logo/logo_yst_circle.png"
                alt="YST Elektrik"
                width={38}
                height={38}
                className="rounded-full"
                style={{ width: 38, height: 38 }}
                priority
              />
              <span
                className="whitespace-nowrap text-[0.9375rem] font-bold tracking-tight"
                style={{ color: "var(--text-primary)" }}
              >
                YST Elektrik
              </span>
            </Link>

            <nav
              className="header-desktop-nav"
              style={{
                alignItems: "center",
                gap: "0.125rem",
                background: "var(--nav-active-bg)",
                border: "1px solid var(--nav-active-border)",
                borderRadius: "9999px",
                padding: "0.25rem",
                flexWrap: "nowrap",
              }}
            >
              {navLink("/", t("nav.home"), "anasayfa")}
              {navLink("/about", t("nav.corporate"), "hakkimizda")}
              <NavDropdown
                label={t("nav.services")}
                items={servicesMenu}
                t={t}
                navId="hizmetler"
                isActive={activeId === "hizmetler"}
              />
              {navItems.find((i) => i.id === "urunler")?.children ? (
                <NestedNavDropdown
                  label={t("nav.products")}
                  items={navItems.find((i) => i.id === "urunler")!.children!}
                  navId="urunler"
                  isActive={activeId === "urunler"}
                />
              ) : null}
              <NavDropdown
                label={t("nav.publication")}
                items={publicationMenu}
                t={t}
                navId="teknik-yayin"
                isActive={activeId === "teknik-yayin"}
              />
            </nav>

            <div className="header-desktop-right shrink-0 items-center gap-2">
              <Link
                href="/contact"
                className="btn-primary-custom"
                style={{ padding: "0.45rem 1.1rem", fontSize: "0.8375rem" }}
              >
                {t("nav.contact.cta")}
              </Link>
            </div>

            <div className="header-mobile-toggle shrink-0 items-center gap-1.5">
              <button
                type="button"
                aria-label="Menü"
                onClick={() => setMobileOpen((v) => !v)}
                style={{
                  padding: "0.35rem",
                  background: "var(--toggle-bg)",
                  border: "1px solid var(--toggle-border)",
                  borderRadius: "9999px",
                  cursor: "pointer",
                  color: "var(--toggle-text)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  transition: "background 0.2s, border-color 0.2s",
                }}
              >
                {mobileOpen ? <X size={18} /> : <Menu size={18} />}
              </button>
            </div>
          </div>
        </header>
      </div>

      {mobileOpen ? (
        <>
          <div
            role="presentation"
            onClick={closeMobile}
            style={{
              position: "fixed",
              inset: 0,
              background: "rgba(0,0,0,0.4)",
              zIndex: 9990,
              animation: "mobileOverlayIn 0.2s ease",
            }}
          />
          <div
            style={{
              position: "fixed",
              top: "calc(0.75rem + 58px + 0.5rem)",
              left: "1rem",
              right: "1rem",
              maxHeight: "calc(100vh - 6rem)",
              overflowY: "auto",
              background: "var(--bg-card)",
              border: "1px solid var(--border-card)",
              borderRadius: "1.25rem",
              boxShadow: isDark
                ? "0 20px 60px rgba(0,0,0,0.5)"
                : "0 20px 60px rgba(0,0,0,0.15)",
              zIndex: 9991,
              animation: "mobileSlideIn 0.25s ease",
            }}
          >
            <div style={{ padding: "0.5rem 0" }}>
              {navItems.map((item) => (
                <MobileNavRow key={item.id} item={item} onClose={closeMobile} />
              ))}
            </div>
            <div
              style={{
                padding: "0.75rem 1rem",
                display: "flex",
                gap: "0.5rem",
                borderTop: "1px solid var(--border-card)",
              }}
            >
              <Link
                href="/contact"
                onClick={closeMobile}
                className="btn-primary-custom"
                style={{
                  padding: "0.6rem 1.25rem",
                  fontSize: "0.875rem",
                  borderRadius: "9999px",
                  flex: 1,
                  textAlign: "center",
                  display: "block",
                }}
              >
                {t("nav.contact.cta")}
              </Link>
            </div>
          </div>
        </>
      ) : null}
    </>
  );
}
