import * as React from "react";
import { useLocation } from "react-router-dom";

import { isAdmin } from "@/lib/auth-api";

export function RequireAdmin({ children }: { children: React.ReactNode }) {
  const [state, setState] = React.useState<"loading" | "ok" | "nope">("loading");
  const location = useLocation();

  React.useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const ok = await isAdmin();
        if (!mounted) return;
        setState(ok ? "ok" : "nope");
      } catch {
        if (!mounted) return;
        setState("nope");
      }
    })();
    return () => {
      mounted = false;
    };
  }, [location.pathname]);

  if (state === "loading") {
    return (
      <div className="min-h-screen bg-background">
        <div className="container py-10">
          <p className="text-sm text-muted-foreground">Checking access…</p>
        </div>
      </div>
    );
  }

  if (state === "nope") {
    // Keep it simple: show a link to login (avoid adding more routing logic than necessary)
    return (
      <div className="min-h-screen bg-background">
        <div className="container py-10">
          <h1 className="text-2xl font-semibold">Admin access required</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Please <a className="text-primary underline" href={`/login?next=${encodeURIComponent(location.pathname)}`}>sign in</a>.
          </p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
