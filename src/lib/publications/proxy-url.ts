import { fileUrlMeta, isAbsoluteHttpUrl } from "@/lib/publications/file-url-meta";

const PROXY_HOSTS = new Set([
  "www.tedas.gov.tr",
  "tedas.gov.tr",
  "www.epdk.gov.tr",
  "epdk.gov.tr",
]);

export function publicationNeedsProxy(href: string): boolean {
  if (!isAbsoluteHttpUrl(href)) return false;
  try {
    const host = new URL(href).hostname.toLowerCase();
    return PROXY_HOSTS.has(host);
  } catch {
    return false;
  }
}

/** Same-origin URL for iframe preview of remote PDFs blocked by X-Frame-Options. */
export function publicationViewerSrc(href: string): string {
  const hash = "#toolbar=1&navpanes=0";
  if (publicationNeedsProxy(href) && fileUrlMeta(href).ext === "PDF") {
    return `/api/publication-proxy?url=${encodeURIComponent(href)}${hash}`;
  }
  return `${href}${hash}`;
}
