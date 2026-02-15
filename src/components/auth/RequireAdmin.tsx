import * as React from "react";

// TEMP: Admin gate disabled (requested). Re-enable later by restoring the original role/session checks.
export function RequireAdmin({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

