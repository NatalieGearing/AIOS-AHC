"use client";

import { useEffect, useState } from "react";

/**
 * Counts up to `end` starting on mount (not gated behind scroll-into-view —
 * a stat that never scrolls into a narrow viewport, or a full-page capture,
 * should never get stuck showing an incomplete number).
 */
export default function CountUp({
  end,
  prefix = "",
  suffix = "",
  decimals = 0,
  duration = 1600,
  className = "",
}: {
  end: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  duration?: number;
  className?: string;
}) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    let frame: number;
    const start = performance.now();
    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(end * eased);
      if (progress < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [end, duration]);

  const formatted = value.toLocaleString("en-AU", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });

  return (
    <p className={className}>
      {prefix}
      {formatted}
      {suffix}
    </p>
  );
}
