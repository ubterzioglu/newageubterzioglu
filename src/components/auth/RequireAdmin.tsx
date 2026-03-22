import * as React from "react";
import { useSession } from "@/hooks/use-session";

export function RequireAdmin({ children }: { children: React.ReactNode }) {
  const { loading, session } = useSession();

  React.useEffect(() => {
    if (!loading && !session) {
      window.location.assign("/login?next=/admin");
    }
  }, [loading, session]);

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-background">
        <p className="text-sm text-muted-foreground">Checking auth…</p>
      </main>
    );
  }

  if (!session) return null;

  return <>{children}</>;
}
