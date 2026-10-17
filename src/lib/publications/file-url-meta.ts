export function fileUrlMeta(url: string): { ext: string; color: string } {
  const lower = url.toLowerCase();
  if (lower.endsWith(".pdf")) return { ext: "PDF", color: "#ef4444" };
  if (lower.endsWith(".xlsx") || lower.endsWith(".xls")) return { ext: "XLS", color: "#22c55e" };
  if (lower.endsWith(".docx") || lower.endsWith(".doc")) return { ext: "DOC", color: "#3b82f6" };
  if (lower.endsWith(".rar") || lower.endsWith(".zip")) return { ext: "ZIP", color: "#f59e0b" };
  return { ext: "URL", color: "#8b5cf6" };
}

export function isAbsoluteHttpUrl(url: string) {
  return url.startsWith("http://") || url.startsWith("https://");
}
