"use client";

import { useEffect, useState } from "react";

export function useCountUp(end: number, durationMs = 2000, start = 0) {
  const [value, setValue] = useState(start);

  useEffect(() => {
    let frame = 0;
    const t0 = performance.now();
    const tick = (now: number) => {
      const p = Math.min(1, (now - t0) / durationMs);
      setValue(Math.round(start + (end - start) * p));
      if (p < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [durationMs, end, start]);

  return value;
}
