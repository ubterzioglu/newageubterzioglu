import * as React from "react";

import { cn } from "@/lib/utils";

export type SnowfallProps = {
  className?: string;
  /** number of snow layers rendered */
  layers?: 1 | 2 | 3;
};

function usePrefersReducedMotion() {
  const [reduced, setReduced] = React.useState(false);

  React.useEffect(() => {
    const mq = window.matchMedia?.("(prefers-reduced-motion: reduce)");
    if (!mq) return;

    const onChange = () => setReduced(mq.matches);
    onChange();

    // Safari < 14
    // eslint-disable-next-line deprecation/deprecation
    mq.addEventListener ? mq.addEventListener("change", onChange) : mq.addListener(onChange);
    return () => {
      // eslint-disable-next-line deprecation/deprecation
      mq.removeEventListener ? mq.removeEventListener("change", onChange) : mq.removeListener(onChange);
    };
  }, []);

  return reduced;
}

/**
 * Lightweight CSS snowfall overlay.
 * - GPU-friendly transforms
 * - Respects prefers-reduced-motion
 */
export function SnowfallOverlay({ className, layers = 2 }: SnowfallProps) {
  const reducedMotion = usePrefersReducedMotion();

  return (
    <div aria-hidden="true" className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}>
      {Array.from({ length: layers }).map((_, idx) => {
        const isNear = idx === 0;
        const isMid = idx === 1;
        const isFar = idx === 2;

        const duration = isNear ? 9 : isMid ? 12 : 16;
        const opacity = isNear ? 0.95 : isMid ? 0.75 : 0.55;
        const size = isNear ? 320 : isMid ? 460 : 640;

        const smallFlakes =
          "radial-gradient(2px 2px at 10% 20%, hsl(var(--foreground) / 0.95) 55%, transparent 60%)," +
          "radial-gradient(1.5px 1.5px at 18% 78%, hsl(var(--foreground) / 0.85) 55%, transparent 60%)," +
          "radial-gradient(1.25px 1.25px at 30% 40%, hsl(var(--foreground) / 0.78) 55%, transparent 60%)," +
          "radial-gradient(2px 2px at 42% 64%, hsl(var(--foreground) / 0.90) 55%, transparent 60%)," +
          "radial-gradient(1px 1px at 55% 35%, hsl(var(--foreground) / 0.70) 55%, transparent 60%)," +
          "radial-gradient(2px 2px at 68% 22%, hsl(var(--foreground) / 0.92) 55%, transparent 60%)," +
          "radial-gradient(1.5px 1.5px at 76% 70%, hsl(var(--foreground) / 0.82) 55%, transparent 60%)," +
          "radial-gradient(2.25px 2.25px at 86% 48%, hsl(var(--foreground) / 0.88) 55%, transparent 60%)," +
          "radial-gradient(1px 1px at 92% 12%, hsl(var(--foreground) / 0.62) 55%, transparent 60%)";

        // Bigger / closer flakes for "more visible" snow
        const bigFlakes =
          "radial-gradient(4px 4px at 14% 28%, hsl(var(--foreground) / 0.85) 45%, transparent 55%)," +
          "radial-gradient(3px 3px at 34% 74%, hsl(var(--foreground) / 0.72) 45%, transparent 55%)," +
          "radial-gradient(4.5px 4.5px at 58% 46%, hsl(var(--foreground) / 0.80) 45%, transparent 55%)," +
          "radial-gradient(3.5px 3.5px at 78% 62%, hsl(var(--foreground) / 0.68) 45%, transparent 55%)," +
          "radial-gradient(5px 5px at 88% 18%, hsl(var(--foreground) / 0.78) 45%, transparent 55%)";

        const baseStyle: React.CSSProperties = {
          backgroundSize: `${size}px ${size}px`,
          willChange: reducedMotion ? undefined : "transform",
          animation: reducedMotion ? undefined : `snow-fall ${duration}s linear infinite`,
          opacity,
        };

        return (
          <div
            // eslint-disable-next-line react/no-array-index-key
            key={idx}
            className={cn("absolute inset-[-20%]", isNear && "[filter:blur(0.1px)]", isFar && "[filter:blur(0.4px)]")}
          >
            <div
              className="absolute inset-0"
              style={{
                ...baseStyle,
                backgroundImage: smallFlakes,
                mixBlendMode: "screen",
              }}
            />
            <div
              className="absolute inset-0"
              style={{
                ...baseStyle,
                // slightly different drift speed so it doesn't look tiled
                animation: reducedMotion ? undefined : `snow-fall ${Math.max(7, duration - 2)}s linear infinite`,
                backgroundImage: bigFlakes,
                backgroundSize: `${Math.max(260, size - 80)}px ${Math.max(260, size - 80)}px`,
                opacity: isNear ? 0.8 : 0.55,
                mixBlendMode: "screen",
                filter: "blur(0.2px)",
              }}
            />
          </div>
        );
      })}
    </div>
  );
}

