import Link from "next/link";

export function PageShell({
  title,
  description,
  children,
  backHref = "/",
  backLabel,
}: {
  title: string;
  description?: string;
  children?: React.ReactNode;
  backHref?: string;
  backLabel: string;
}) {
  return (
    <div className="mx-auto max-w-4xl px-6 pb-20" style={{ paddingTop: 200 }}>
      <Link
        href={backHref}
        className="text-sm font-medium no-underline"
        style={{ color: "var(--section-label-text)" }}
      >
        ← {backLabel}
      </Link>
      <h1 className="mt-4 text-4xl font-extrabold tracking-tight">{title}</h1>
      {description ? (
        <p className="mt-3 text-lg leading-relaxed" style={{ color: "var(--text-secondary)" }}>
          {description}
        </p>
      ) : null}
      <div className="mt-10">{children}</div>
    </div>
  );
}
