import type { Metadata } from "next";

/** Matches yst.com.tr: Next.js default 404 shell (no custom YST layout content). */
export const metadata: Metadata = {
  title: "404: This page could not be found.",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <div
      style={{
        fontFamily:
          'system-ui, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji"',
        height: "100vh",
        textAlign: "center",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div>
        <h1 style={{ display: "inline-block", margin: "0 20px 0 0", padding: "0 23px 0 0", fontSize: 24, fontWeight: 500, verticalAlign: "top", lineHeight: "49px", borderRight: "1px solid var(--border-card, rgba(0,0,0,.3))" }}>
          404
        </h1>
        <div style={{ display: "inline-block" }}>
          <h2 style={{ margin: 0, fontSize: 14, fontWeight: 400, lineHeight: "49px" }}>
            This page could not be found.
          </h2>
        </div>
      </div>
    </div>
  );
}
