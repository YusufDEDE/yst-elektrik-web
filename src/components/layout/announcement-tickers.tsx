"use client";

import { useMirrorT } from "@/lib/i18n/use-mirror-t";

export function AnnouncementTickers() {
  const { t } = useMirrorT();
  const main = t("header.ticker.main");
  const hv = t("header.ticker.hv");

  return (
    <>
      <div
        className="pointer-events-none fixed left-0 right-0 z-[48] px-4"
        style={{
          top: "calc(var(--site-chrome-top-pad) + var(--site-chrome-header-h) + var(--site-chrome-ticker-gap))",
        }}
      >
        <div
          className="pointer-events-none mx-auto flex h-7 max-w-[1100px] items-center overflow-hidden rounded-full shadow-[0_2px_12px_rgba(220,38,38,0.35)]"
          style={{ background: "#dc2626", animation: "tickerFadeIn 0.4s ease" }}
        >
          <div className="relative flex-1 overflow-hidden">
            <p
              className="m-0 whitespace-nowrap pl-4 text-xs font-semibold tracking-wide text-white"
              style={{ animation: "tickerScroll 14s linear infinite" }}
            >
              {main}&nbsp;&nbsp;•&nbsp;&nbsp;{main}
            </p>
          </div>
        </div>
      </div>
      <div
        className="pointer-events-none fixed left-0 right-0 z-[47] px-4"
        style={{
          top:
            "calc(var(--site-chrome-top-pad) + var(--site-chrome-header-h) + var(--site-chrome-ticker-gap) + var(--site-chrome-ticker-h) + var(--site-chrome-ticker-mid))",
        }}
      >
        <div
          className="pointer-events-none mx-auto flex h-7 max-w-[1100px] items-center overflow-hidden rounded-full shadow-[0_2px_12px_rgba(22,163,74,0.35)]"
          style={{ background: "#16a34a", animation: "tickerFadeIn 0.5s ease" }}
        >
          <div className="relative flex-1 overflow-hidden">
            <p
              className="m-0 whitespace-nowrap pl-4 text-xs font-semibold tracking-wide text-white"
              style={{ animation: "tickerScroll 16s linear infinite" }}
            >
              {hv}&nbsp;&nbsp;•&nbsp;&nbsp;{hv}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
