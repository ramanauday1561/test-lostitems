// Mock data extracted from prototype/Lost Items App v3 (native).dc.html, reshaped
// onto the column names and enum values in prototype/SCHEMA.sql so the same rows
// can come straight from Supabase later. Text values are unchanged, so the
// Phase 5 data-parity check still compares like for like.
import {
  displayStatus,
  type ItemKind,
  type ItemListRow,
  type Profile,
} from './schema.ts';

export type { ItemKind, ItemListRow } from './schema.ts';
export { displayStatus } from './schema.ts';

/** categories.name / categories.icon, in categories.sort_order. */
export const CATEGORIES = [
  { name: 'Electronics', icon: 'smartphone' },
  { name: 'Wallets', icon: 'account_balance_wallet' },
  { name: 'Keys', icon: 'key' },
  { name: 'Bags', icon: 'backpack' },
  { name: 'Documents', icon: 'badge' },
  { name: 'Pets', icon: 'pets' },
  { name: 'Other', icon: 'category' },
] as const;
export type CategoryName = (typeof CATEGORIES)[number]['name'];

export const FOUND_ITEMS: ItemListRow[] = [
  { id: '11111111-0000-4000-8000-000000002018', short_code: 'FOUND-2018', kind: 'found', title: 'Black Wallet', location_text: 'Riverside Park bench', date_occurred: '2024-06-11', status: 'active', moderation_status: 'approved', flagged_count: 0, icon: 'account_balance_wallet', category_name: 'Wallets', reporter_username: 'j.rivera', description: 'Handed in at the park office. Cards inside, no cash. Owner name partially legible.' },
  { id: '11111111-0000-4000-8000-000000002015', short_code: 'FOUND-2015', kind: 'found', title: 'Silver Watch', location_text: 'Coffee shop on 5th Ave', date_occurred: '2024-06-09', status: 'active', moderation_status: 'approved', flagged_count: 0, icon: 'watch', category_name: 'Other', reporter_username: 'cafe.5th', description: 'Left on a window table. Metal strap, small scratch on the clasp.' },
  { id: '11111111-0000-4000-8000-000000002009', short_code: 'FOUND-2009', kind: 'found', title: 'iPhone 15', location_text: 'Union Square subway station', date_occurred: '2024-06-06', status: 'active', moderation_status: 'approved', flagged_count: 0, icon: 'smartphone', category_name: 'Electronics', reporter_username: 'subway.finder', description: 'Locked screen, blue case. Held at the station desk pending verification.' },
  { id: '11111111-0000-4000-8000-000000001998', short_code: 'FOUND-1998', kind: 'found', title: 'Car Keys with Fob', location_text: 'Parking lot B', date_occurred: '2024-05-31', status: 'resolved', moderation_status: 'approved', flagged_count: 0, icon: 'key', category_name: 'Keys', reporter_username: 'lotb.security', description: 'Returned to owner after fob serial matched the report.' },
  { id: '11111111-0000-4000-8000-000000001990', short_code: 'FOUND-1990', kind: 'found', title: 'Student ID Card', location_text: 'City College cafeteria', date_occurred: '2024-05-28', status: 'active', moderation_status: 'approved', flagged_count: 0, icon: 'badge', category_name: 'Documents', reporter_username: 'campus.desk', description: 'Card is intact. Waiting for the registered student to claim it.' },
];

