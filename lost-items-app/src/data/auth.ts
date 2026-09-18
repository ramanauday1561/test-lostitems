// Static logins, exactly as the prototype's signIn()/quick()/roleState() define them.
// No backend: this is the Frontend-First stand-in until Supabase Auth lands.
import { FOUND_ITEMS, LOST_ITEMS, ME } from './mockData.ts';
import type { ItemListRow, UserRole } from './schema.ts';

/** The prototype's roles. 'new' is a member whose account has no posts yet. */
export type Role = UserRole | 'new';

export interface Session {
  username: string;
  role: Role;
}

/** Password the prototype hard-checks for superadmin, and prefills for quick logins. */
export const DEMO_PASSWORD = 'Password1!';

export interface QuickLogin {
  name: string;
  handle: string;
  desc: string;
  icon: string;
  color: string;
  tint: string;
}

export const QUICK_LOGINS: QuickLogin[] = [
  { name: 'Super Admin', handle: 'superadmin', desc: 'Moderation queue and member controls', icon: 'shield', color: '#0B6BCB', tint: 'rgba(11,107,203,.1)' },
  { name: 'Simple User', handle: 'user', desc: 'Existing member with posts and chats', icon: 'person', color: '#0F7B3D', tint: 'rgba(15,123,61,.1)' },
  { name: 'New User', handle: 'newuser', desc: 'Fresh account — nothing posted yet', icon: 'person_add', color: '#B4611D', tint: 'rgba(180,97,29,.12)' },
];

export const SOCIALS = [
  { name: 'Google', mark: 'G', bg: '#fff', fg: '#101319', ring: true },
  { name: 'Facebook', mark: 'f', bg: '#1877F2', fg: '#fff', ring: false },
  { name: 'X', mark: 'X', bg: '#101319', fg: '#fff', ring: true },
] as const;

export const roleFor = (username: string): Role => {
  const u = username.trim().toLowerCase();
  if (u === 'superadmin') return 'admin';
  if (u === 'newuser' || u === 'new') return 'new';
  return 'member';
};

export type SignInResult =
  | { ok: true; session: Session }
  | { ok: false; error: string };

/**
 * Any username is accepted with any password, except superadmin, whose password
 * the prototype checks and whose error message leaks the hint on purpose.
 */
export const signIn = (username: string, password: string): SignInResult => {
  const u = username.trim().toLowerCase();
  if (!u || !password) return { ok: false, error: 'Username and password are required.' };
  if (u === 'superadmin' && password !== DEMO_PASSWORD) {
    return { ok: false, error: `Invalid password for superadmin. Hint: ${DEMO_PASSWORD}` };
  }
  return { ok: true, session: { username: u, role: roleFor(u) } };
};

/**
 * A 'new' account sees the registry without its own posts, so "My posts" is
 * empty for it. Admin and member see everything.
 */
export const visibleItems = (role: Role): { lost: ItemListRow[]; found: ItemListRow[] } =>
  role === 'new'
    ? {
        lost: LOST_ITEMS.filter((i) => i.reporter_username !== ME),
        found: FOUND_ITEMS.filter((i) => i.reporter_username !== ME),
      }
    : { lost: LOST_ITEMS, found: FOUND_ITEMS };
