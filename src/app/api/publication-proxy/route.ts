import { publicationNeedsProxy } from "@/lib/publications/proxy-url";
import { NextResponse } from "next/server";

const MAX_BYTES = 25 * 1024 * 1024;

export async function GET(request: Request) {
  const raw = new URL(request.url).searchParams.get("url");
  if (!raw) {
    return NextResponse.json({ error: "missing_url" }, { status: 400 });
  }

  let target: URL;
  try {
    target = new URL(raw);
  } catch {
    return NextResponse.json({ error: "invalid_url" }, { status: 400 });
  }

  if (!publicationNeedsProxy(target.href)) {
    return NextResponse.json({ error: "host_not_allowed" }, { status: 403 });
  }

  try {
    const upstream = await fetch(target.href, {
      headers: {
        Accept: "application/pdf,*/*",
        "User-Agent": "YST-Elektrik-PublicationViewer/1.0",
      },
      redirect: "follow",
      signal: AbortSignal.timeout(60_000),
    });

    if (!upstream.ok) {
      return NextResponse.json({ error: "upstream", status: upstream.status }, { status: 502 });
    }

    const length = upstream.headers.get("content-length");
    if (length && Number(length) > MAX_BYTES) {
      return NextResponse.json({ error: "too_large" }, { status: 413 });
    }

    const buf = Buffer.from(await upstream.arrayBuffer());
    if (buf.byteLength > MAX_BYTES) {
      return NextResponse.json({ error: "too_large" }, { status: 413 });
    }

    const contentType =
      upstream.headers.get("content-type")?.split(";")[0]?.trim() || "application/pdf";

    return new NextResponse(buf, {
      status: 200,
      headers: {
        "Content-Type": contentType,
        "Content-Disposition": "inline",
        "Cache-Control": "public, max-age=3600, stale-while-revalidate=86400",
        "X-Content-Type-Options": "nosniff",
      },
    });
  } catch (err) {
    console.error("[publication-proxy]", err);
    return NextResponse.json({ error: "fetch_failed" }, { status: 502 });
  }
}
