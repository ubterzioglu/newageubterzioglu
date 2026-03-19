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
  const opacity = strength === "medium" ? "opacity-95" : "opacity-85";

  return (
    <div
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute inset-0 z-[1]",
        "mix-blend-normal",
        opacity,
        className,
      )}
    >
      {/* scanlines */}
      <div
        className={cn(
          "absolute inset-0",
          "bg-[repeating-linear-gradient(to_bottom,hsl(var(--foreground)/0.24)_0px,hsl(var(--foreground)/0.24)_1px,transparent_3px,transparent_6px)]",
          "animate-[interference-scan_4.6s_linear_infinite]",
        )}
      />

      {/* drifting glow haze */}
      <div
        className={cn(
          "absolute -inset-12",
          "bg-[radial-gradient(900px_520px_at_20%_20%,hsl(var(--primary)/0.20),transparent_65%),radial-gradient(800px_520px_at_80%_65%,hsl(var(--glow)/0.16),transparent_62%)]",
          "animate-[interference-drift_6.5s_ease-in-out_infinite]",
        )}
      />

      {/* film grain (static-ish) */}
      <div
        className={cn(
          "absolute inset-0",
          "bg-[radial-gradient(circle_at_10%_20%,hsl(var(--foreground)/0.11)_0_0.8px,transparent_0.9px),radial-gradient(circle_at_70%_60%,hsl(var(--foreground)/0.10)_0_0.7px,transparent_0.8px),radial-gradient(circle_at_40%_85%,hsl(var(--foreground)/0.08)_0_0.6px,transparent_0.7px)]",
          "[background-size:120px_120px]",
          "opacity-70",
          "animate-[interference-grain_1.2s_steps(2)_infinite]",
        )}
      />

      {/* chromatic “glitch” sweep band */}
      <div
        className={cn(
          "absolute -inset-x-12 inset-y-0",
          "bg-[linear-gradient(90deg,transparent_0%,hsl(var(--primary)/0.00)_38%,hsl(var(--primary)/0.44)_50%,hsl(var(--glow)/0.36)_56%,transparent_72%)]",
          "mix-blend-screen",
          "animate-[interference-sweep_3.4s_ease-in-out_infinite]",
          "opacity-90",
          "[filter:contrast(1.12)]",
        )}
      />

      {/* micro jitter + flicker */}
      <div
        className={cn(
          "absolute inset-0",
          "bg-[radial-gradient(700px_380px_at_65%_30%,hsl(var(--primary)/0.10),transparent_62%)]",
          "mix-blend-overlay",
          "animate-[interference-jitter_820ms_steps(2)_infinite]",
        )}
      />

      <style>{`
        @keyframes interference-scan {
          0% { transform: translate3d(0, -2%, 0); opacity: 0.90; }
          50% { transform: translate3d(0, 2%, 0); opacity: 0.62; }
          100% { transform: translate3d(0, -2%, 0); opacity: 0.90; }
        }
        @keyframes interference-drift {
          0% { transform: translate3d(-2.4%, -1.6%, 0) scale(1.04); filter: saturate(1.08) contrast(1.02); }
          50% { transform: translate3d(2.0%, 2.2%, 0) scale(1.06); filter: saturate(1.18) contrast(1.05); }
          100% { transform: translate3d(-2.4%, -1.6%, 0) scale(1.04); filter: saturate(1.08) contrast(1.02); }
        }
        @keyframes interference-grain {
          0% { transform: translate3d(0, 0, 0); opacity: 0.60; }
          25% { transform: translate3d(-0.9%, 0.55%, 0); opacity: 0.78; }
          50% { transform: translate3d(0.55%, -0.75%, 0); opacity: 0.68; }
          75% { transform: translate3d(-0.45%, -0.35%, 0); opacity: 0.82; }
          100% { transform: translate3d(0, 0, 0); opacity: 0.60; }
        }
        @keyframes interference-sweep {
          0% { transform: translate3d(-18%, 0, 0) skewX(-8deg); opacity: 0.0; }
          20% { opacity: 0.65; }
          50% { transform: translate3d(6%, 0, 0) skewX(-8deg); opacity: 0.85; }
          80% { opacity: 0.45; }
          100% { transform: translate3d(22%, 0, 0) skewX(-8deg); opacity: 0.0; }
        }
        @keyframes interference-jitter {
          0% { transform: translate3d(0, 0, 0); opacity: 0.35; filter: blur(0px); }
          25% { transform: translate3d(0.6%, -0.25%, 0); opacity: 0.50; filter: blur(0.2px); }
          50% { transform: translate3d(-0.35%, 0.35%, 0); opacity: 0.30; filter: blur(0px); }
          75% { transform: translate3d(0.25%, 0.1%, 0); opacity: 0.55; filter: blur(0.25px); }
          100% { transform: translate3d(0, 0, 0); opacity: 0.35; filter: blur(0px); }
        }
      `}</style>
    </div>
  );
}
