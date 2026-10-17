"use client";

import { defaultFallbackImageSrc } from "@/lib/site-config";
import {
  useCallback,
  useEffect,
  useState,
  type CSSProperties,
  type ImgHTMLAttributes,
} from "react";

type SafeImgProps = Omit<ImgHTMLAttributes<HTMLImageElement>, "src" | "onError"> & {
  src?: string;
  fallbackSrc?: string;
  /** When true, failed/missing src shows the fallback image; when false, hides the element. */
  useFallbackImage?: boolean;
};

export function SafeImg({
  src,
  fallbackSrc = defaultFallbackImageSrc,
  useFallbackImage = true,
  alt,
  style,
  ...rest
}: SafeImgProps) {
  const trimmed = src?.trim() || "";
  const [resolved, setResolved] = useState(
    trimmed || (useFallbackImage ? fallbackSrc : ""),
  );
  const [hide, setHide] = useState(!trimmed && !useFallbackImage);

  useEffect(() => {
    const next = src?.trim() || "";
    if (!next) {
      setHide(!useFallbackImage);
      setResolved(useFallbackImage ? fallbackSrc : "");
      return;
    }
    setHide(false);
    setResolved(next);
  }, [src, fallbackSrc, useFallbackImage]);

  const onError = useCallback(() => {
    setResolved((prev) => {
      if (prev === fallbackSrc) {
        setHide(true);
        return prev;
      }
      if (!useFallbackImage) {
        setHide(true);
        return prev;
      }
      return fallbackSrc;
    });
  }, [fallbackSrc, useFallbackImage]);

  if (hide || !resolved) {
    return null;
  }

  const merged: CSSProperties = {
    ...style,
    ...(resolved === fallbackSrc
      ? { objectFit: style?.objectFit ?? "contain" }
      : {}),
  };

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={resolved} alt={alt} style={merged} onError={onError} {...rest} />
  );
}
