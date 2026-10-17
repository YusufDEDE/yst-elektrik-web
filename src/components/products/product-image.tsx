"use client";

import { defaultFallbackImageSrc } from "@/lib/site-config";
import Image from "next/image";
import { useEffect, useState, type CSSProperties } from "react";

const fallbackImgStyle: CSSProperties = {
  objectFit: "contain",
  maxWidth: "72%",
  maxHeight: "72%",
  width: "auto",
  height: "auto",
  opacity: 0.92,
};

export function ProductImage({
  src,
  alt,
  className,
  style,
  fallbackSrc = defaultFallbackImageSrc,
}: {
  src?: string;
  alt: string;
  className?: string;
  style?: CSSProperties;
  fallbackSrc?: string;
}) {
  const [failed, setFailed] = useState(!src?.trim());

  useEffect(() => {
    setFailed(!src?.trim());
  }, [src]);

  const showFallback = !src?.trim() || failed;

  if (showFallback) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={fallbackSrc}
        alt={alt}
        className={className}
        style={{ ...fallbackImgStyle, ...style }}
      />
    );
  }

  const mergedStyle: CSSProperties = {
    objectFit: style?.objectFit ?? "cover",
    width: style?.width ?? "100%",
    height: style?.height ?? "100%",
    ...style,
  };

  const isRemote = src!.startsWith("http");

  if (isRemote) {
    return (
      <Image
        src={src!}
        alt={alt}
        width={640}
        height={400}
        unoptimized
        className={className}
        style={mergedStyle}
        onError={() => setFailed(true)}
      />
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      className={className}
      style={mergedStyle}
      onError={() => setFailed(true)}
    />
  );
}
