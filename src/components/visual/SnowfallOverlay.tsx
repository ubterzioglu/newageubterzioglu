import * as React from "react";

import { cn } from "@/lib/utils";

export type SnowfallProps = {
  className?: string;
  /** number of snow layers rendered */
  layers?: 1 | 2 | 3;
};

/**
 * Lightweight CSS snowfall overlay.
 * - GPU-friendly transforms
 * - Respects prefers-reduced-motion
 */
export function SnowfallOverlay({ className, layers = 2 }: SnowfallProps) {
  return (
    <div
      aria-hidden="true"
      className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}
    >
      {Array.from({ length: layers }).map((_, idx) => (
        <div
          // eslint-disable-next-line react/no-array-index-key
          key={idx}
          className={cn(
            "absolute inset-[-20%]",
            idx === 0 && "snow-layer snow-layer--near",
            idx === 1 && "snow-layer snow-layer--mid",
            idx === 2 && "snow-layer snow-layer--far",
          )}
        />
      ))}
    </div>
  );
}
