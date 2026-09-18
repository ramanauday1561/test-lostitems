// Mock data extracted verbatim from prototype/Lost Items App v3 (native).dc.html
// (LOST, FOUND, MEMBERS, CATS, STATUS). Values are unchanged so Phase 5 data-parity
// checks compare like for like.

export type ItemKind = 'Lost' | 'Found';
export type ItemStatus = 'Active' | 'Resolved' | 'Reunited' | 'Flagged';

export interface Item {
  id: string;
  title: string;
  location: string;
  /** Display string as authored in the prototype, e.g. "11 Jun 2024". */
  date: string;
  status: ItemStatus;
  kind: ItemKind;
  /** Material Symbols Rounded glyph name (DESIGN.md §3). */
  icon: string;
  /** Handle of the reporting/finding member. */
  by: string;
  desc: string;
}

export interface User {
  id: number;
  ini: string;
  name: string;
  handle: string;
  posts: number;
  joined: string;
  suspended: boolean;
}

export const CATEGORIES = [
  'Electronics', 'Wallets', 'Keys', 'Bags', 'Documents', 'Pets', 'Other',
] as const;
export type Category = (typeof CATEGORIES)[number];

/** Status pill colours. Tailwind tokens, not hex — DESIGN.md §9 bans new hex values. */
export const STATUS_COLOR: Record<ItemStatus, string> = {
  Active: 'ink-muted',
  Resolved: 'success',
  Reunited: 'success',
  Flagged: 'danger',
};

export const FOUND_ITEMS: Item[] = [
  { id: 'FOUND-2018', title: 'Black Wallet', location: 'Riverside Park bench', date: '11 Jun 2024', status: 'Active', kind: 'Found', icon: 'account_balance_wallet', by: 'j.rivera', desc: 'Handed in at the park office. Cards inside, no cash. Owner name partially legible.' },
  { id: 'FOUND-2015', title: 'Silver Watch', location: 'Coffee shop on 5th Ave', date: '09 Jun 2024', status: 'Active', kind: 'Found', icon: 'watch', by: 'cafe.5th', desc: 'Left on a window table. Metal strap, small scratch on the clasp.' },
  { id: 'FOUND-2009', title: 'iPhone 15', location: 'Union Square subway station', date: '06 Jun 2024', status: 'Active', kind: 'Found', icon: 'smartphone', by: 'subway.finder', desc: 'Locked screen, blue case. Held at the station desk pending verification.' },
  { id: 'FOUND-1998', title: 'Car Keys with Fob', location: 'Parking lot B', date: '31 May 2024', status: 'Resolved', kind: 'Found', icon: 'key', by: 'lotb.security', desc: 'Returned to owner after fob serial matched the report.' },
  { id: 'FOUND-1990', title: 'Student ID Card', location: 'City College cafeteria', date: '28 May 2024', status: 'Active', kind: 'Found', icon: 'badge', by: 'campus.desk', desc: 'Card is intact. Waiting for the registered student to claim it.' },
];

export const LOST_ITEMS: Item[] = [
  { id: 'LOST-1031', title: 'Samsung Galaxy S24', location: 'Bus 14, evening route', date: '05 Jun 2024', status: 'Flagged', kind: 'Lost', icon: 'smartphone', by: 'alex.j', desc: 'Left on the rack above the seat. Black case, cracked corner.' },
  { id: 'LOST-1029', title: 'Prescription glasses', location: 'City library, 2nd floor', date: '04 Jun 2024', status: 'Active', kind: 'Lost', icon: 'visibility', by: 'm.okafor', desc: 'Tortoise frames in a hard black case.' },
  { id: 'LOST-1024', title: 'Blue Jansport backpack', location: 'Central Station platform 3', date: '02 Jun 2024', status: 'Active', kind: 'Lost', icon: 'backpack', by: 'simple.user', desc: 'Notebook and a grey hoodie inside.' },
  { id: 'LOST-1018', title: 'Grey tabby cat, no collar', location: 'Oak Street', date: '29 May 2024', status: 'Reunited', kind: 'Lost', icon: 'pets', by: 'd.pham', desc: 'Answers to Miso. Found by a neighbour two streets away.' },
];

export const ITEMS: Item[] = [...LOST_ITEMS, ...FOUND_ITEMS];

export const MEMBERS: User[] = [
  { id: 1, ini: 'AJ', name: 'Alex Jordan', handle: 'alex.j', posts: 11, joined: 'Mar 2024', suspended: false },
  { id: 2, ini: 'SF', name: 'Subway Finder', handle: 'subway.finder', posts: 34, joined: 'Jan 2024', suspended: true },
  { id: 3, ini: 'EC', name: 'Emily Chen', handle: 'emily.c', posts: 6, joined: 'May 2024', suspended: false },
  { id: 4, ini: 'SU', name: 'Simple User', handle: 'user', posts: 4, joined: 'Feb 2024', suspended: false },
  { id: 5, ini: 'MO', name: 'Marina Okafor', handle: 'm.okafor', posts: 2, joined: 'Jun 2024', suspended: false },
];

/** Signed-in user for the profile tab — "Simple User" is the prototype's non-admin role. */
export const CURRENT_USER: User = MEMBERS[3];

export const getItem = (id: string): Item | undefined => ITEMS.find((i) => i.id === id);

/** Handle of the prototype's signed-in non-admin user, used by the "My posts" filter. */
export const ME = 'simple.user';

export const REGISTRY_FILTERS = ['All', 'My posts', 'Active', 'Reunited', 'Resolved'] as const;
export type RegistryFilter = (typeof REGISTRY_FILTERS)[number];

/** Registry list for the feed: kind tab, then filter, then free-text search. */
export const filterRegistry = (
  kind: ItemKind,
  filter: RegistryFilter,
  query: string
): Item[] => {
  const source = kind === 'Lost' ? LOST_ITEMS : FOUND_ITEMS;
  const byFilter =
    filter === 'All' ? source
    : filter === 'My posts' ? source.filter((i) => i.by === ME)
    : source.filter((i) => i.status === filter);

  const q = query.trim().toLowerCase();
  if (!q) return byFilter;
  return byFilter.filter((i) =>
    `${i.title} ${i.location} ${i.id}`.toLowerCase().includes(q)
  );
};