export const LOST_ITEMS: ItemListRow[] = [
  { id: '22222222-0000-4000-8000-000000001031', short_code: 'LOST-1031', kind: 'lost', title: 'Samsung Galaxy S24', location_text: 'Bus 14, evening route', date_occurred: '2024-06-05', status: 'active', moderation_status: 'pending', flagged_count: 1, icon: 'smartphone', category_name: 'Electronics', reporter_username: 'alex.j', description: 'Left on the rack above the seat. Black case, cracked corner.' },
  { id: '22222222-0000-4000-8000-000000001029', short_code: 'LOST-1029', kind: 'lost', title: 'Prescription glasses', location_text: 'City library, 2nd floor', date_occurred: '2024-06-04', status: 'active', moderation_status: 'approved', flagged_count: 0, icon: 'visibility', category_name: 'Other', reporter_username: 'm.okafor', description: 'Tortoise frames in a hard black case.' },
  { id: '22222222-0000-4000-8000-000000001024', short_code: 'LOST-1024', kind: 'lost', title: 'Blue Jansport backpack', location_text: 'Central Station platform 3', date_occurred: '2024-06-02', status: 'active', moderation_status: 'approved', flagged_count: 0, icon: 'backpack', category_name: 'Bags', reporter_username: 'simple.user', description: 'Notebook and a grey hoodie inside.' },
  { id: '22222222-0000-4000-8000-000000001018', short_code: 'LOST-1018', kind: 'lost', title: 'Grey tabby cat, no collar', location_text: 'Oak Street', date_occurred: '2024-05-29', status: 'resolved', moderation_status: 'approved', flagged_count: 0, icon: 'pets', category_name: 'Pets', reporter_username: 'd.pham', description: 'Answers to Miso. Found by a neighbour two streets away.' },
];

export const ITEMS: ItemListRow[] = [...LOST_ITEMS, ...FOUND_ITEMS];

/** profiles rows, from the prototype's MEMBERS list. */
export const MEMBERS: Profile[] = [
  { id: '33333333-0000-4000-8000-000000000001', username: 'alex.j', full_name: 'Alex Jordan', avatar_url: null, role: 'member', city: null, contact_sharing_pref: 'after_match', is_suspended: false, created_at: '2024-03-01' },
  { id: '33333333-0000-4000-8000-000000000002', username: 'subway.finder', full_name: 'Subway Finder', avatar_url: null, role: 'member', city: null, contact_sharing_pref: 'after_match', is_suspended: true, created_at: '2024-01-01' },
  { id: '33333333-0000-4000-8000-000000000003', username: 'emily.c', full_name: 'Emily Chen', avatar_url: null, role: 'member', city: null, contact_sharing_pref: 'after_match', is_suspended: false, created_at: '2024-05-01' },
  { id: '33333333-0000-4000-8000-000000000004', username: 'user', full_name: 'Simple User', avatar_url: null, role: 'member', city: null, contact_sharing_pref: 'after_match', is_suspended: false, created_at: '2024-02-01' },
  { id: '33333333-0000-4000-8000-000000000005', username: 'm.okafor', full_name: 'Marina Okafor', avatar_url: null, role: 'member', city: null, contact_sharing_pref: 'after_match', is_suspended: false, created_at: '2024-06-01' },
];

/** The prototype's signed-in non-admin handle, used by the "My posts" filter. */
export const ME = 'simple.user';

/** Prototype display format for date_occurred, e.g. "2024-06-11" -> "11 Jun 2024". */
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
export const formatDate = (iso: string): string => {
  const [y, m, d] = iso.split('-');
  return `${d} ${MONTHS[Number(m) - 1]} ${y}`; // day stays zero-padded, as the prototype renders it
};

export const REGISTRY_FILTERS = ['All', 'My posts', 'Active', 'Reunited', 'Resolved'] as const;
export type RegistryFilter = (typeof REGISTRY_FILTERS)[number];

/** Registry list for the feed: kind tab, then filter, then free-text search. */
export const filterRegistry = (
  kind: ItemKind,
  filter: RegistryFilter,
  query: string
): ItemListRow[] => {
  const source = kind === 'lost' ? LOST_ITEMS : FOUND_ITEMS;
  const byFilter =
    filter === 'All' ? source
    : filter === 'My posts' ? source.filter((i) => i.reporter_username === ME)
    : source.filter((i) => displayStatus(i) === filter);

  const q = query.trim().toLowerCase();
  if (!q) return byFilter;
  return byFilter.filter((i) =>
    `${i.title} ${i.location_text} ${i.short_code}`.toLowerCase().includes(q)
  );
};

export const getItem = (shortCode: string): ItemListRow | undefined =>
  ITEMS.find((i) => i.short_code === shortCode);
