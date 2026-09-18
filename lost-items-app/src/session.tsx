import { createContext, useContext, useMemo, useState, type ReactNode } from 'react';

import { type Role, roleFor } from './data/mockData';

type Session = { username: string; role: Role } | null;

const Ctx = createContext<{
  session: Session;
  signIn: (username: string) => void;
  signOut: () => void;
}>({ session: null, signIn: () => {}, signOut: () => {} });

/**
 * The prototype has no real auth — signing in only picks which role's data to
 * show. This mirrors that: no tokens, no persistence, no backend.
 */
export function SessionProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session>(null);
  const value = useMemo(
    () => ({
      session,
      signIn: (username: string) =>
        setSession({ username: username.trim().toLowerCase(), role: roleFor(username) }),
      signOut: () => setSession(null),
    }),
    [session]
  );
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export const useSession = () => useContext(Ctx);
