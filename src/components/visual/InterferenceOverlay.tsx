import * as React from "react";

import { cn } from "@/lib/utils";

type InterferenceOverlayProps = {
  className?: string;
  strength?: "subtle" | "medium";
};

/**
 * A lightweight animated layer meant to sit BETWEEN a background image and the page content.
 * Creates a cinematic scanline + film grain + gentle color drift feeling.
 */
export function InterferenceOverlay({
  className,
  strength = "subtle",
}: InterferenceOverlayProps) {
  const opacity = strength === "medium" ? "opacity-70" : "opacity-55";

  return (
    <div
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute inset-0",
        "mix-blend-mode-screen",
        opacity,
        className,
      )}
    >
      {/* scanlines */}
      <div
        className={cn(
          "absolute inset-0",
          "bg-[repeating-linear-gradient(to_bottom,hsl(var(--foreground)/0.06)_0px,hsl(var(--foreground)/0.06)_1px,transparent_3px,transparent_6px)]",
          "animate-[interference-scan_7.5s_linear_infinite]",
        )}
      />

      {/* drifting glow haze */}
      <div
        className={cn(
          "absolute -inset-12",
          "bg-[radial-gradient(900px_520px_at_20%_20%,hsl(var(--primary)/0.18),transparent_65%),radial-gradient(800px_520px_at_80%_65%,hsl(var(--glow)/0.14),transparent_62%)]",
          "animate-[interference-drift_9s_ease-in-out_infinite]",
        )}
      />

      {/* film grain (static-ish) */}
      <div
        className={cn(
          "absolute inset-0",
          "bg-[radial-gradient(circle_at_10%_20%,hsl(var(--foreground)/0.10)_0_0.8px,transparent_0.9px),radial-gradient(circle_at_70%_60%,hsl(var(--foreground)/0.08)_0_0.7px,transparent_0.8px),radial-gradient(circle_at_40%_85%,hsl(var(--foreground)/0.06)_0_0.6px,transparent_0.7px)]",
          "[background-size:140px_140px]",
          "opacity-60",
          "animate-[interference-grain_1.9s_steps(2)_infinite]",
        )}
      />

      <style>{`
        @keyframes interference-scan {
          0% { transform: translate3d(0, -2%, 0); opacity: 0.85; }
          50% { transform: translate3d(0, 2%, 0); opacity: 0.65; }
          100% { transform: translate3d(0, -2%, 0); opacity: 0.85; }
        }
        @keyframes interference-drift {
          0% { transform: translate3d(-1.5%, -1%, 0) scale(1.02); filter: saturate(1.05); }
          50% { transform: translate3d(1.25%, 1.25%, 0) scale(1.04); filter: saturate(1.12); }
          100% { transform: translate3d(-1.5%, -1%, 0) scale(1.02); filter: saturate(1.05); }
        }
        @keyframes interference-grain {
          0% { transform: translate3d(0, 0, 0); }
          20% { transform: translate3d(-0.6%, 0.35%, 0); }
          40% { transform: translate3d(0.35%, -0.45%, 0); }
          60% { transform: translate3d(-0.25%, -0.25%, 0); }
          80% { transform: translate3d(0.55%, 0.15%, 0); }
          100% { transform: translate3d(0, 0, 0); }
        }
        @media (prefers-reduced-motion: reduce) {
          .animate-[interference-scan_7.5s_linear_infinite],
          .animate-[interference-drift_9s_ease-in-out_infinite],
          .animate-[interference-grain_1.9s_steps(2)_infinite] {
            animation: none !important;
          }
        }
      `}</style>
    </div>
  );
}
