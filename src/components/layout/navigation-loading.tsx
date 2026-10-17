"use client";

import { defaultFallbackImageSrc } from "@/lib/site-config";
import Image from "next/image";
import { usePathname, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";

const SHOW_DELAY_MS = 120;

export function YstLoadingLogo({ size = 56 }: { size?: number }) {
  return (
    <div className="nav-loading-logo-wrap" aria-hidden>
      <div className="nav-loading-logo-ring" />
      <Image
        src={defaultFallbackImageSrc}
        alt=""
        width={size}
        height={size}
        className="nav-loading-logo-img"
        priority
      />
    </div>
  );
}

export function RouteLoadingMain() {
  return (
    <div className="nav-loading-main" role="status" aria-live="polite" aria-busy="true">
      <YstLoadingLogo size={64} />
      <span className="sr-only">Yükleniyor…</span>
    </div>
  );
}

function NavigationLoadingOverlay() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const search = searchParams.toString();

  const [pending, setPending] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setPending(false);
    setVisible(false);
  }, [pathname, search]);

  useEffect(() => {
    if (!pending) {
      setVisible(false);
      return;
    }
    const timer = window.setTimeout(() => setVisible(true), SHOW_DELAY_MS);
    return () => window.clearTimeout(timer);
  }, [pending]);

  useEffect(() => {
    const current = search ? `${pathname}?${search}` : pathname;

    const onClick = (event: MouseEvent) => {
      if (event.defaultPrevented) return;
      if (event.button !== 0) return;
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

      const anchor = (event.target as Element | null)?.closest("a");
      if (!anchor) return;
      if (anchor.target === "_blank" || anchor.hasAttribute("download")) return;

      const rawHref = anchor.getAttribute("href");
      if (!rawHref || rawHref.startsWith("#")) return;
      if (/^(mailto:|tel:|javascript:)/i.test(rawHref)) return;

      let next: URL;
      try {
        next = new URL(rawHref, window.location.href);
      } catch {
        return;
      }
      if (next.origin !== window.location.origin) return;

      const nextPath = `${next.pathname}${next.search}`;
      if (nextPath === current) return;

      setPending(true);
    };

    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, [pathname, search]);

  if (!visible) return null;

  return (
    <div
      className="nav-loading-overlay"
      role="status"
      aria-live="polite"
      aria-busy="true"
    >
      <YstLoadingLogo size={64} />
      <span className="sr-only">Sayfa yükleniyor…</span>
    </div>
  );
}

export function NavigationLoading() {
  return (
    <Suspense fallback={null}>
      <NavigationLoadingOverlay />
    </Suspense>
  );
}
