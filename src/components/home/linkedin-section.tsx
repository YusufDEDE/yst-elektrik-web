"use client";

import { SafeImg } from "@/components/ui/safe-img";
import posts from "@/lib/home/linkedin-posts.json";
import { homeSections } from "@/lib/i18n/home-sections";
import { useLang } from "@/providers/lang-provider";
import { ExternalLink } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

type Post = (typeof posts)[number];

function LinkedInPostImage({ src }: { src: string }) {
  return (
    <div
      style={{
        position: "relative",
        height: 180,
        borderRadius: "0.75rem",
        overflow: "hidden",
        background: "var(--bg-section-gray)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <SafeImg
        src={src}
        alt=""
        style={{ width: "100%", height: "100%", objectFit: "cover" }}
      />
    </div>
  );
}

function LinkedInCard({ post }: { post: Post }) {
  const { lang } = useLang();
  const [expanded, setExpanded] = useState(false);
  const content = post.content[lang];
  const date = post.date[lang];
  const tag = post.tag[lang];
  const long = content.length > 280;
  const excerpt = long && !expanded ? `${content.slice(0, 280)}...` : content;

  const readMore =
    lang === "de" ? "Mehr lesen" : lang === "en" ? "Read More" : "Devamını Oku";
  const readLess =
    lang === "de" ? "Weniger anzeigen" : lang === "en" ? "Show Less" : "Daha Az Göster";
  const viewOn =
    lang === "de"
      ? "Auf LinkedIn ansehen"
      : lang === "en"
        ? "View on LinkedIn"
        : "LinkedIn'de Gör";

  return (
    <div
      className="glass-card glass-card-hover"
      style={{
        borderRadius: "1.25rem",
        padding: "1.5rem",
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
        height: "100%",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
        <Image
          src="/assets/images/logo/logo_yst_circle.png"
          alt=""
          width={44}
          height={44}
          className="rounded-full"
          style={{ width: 44, height: 44 }}
        />
        <div>
          <p
            style={{
              margin: 0,
              fontSize: "0.875rem",
              fontWeight: 700,
              color: "var(--text-primary)",
            }}
          >
            Yusuf Süreyya Topgaç
          </p>
          <p style={{ margin: 0, fontSize: "0.75rem", color: "var(--text-muted)" }}>
            YST Elektrik · {date}
          </p>
        </div>
      </div>
      <span
        style={{
          alignSelf: "flex-start",
          fontSize: "0.6875rem",
          fontWeight: 700,
          padding: "0.25rem 0.625rem",
          borderRadius: "9999px",
          background: `${post.tagColor}22`,
          color: post.tagColor,
          border: `1px solid ${post.tagColor}44`,
        }}
      >
        {tag}
      </span>
      <p
        style={{
          margin: 0,
          fontSize: "0.875rem",
          lineHeight: 1.65,
          color: "var(--text-secondary)",
          whiteSpace: "pre-line",
          flex: 1,
        }}
      >
        {excerpt}
      </p>
      {long ? (
        <button
          type="button"
          onClick={() => setExpanded((v) => !v)}
          style={{
            alignSelf: "flex-start",
            background: "none",
            border: "none",
            color: "#2563eb",
            fontWeight: 600,
            fontSize: "0.8125rem",
            cursor: "pointer",
            padding: 0,
          }}
        >
          {expanded ? readLess : readMore}
        </button>
      ) : null}
      {post.images?.[0] ? (
        <LinkedInPostImage src={post.images[0]} />
      ) : null}
      <Link
        href={post.link}
        target="_blank"
        rel="noreferrer"
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "0.375rem",
          fontSize: "0.8125rem",
          fontWeight: 600,
          color: "#2563eb",
          textDecoration: "none",
        }}
      >
        {viewOn}
        <ExternalLink size={14} />
      </Link>
    </div>
  );
}

export function LinkedInSection() {
  const { lang } = useLang();
  const copy = homeSections[lang];

  return (
    <section
      style={{
        background: "var(--bg-section-alt)",
        padding: "6rem 0",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 1.5rem" }}>
        <div
          style={{
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
            marginBottom: "3rem",
            flexWrap: "wrap",
            gap: "1rem",
          }}
        >
          <div>
            <span
              className="section-label"
              style={{ marginBottom: "0.875rem", gap: "0.4rem" }}
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
              {copy.linkedinLabel}
            </span>
            <h2
              style={{
                fontSize: "clamp(1.75rem, 3vw, 2.5rem)",
                fontWeight: 800,
                letterSpacing: "-0.03em",
                color: "var(--text-primary)",
                margin: 0,
              }}
            >
              {copy.linkedinTitle}
            </h2>
            <p style={{ margin: "0.75rem 0 0", color: "var(--text-secondary)", maxWidth: 520 }}>
              {copy.linkedinDesc}
            </p>
          </div>
          <Link
            href="https://www.linkedin.com/in/yusuf-süreyya-topgaç-25426360/"
            target="_blank"
            rel="noreferrer"
            className="btn-primary-custom"
          >
            {copy.linkedinFollow}
          </Link>
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "1.25rem",
          }}
        >
          {posts.map((post) => (
            <LinkedInCard key={post.id} post={post} />
          ))}
        </div>
      </div>
    </section>
  );
}
