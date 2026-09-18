/**
 * TypeScript mirror of prototype/SCHEMA.sql.
 * Column names and enum values match the database exactly, so Supabase rows
 * (CLAUDE.md: client queries straight into hooks) need no renaming on arrival.
 * Row types are declared for the tables the UI reads today; the rest of the
 * schema gets types when a screen needs them.
 */

// -- Enums, verbatim from SCHEMA.sql -----------------------------------------
export type UserRole = 'member' | 'admin';
export type ContactPref = 'after_match' | 'always' | 'never';
export type DevicePlatform = 'ios' | 'android';
export type ItemKind = 'lost' | 'found';
export type ItemStatus = 'active' | 'resolved' | 'removed';
export type ModerationStatus = 'pending' | 'approved' | 'removed';
export type MatchStatus = 'proposed' | 'confirmed' | 'rejected';
export type TicketStatus = 'bot' | 'escalated' | 'closed';
export type MessageSender = 'user' | 'bot' | 'agent';
export type ScreenSlot = 'home' | 'registry' | 'forum' | 'report_success';
export type NotificationType =
  | 'message' | 'forum_reply' | 'item_match' | 'moderation' | 'system';

// -- Rows --------------------------------------------------------------------
/** public.profiles */
export interface Profile {
  id: string;
  username: string;
  full_name: string | null;
  avatar_url: string | null;
  role: UserRole;
  city: string | null;
  contact_sharing_pref: ContactPref;
  is_suspended: boolean;
  created_at: string;
}

/** public.categories */
export interface Category {
  id: string;
  name: string;
  icon: string;
  sort_order: number;
}

/** public.items */
export interface Item {
  id: string;
  short_code: string | null;
  reporter_id: string;
  kind: ItemKind;
  title: string;
  description: string;
  category_id: string | null;
  location_text: string;
  latitude: number | null;
  longitude: number | null;
  /** date, ISO yyyy-mm-dd */
  date_occurred: string;
  status: ItemStatus;
  moderation_status: ModerationStatus;
  flagged_count: number;
  created_at: string;
}

/**
 * What a registry row looks like after the joins the feed needs
 * (items + profiles.username + categories.name/icon). One Supabase select
 * with embedded resources returns exactly this shape.
 */
export interface ItemListRow
  extends Pick<
    Item,
    | 'id' | 'short_code' | 'kind' | 'title' | 'description' | 'location_text'
    | 'date_occurred' | 'status' | 'moderation_status' | 'flagged_count'
  > {
  reporter_username: string;
  category_name: string;
  /**
   * ponytail: the prototype gives every item its own glyph (Silver Watch =>
   * "watch", glasses => "visibility") while SCHEMA.sql only has
   * categories.icon, one per category. Carried per-row to keep the prototype's
   * fidelity. Add items.icon, or accept the category glyph, when the backend lands.
   */
  icon: string;
}

/** Labels the UI shows. "Reunited"/"Flagged" are derived, not stored. */
export type DisplayStatus = 'Active' | 'Resolved' | 'Reunited' | 'Flagged';

/**
 * SCHEMA.sql has no Reunited or Flagged in item_status. In the prototype data
 * Reunited only ever occurs on lost items and Resolved only on found ones, so
 * the label falls out of status + kind, with moderation taking precedence.
 */
export const displayStatus = (
  row: Pick<ItemListRow, 'status' | 'kind' | 'moderation_status' | 'flagged_count'>
): DisplayStatus => {
  if (row.moderation_status === 'pending' && row.flagged_count > 0) return 'Flagged';
  if (row.status === 'resolved') return row.kind === 'lost' ? 'Reunited' : 'Resolved';
  return 'Active';
};
