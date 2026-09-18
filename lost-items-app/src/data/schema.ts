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
export type ItemStatus = 'active' | 'resolved' | 'reunited' | 'removed';
export type ModerationStatus = 'pending' | 'approved' | 'removed';
export type ForumTag = 'sighting' | 'reunited' | 'question';
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
 * item_status now carries 'reunited' (the prototype lets an owner set it), so
 * the label is the stored status title-cased. Flagged is still derived:
 * it is a moderation state, not an item state.
 */
export const displayStatus = (
  row: Pick<ItemListRow, 'status' | 'moderation_status' | 'flagged_count'>
): DisplayStatus => {
  if (row.moderation_status === 'pending' && row.flagged_count > 0) return 'Flagged';
  if (row.status === 'removed') return 'Active';
  return (row.status.charAt(0).toUpperCase() + row.status.slice(1)) as DisplayStatus;
};

// -- Rows for the remaining prototype surfaces --------------------------------

/** public.forum_threads + author + reply rows. */
export interface ForumReply {
  id: number;
  author_username: string;
  author_name: string;
  body: string;
  created_at: string;
}

export interface ForumThread {
  id: number;
  author_username: string;
  author_name: string;
  tag: ForumTag;
  topic: string;
  title: string;
  body: string;
  /** Time half of the meta line, e.g. "09:00 AM" or "Yesterday". */
  created_at: string;
  location_text: string | null;
  helpful_count: number;
  is_removed: boolean;
  replies: ForumReply[];
}

/** public.ad_campaigns joined with its aggregated ad_stats. */
export interface AdCampaign {
  short_code: string;
  advertiser_name: string;
  campaign_name: string;
  screen_slot: ScreenSlot;
  slot_description: string;
  format: string;
  size: string;
  icon: string;
  cpm: number;
  days: number;
  days_left: number;
  is_live: boolean;
  impressions: number;
  clicks: number;
  revenue: number;
}

/** public.moderation_flags joined with its target. */
export interface ModerationFlag {
  target_code: string;
  target_type: 'item' | 'thread';
  title: string;
  author_username: string;
  category: string;
  reason: string;
  created_at: string;
}

/** public.messages within a conversation. */
export interface Message {
  sender: 'me' | 'them';
  body: string;
  created_at: string;
}

/** public.conversations joined with its item and counterpart. */
export interface Conversation {
  item_short_code: string;
  with_username: string;
  item_title: string;
  icon: string;
  unread: number;
  last_message_at: string;
  messages: Message[];
}

/** public.faqs */
export interface Faq {
  question: string;
  answer: string;
  keywords: string[];
}

/** public.support_messages */
export interface SupportMessage {
  sender: MessageSender;
  body: string;
  created_at: string;
}
