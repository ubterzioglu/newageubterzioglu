import * as React from "react";
import { useSearchParams } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { signIn } from "@/lib/auth-api";

export default function LoginPage() {
  const [params] = useSearchParams();
  const next = params.get("next") || "/admin";

  const [password, setPassword] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await signIn("admin@admin.com", password);
      window.location.assign(next);
    } catch (err: any) {
      setError("Wrong password.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-background">
      <div className="container py-10">
        <div className="mx-auto max-w-md rounded-2xl border bg-card/40 p-6 shadow-glass backdrop-blur">
          <h1 className="text-2xl font-semibold">Admin</h1>
          <form className="mt-6 space-y-3" onSubmit={onSubmit}>
            <div className="space-y-1">
              <label className="text-sm">Password</label>
              <Input value={password} onChange={(e) => setPassword(e.target.value)} type="password" required autoFocus />
            </div>

            {error ? <p className="text-sm text-destructive">{error}</p> : null}

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Signing in…" : "Enter"}
            </Button>
          </form>
        </div>
      </div>
    </main>
  );
}
