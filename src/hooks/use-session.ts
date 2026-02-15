import * as React from "react";

import { getSession } from "@/lib/auth-api";

export function useSession() {
  const [loading, setLoading] = React.useState(true);
  const [session, setSession] = React.useState<Awaited<ReturnType<typeof getSession>> | null>(null);

  React.useEffect(() => {
    let mounted = true;

    (async () => {
      try {
        const s = await getSession();
        if (mounted) setSession(s);
      } finally {
        if (mounted) setLoading(false);
      }
    })();

    return () => {
      mounted = false;
    };
  }, []);

  return { loading, session };
}
