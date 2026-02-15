import * as React from "react";

import { cn } from "@/lib/utils";

export type CodeRainOverlayProps = {
  className?: string;
  /** number of depth layers rendered */
  layers?: 1 | 2 | 3;
  /** roughly how many columns on desktop */
  columns?: number;
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

const GLYPHS = "01{}[]()<>/\\;:=+-_*#@";
const TOKENS = ["assert", "expect", "describe", "it", "test", "commit", "push", "PR", "CI", "QA", "lint", "build", "ship", "merge", "404"];

function makeColumnString(seed: number) {
  // Deterministic-ish per column, but still looks random.
  const pick = (arr: string[], i: number) => arr[(i + seed) % arr.length];

  const parts: string[] = [];
  for (let i = 0; i < 18; i += 1) {
    const isToken = (i + seed) % 5 === 0;
    if (isToken) parts.push(pick(TOKENS, i));
    else parts.push(GLYPHS[(i * 7 + seed * 11) % GLYPHS.length]);
  }

  // Repeat with separators so the fall feels continuous.
  return parts.join("\n");
}

export const CodeRainOverlay = React.forwardRef<HTMLDivElement, CodeRainOverlayProps>(
  ({ className, layers = 2, columns = 26 }, ref) => {
    const reducedMotion = usePrefersReducedMotion();

    const layerConfigs = React.useMemo(() => {
      const base = [
        { opacity: 0.65, blur: 0.05, size: 12, duration: 8 },
        { opacity: 0.45, blur: 0.25, size: 11, duration: 11 },
        { opacity: 0.30, blur: 0.45, size: 10, duration: 15 },
      ] as const;

      return base.slice(0, layers);
    }, [layers]);

    const cols = React.useMemo(() => Array.from({ length: columns }).map((_, i) => i), [columns]);

    return (
      <div
        ref={ref}
        aria-hidden="true"
        className={cn(
          "pointer-events-none absolute inset-0 overflow-hidden",
          "mix-blend-screen",
          className,
        )}
      >
        {layerConfigs.map((layer, layerIdx) => (
          <div key={layerIdx} className="absolute inset-0">
            {cols.map((i) => {
              const left = ((i + layerIdx * 3) / columns) * 100;
              const delay = -((i * 0.65 + layerIdx * 1.4) % layer.duration);
              const duration = layer.duration + ((i + layerIdx) % 4);
              const xJitter = (((i * 97 + layerIdx * 31) % 9) - 4) * 0.12;

              return (
                <div
                  // eslint-disable-next-line react/no-array-index-key
                  key={i}
                  className={cn(
                    "code-rain-column absolute whitespace-pre select-none",
                    reducedMotion ? "top-0" : "-top-[120%]",
                    "font-mono tracking-[-0.02em]",
                    "text-primary",
                  )}
                  style={{
                    left: `${left + xJitter}%`,
                    fontSize: `${layer.size}px`,
                    lineHeight: 1.05,
                    opacity: layer.opacity,
                    filter: `blur(${layer.blur}px) drop-shadow(0 0 16px hsl(var(--primary) / 0.38))`,
                    ...(reducedMotion
                      ? {
                          transform: "translate3d(0, 0, 0)",
                        }
                      : {
                          animationDelay: `${delay}s`,
                          // CSS custom property
                          "--rain-duration": `${duration}s`,
                        }),
                  }}
                >
                  {makeColumnString(i + layerIdx * 17)}
                </div>
              );
            })}
          </div>
        ))}

        {/* subtle vignette to keep legibility */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(900px 600px at 70% 55%, transparent 35%, hsl(var(--background) / 0.55) 78%), linear-gradient(90deg, hsl(var(--background) / 0.92) 0%, transparent 70%)",
          }}
        />
      </div>
    );
  },
);
CodeRainOverlay.displayName = "CodeRainOverlay";

