// Mock data extracted from prototype/Lost Items App v3 (native).dc.html, reshaped
// onto the column names and enum values in prototype/SCHEMA.sql so the same rows
// can come straight from Supabase later. Text values are unchanged, so the
// Phase 5 data-parity check still compares like for like.
import {
  displayStatus,
  type AdCampaign,
  type Conversation,
  type Faq,
  type ForumThread,
  type ItemKind,
  type ItemListRow,
  type Message,
  type ModerationFlag,
  type Profile,
  type SupportMessage,
} from './schema.ts';

export type {
  AdCampaign, Conversation, Faq, ForumReply, ForumThread, ItemKind, ItemListRow, Message,
  ModerationFlag, Profile, SupportMessage,
} from './schema.ts';
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
  { id: '22222222-0000-4000-8000-000000001018', short_code: 'LOST-1018', kind: 'lost', title: 'Grey tabby cat, no collar', location_text: 'Oak Street', date_occurred: '2024-05-29', status: 'reunited', moderation_status: 'approved', flagged_count: 0, icon: 'pets', category_name: 'Pets', reporter_username: 'd.pham', description: 'Answers to Miso. Found by a neighbour two streets away.' },
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

// -- Onboarding & auth, from the prototype's SLIDES / quickLogins / socials ---

export interface Slide {
  tint: string;
  kicker: string;
  title: string;
  body: string;
}

export const SLIDES: Slide[] = [
  {
    tint: '#E2ECF7',
    kicker: 'Welcome to Lost Items Community',
    title: "Lost Something? We'll Help You Find It!",
    body: "Join thousands of people reuniting with their lost belongings every day. Report what you've found, search for what you've lost, and be part of a caring community.",
  },
  {
    tint: '#EAF1E7',
    kicker: 'How it works',
    title: 'Simple, Fast & Effective',
    body: 'Report found items in 30 seconds. Search our registry by category, location and date. Get instant notifications when a matching item is reported.',
  },
  {
    tint: '#F5EDE2',
    kicker: 'Why choose us',
    title: 'Join 10,000+ Community Members!',
    body: '100% free forever, instant notifications, and a trusted community with verified users, secure messaging and safe meetup guidelines.',
  },
];

/** profiles.role, plus the prototype's "new" member state. */
export type Role = 'admin' | 'member' | 'new';

export interface QuickLogin {
  name: string;
  handle: string;
  desc: string;
  icon: string;
  color: string;
  tint: string;
  role: Role;
}

export const QUICK_LOGINS: QuickLogin[] = [
  { name: 'Super Admin', handle: 'superadmin', desc: 'Moderation queue and member controls', icon: 'shield', color: '#0B6BCB', tint: 'rgba(11,107,203,.1)', role: 'admin' },
  { name: 'Simple User', handle: 'user', desc: 'Existing member with posts and chats', icon: 'person', color: '#0F7B3D', tint: 'rgba(15,123,61,.1)', role: 'member' },
  { name: 'New User', handle: 'newuser', desc: 'Fresh account — nothing posted yet', icon: 'person_add', color: '#B4611D', tint: 'rgba(180,97,29,.12)', role: 'new' },
];

export const SOCIALS = [
  { name: 'Google', mark: 'G', bg: '#fff', fg: '#101319', ring: true },
  { name: 'Facebook', mark: 'f', bg: '#1877F2', fg: '#fff', ring: false },
  { name: 'X', mark: 'X', bg: '#101319', fg: '#fff', ring: true },
] as const;

/** The prototype's password gate: only superadmin is actually checked. */
export const ADMIN_PASSWORD = 'Password1!';

export const roleFor = (username: string): Role => {
  const u = username.trim().toLowerCase();
  if (u === 'superadmin') return 'admin';
  if (u === 'newuser' || u === 'new') return 'new';
  return 'member';
};

/** Returns an error message, or null when the credentials pass. */
export const signInError = (username: string, password: string): string | null => {
  if (!username.trim() || !password) return 'Username and password are required.';
  if (username.trim().toLowerCase() === 'superadmin' && password !== ADMIN_PASSWORD) {
    return 'Invalid password for superadmin. Hint: Password1!';
  }
  return null;
};

// -- Forum (prototype THREADS) ------------------------------------------------

export const FORUM_THREADS: ForumThread[] = [
  {
    id: 1, author_username: 'joyce', author_name: 'Joyce', tag: 'sighting', topic: 'Sightings',
    created_at: '09:00 AM', location_text: 'Central district', helpful_count: 0, is_removed: false,
    title: 'Rolex Submariner — possible match at Central Station',
    body: 'Great news! I think I saw this matching description at the Central Station desk. Worth calling before you travel over.',
    replies: [
      { id: 1, author_username: 'marcus', author_name: 'Marcus', created_at: '09:14 AM', body: 'I was there this morning — the desk does hold watches in a sealed bag. Ask for the lost property window, not the ticket office.' },
      { id: 2, author_username: 'joyce', author_name: 'Joyce', created_at: '09:22 AM', body: 'Exactly. Bring ID and anything with the serial on it, they check before handing anything over.' },
      { id: 3, author_username: 'priya', author_name: 'Priya', created_at: '10:03 AM', body: 'Called them, they still have it. Owner has been notified through the app.' },
    ],
  },
  {
    id: 2, author_username: 'gladyce', author_name: 'Gladyce', tag: 'reunited', topic: 'Reunited',
    created_at: '08:45 AM', location_text: 'Verified', helpful_count: 0, is_removed: false,
    title: 'MacBook Pro 16 returned to its owner',
    body: 'Verified ownership serial number matches. Owner contacted successfully and collected it this morning.',
    replies: [
      { id: 1, author_username: 'elbert', author_name: 'Elbert', created_at: '09:02 AM', body: 'This is the third laptop reunited this month. The serial check makes it so much easier.' },
      { id: 2, author_username: 'owner', author_name: 'Owner', created_at: '11:20 AM', body: 'That was mine — thank you all. Two years of work on that drive.' },
    ],
  },
  {
    id: 3, author_username: 'elbert', author_name: 'Elbert', tag: 'question', topic: 'Questions',
    created_at: 'Yesterday', location_text: 'Riverside', helpful_count: 0, is_removed: false,
    title: 'How long does the desk hold handed-in items?',
    body: 'Dropped a wallet at the park office last week and it is still showing Active. Does the holding period reset after a claim?',
    replies: [
      { id: 1, author_username: 'sara', author_name: 'Sara', created_at: 'Yesterday', body: 'Most desks hold items 90 days. The status only flips to Resolved once a claim is verified by a moderator.' },
    ],
  },
];

/** Forum filter topics, in the prototype's order. */
export const FORUM_TOPICS = ['All', 'Sightings', 'Reunited', 'Questions'] as const;

// -- Ads (prototype CAMPAIGNS + ADS) ------------------------------------------

export const AD_CAMPAIGNS: AdCampaign[] = [
  { short_code: 'AD-01', campaign_name: 'KeySmart tags — 20% off', advertiser_name: 'KeySmart', screen_slot: 'home', slot_description: 'Below community activity', format: 'Native strip', size: '320 × 104', icon: 'key', cpm: 14, days: 30, days_left: 18, is_live: true, impressions: 41200, clicks: 989, revenue: 1240 },
  { short_code: 'AD-02', campaign_name: 'CityLock 24h locksmith', advertiser_name: 'CityLock', screen_slot: 'registry', slot_description: 'In-feed, after 4th listing', format: 'In-feed card', size: 'In-feed', icon: 'lock', cpm: 22, days: 14, days_left: 6, is_live: true, impressions: 88400, clicks: 2740, revenue: 2860 },
  { short_code: 'AD-03', campaign_name: 'PhoneMedic screen repair', advertiser_name: 'PhoneMedic', screen_slot: 'forum', slot_description: 'Above the first thread', format: 'In-feed card', size: 'In-feed', icon: 'smartphone', cpm: 18, days: 7, days_left: 0, is_live: false, impressions: 12900, clicks: 155, revenue: 430 },
  { short_code: 'AD-04', campaign_name: 'Trackr bag tracker bundle', advertiser_name: 'Trackr', screen_slot: 'report_success', slot_description: 'Confirmation sheet', format: 'Single offer', size: '320 × 88', icon: 'my_location', cpm: 26, days: 30, days_left: 24, is_live: true, impressions: 9400, clicks: 526, revenue: 1980 },
];

/** Rate card, the prototype's CAMPAIGNS list for the campaign picker. */
export const RATE_CARD = [
  { key: 'keysmart', campaign: 'KeySmart tags — 20% off', advertiser: 'KeySmart', icon: 'key', rate: '$14 CPM', cpm: 14 },
  { key: 'citylock', campaign: 'CityLock 24h locksmith', advertiser: 'CityLock', icon: 'lock', rate: '$22 CPM', cpm: 22 },
  { key: 'phonemedic', campaign: 'PhoneMedic screen repair', advertiser: 'PhoneMedic', icon: 'smartphone', rate: '$18 CPM', cpm: 18 },
  { key: 'trackr', campaign: 'Trackr bag tracker bundle', advertiser: 'Trackr', icon: 'my_location', rate: '$26 CPM', cpm: 26 },
] as const;

/** ctr is clicks/impressions; the prototype stores it, ad_stats derives it. */
export const ctr = (a: AdCampaign): number => Math.round((a.clicks / a.impressions) * 1000) / 10;

export const money = (n: number): string => `$${n.toLocaleString('en-US')}`;
export const compact = (n: number): string =>
  n >= 1000 ? `${(n / 1000).toFixed(n >= 10000 ? 0 : 1)}K` : String(n);

// -- Moderation (prototype FLAGGED) -------------------------------------------

export const MODERATION_FLAGS: ModerationFlag[] = [
  { target_code: 'LOST-1031', target_type: 'item', title: 'Samsung Galaxy S24', author_username: 'alex.j', category: 'Electronics', reason: 'Unverified ownership claim', created_at: '2024-06-05' },
  { target_code: 'FOUND-2009', target_type: 'item', title: 'iPhone 15', author_username: 'subway.finder', category: 'Electronics', reason: 'Suspicious contact info', created_at: '2024-06-06' },
  { target_code: 'POST-091', target_type: 'thread', title: 'Lost: Vintage Polaroid Camera', author_username: 'emily.c', category: 'Forum', reason: 'Spam / Repeated links', created_at: '2024-06-07' },
];

/** Community scouts strip on the dashboard — avatar initials only. */
export const SCOUTS = ['GL', 'EB', 'DA', 'JO', 'MA'] as const;

// -- Messaging (prototype CONVOS + CHAT_SEED) ---------------------------------

export const CONVERSATIONS: Conversation[] = [
  {
    item_short_code: 'FOUND-2015', with_username: 'cafe.5th', item_title: 'Silver Watch',
    icon: 'watch', unread: 2, last_message_at: '09:15',
    messages: [
      { sender: 'me', created_at: '09:02', body: 'Hi, I think the watch you handed in is mine. Lost it near 5th Ave on Sunday.' },
      { sender: 'them', created_at: '09:11', body: "Could be! Can you tell me what's engraved on the back?" },
      { sender: 'them', created_at: '09:15', body: "I'm at the café until 6 today if you want to collect it." },
    ],
  },
  {
    item_short_code: 'FOUND-1990', with_username: 'campus.desk', item_title: 'Student ID Card',
    icon: 'badge', unread: 0, last_message_at: 'Yesterday',
    messages: [
      { sender: 'them', created_at: '16:40', body: "Your ID is at the cafeteria desk. Bring any second ID and it's yours." },
      { sender: 'me', created_at: '17:02', body: "Perfect, I'll come by tomorrow morning. Thank you!" },
    ],
  },
  {
    item_short_code: 'FOUND-2018', with_username: 'j.rivera', item_title: 'Black Wallet',
    icon: 'account_balance_wallet', unread: 1, last_message_at: '14:22',
    messages: [
      { sender: 'them', created_at: '14:18', body: 'I found your wallet at Riverside Park! There are cards inside with your name.' },
      { sender: 'me', created_at: '14:19', body: 'Oh wow, thank you so much! Can we meet this weekend?' },
      { sender: 'them', created_at: '14:22', body: 'Sure! Saturday afternoon at the park entrance around 2pm works for me.' },
    ],
  },
  {
    item_short_code: 'FOUND-2009', with_username: 'subway.finder', item_title: 'iPhone 15',
    icon: 'smartphone', unread: 0, last_message_at: 'Two days ago',
    messages: [
      { sender: 'them', created_at: '11:45', body: 'I found an iPhone 15 at Union Square station. It was locked but the case has your name on it.' },
      { sender: 'me', created_at: '12:10', body: 'That\'s definitely mine! I was so worried. How can I get it back?' },
      { sender: 'them', created_at: '12:15', body: 'I have it at the station information desk under your name. You can pick it up anytime before 8pm.' },
    ],
  },
  {
    item_short_code: 'LOST-1024', with_username: 'emily.c', item_title: 'Blue Jansport backpack',
    icon: 'backpack', unread: 1, last_message_at: '10:30',
    messages: [
      { sender: 'them', created_at: '10:25', body: 'Hi! I think I might have seen your backpack at Central Station. Can you describe what was inside?' },
      { sender: 'me', created_at: '10:27', body: 'Yes! There should be a grey hoodie and a notebook with stickers on it.' },
      { sender: 'them', created_at: '10:30', body: 'Perfect match! I have it. Can you come pick it up today?' },
    ],
  },
  {
    item_short_code: 'LOST-1031', with_username: 'alex.j', item_title: 'Samsung Galaxy S24',
    icon: 'smartphone', unread: 0, last_message_at: 'Last week',
    messages: [
      { sender: 'them', created_at: '08:00', body: 'I saw someone with a phone matching your description on bus 14 yesterday!' },
      { sender: 'me', created_at: '08:30', body: 'Really? Do you know if they got off? That\'s exactly where I lost mine!' },
      { sender: 'them', created_at: '08:45', body: 'They got off at the downtown stop. You might want to check the lost and found there.' },
    ],
  },
];

/** Opening messages for a claim chat opened from an item. */
export const CHAT_SEED: Message[] = [
  { sender: 'them', created_at: '09:12', body: "Hi! I'm the one who handed this in. Can you describe anything unique about it so I can verify?" },
  { sender: 'me', created_at: '09:14', body: "Sure — there's a small scratch on the clasp and a folded metro ticket tucked inside." },
  { sender: 'them', created_at: '09:15', body: 'That matches. Happy to hand it over. Would you rather meet up or should I post it?' },
];

// -- Support (prototype FAQ + SUPPORT_SEED) -----------------------------------

export const FAQS: Faq[] = [
  { question: 'How do I report an item?', keywords: ['report', 'post', 'upload', 'submit'], answer: "Super easy! Tap the + button, upload a photo, add a description (colour, brand, location found), and submit. You'll get notifications when potential owners reach out. The whole process takes less than 2 minutes!" },
  { question: 'How can I claim an item?', keywords: ['claim', 'mine', 'owner', 'collect'], answer: 'Found your lost item? Open the item and use our secure messaging to contact the finder. Verify ownership by describing unique features only you would know, then arrange a safe meetup in a public place to collect it.' },
  { question: "What if I can't find my lost item?", keywords: ["can't find", 'cannot find', 'no match', 'nothing', 'missing'], answer: "Don't give up! Create a lost item post with detailed descriptions, photos and location. Enable notifications to get instant alerts when matching items are reported, and check back regularly — new items are added daily." },
  { question: 'Is the platform free?', keywords: ['free', 'cost', 'price', 'pay', 'fee', 'premium'], answer: 'Absolutely! Lost Items Community is 100% free forever. No hidden fees, no premium plans, no catch. Create unlimited posts, search the entire registry, and message other users completely free.' },
  { question: 'Is meeting a stranger safe?', keywords: ['safe', 'safety', 'meet', 'stranger', 'scam'], answer: 'Always meet in a busy public place during daylight, bring someone with you if you can, and never send money upfront. Verify ownership in chat first — and report anything suspicious so a moderator can review it.' },
];

export const SUPPORT_SEED: SupportMessage[] = [
  { sender: 'bot', created_at: '09:00', body: "Hi! I'm the Community Assistant. Ask me anything about reporting, claiming or staying safe — or pick a question below." },
];

/** The prototype's bot lookup: exact question first, then keyword contains. */
export const answerFor = (text: string): string => {
  const low = text.trim().toLowerCase();
  const hit =
    FAQS.find((f) => f.question.toLowerCase() === low) ??
    FAQS.find((f) => f.keywords.some((k) => low.includes(k)));
  return hit
    ? hit.answer
    : "I'm not sure about that one yet. A human moderator can pick this up — tap Escalate and someone will reply here.";
};

/** Initials from a handle, as the prototype's initials() helper derives them. */
export const initials = (handle: string): string => {
  const parts = String(handle || '').split(/[.@_-]/).filter(Boolean);
  const s = parts.length > 1 ? parts[0][0] + parts[parts.length - 1][0] : String(handle || '?').slice(0, 2);
  return s.toUpperCase();
};

// -- Member dashboard (prototype isUserDash) ----------------------------------

export interface DashStat { value: string; label: string; color: string }

/** Counters differ for a brand-new account, which has posted nothing. */
export const dashStats = (role: Role): DashStat[] =>
  role === 'new'
    ? [
        { value: '0', label: 'Active reports', color: '#a8acb2' },
        { value: '0', label: 'Reunited', color: '#a8acb2' },
        { value: '0', label: 'Forum posts', color: '#a8acb2' },
      ]
    : [
        { value: '2', label: 'Active reports', color: '#0B6BCB' },
        { value: '1', label: 'Reunited', color: '#0F7B3D' },
        { value: '4', label: 'Forum posts', color: '#16181F' },
      ];

export const SHORTCUTS = [
  { icon: 'travel_explore', title: 'Search lost items registry', desc: 'Browse recent lost reports from members in your city.', href: '/lost' },
  { icon: 'storefront', title: 'Search found items registry', desc: 'Check if someone handed in what you are missing.', href: '/found' },
  { icon: 'chat', title: 'Messages', desc: 'Your conversations with finders and owners.', href: '/messages' },
] as const;

export const COMMUNITY_COMMENTS = [
  { ini: 'JO', user: 'Joyce', onItem: 'Rolex Submariner', time: '09:00 AM', text: 'Great news! I think I saw this matching description at the Central Station desk.' },
  { ini: 'GL', user: 'Gladyce', onItem: 'MacBook Pro 16', time: '08:45 AM', text: 'Verified ownership serial number matches. Owner contacted successfully.' },
] as const;

/** Header kicker + title per screen, from the prototype's `titles` map. */
export const SCREEN_TITLES: Record<string, [string, string]> = {
  dash: ['Community member', 'My dashboard'],
  dashAdmin: ['Super admin', 'System control'],
  lost: ['Registry', 'Lost items'],
  found: ['Registry', 'Found items'],
  forum: ['Community', 'Forum'],
  messages: ['Inbox', 'Messages'],
  moderation: ['Super admin', 'Moderation'],
  members: ['Super admin', 'Members'],
  ads: ['Monetization', 'Ad placements'],
  analysis: ['Super admin', 'Analysis'],
};

export const unreadTotal = (): number =>
  CONVERSATIONS.reduce((n, c) => n + c.unread, 0);

// -- Password strength (prototype's `strength` helper, shared by signup/reset) -

export interface Strength { score: 0 | 1 | 2 | 3; color: string; label: string }

export const strengthOf = (pw: string): Strength => {
  const score: 0 | 1 | 2 | 3 =
    pw.length === 0 ? 0
    : pw.length < 8 ? 1
    : /[^a-z0-9]/i.test(pw) && /\d/.test(pw) ? 3
    : 2;
  return {
    score,
    color: score >= 3 ? '#0F7B3D' : score === 2 ? '#C98A00' : '#B42318',
    label:
      score === 0 ? 'Use 8+ characters with a number and a symbol'
      : score === 1 ? 'Too short — 8 characters minimum'
      : score === 2 ? 'Good. Add a symbol to make it strong.'
      : 'Strong password',
  };
};

/** The three-stage reset flow's kicker, title and body. */
export const RESET_COPY = {
  email: ['Step 1 of 3', 'Reset your password', "Enter the email on your account and we'll send a 6-digit code to confirm it's you."],
  code: ['Step 2 of 3', 'Check your inbox', 'Enter the 6-digit code we sent. It expires in 10 minutes.'],
  reset: ['Step 3 of 3', 'Choose a new password', "Pick something you haven't used here before, then confirm it."],
  done: ['All set', "You're back in", 'Your password has been changed.'],
} as const;
export type ResetStage = keyof typeof RESET_COPY;
export const RESET_ORDER: ResetStage[] = ['email', 'code', 'reset', 'done'];

/** Safe-meetup rules shown in the guidelines sheet. */
export const GUIDELINE_RULES = [
  { icon: 'public', title: 'Meet in public, in daylight', body: 'Police station lobbies, café counters and transit hubs are ideal. Never a home address, never a car park after dark.' },
  { icon: 'group_add', title: 'Bring someone with you', body: "Tell a friend where you're going and when you expect to be back. Handovers take two minutes; a companion costs nothing." },
  { icon: 'quiz', title: 'Verify before you hand over', body: "Ask the claimant to describe a detail that isn't in the listing — a scratch, a lock screen, what's in the side pocket." },
  { icon: 'lock', title: 'Keep personal data off the post', body: 'No phone numbers, addresses, serial numbers or ID scans in listings or the forum. Use in-app chat for anything specific.' },
  { icon: 'payments', title: 'No money changes hands', body: "Returns are free. Rewards, deposits and 'shipping fees' are the most common scam on the platform — report anyone who asks." },
  { icon: 'chat', title: 'Be decent in the forum', body: 'No accusations, doxxing or pile-ons. Posts that break this are suspended by Super Admins and repeat accounts are removed.' },
] as const;

/** Weekday activity bars on the admin analysis screen. */
export const ACTIVITY_BARS = [
  ['M', 9], ['T', 13], ['W', 11], ['T', 18], ['F', 14], ['S', 8], ['S', 12],
] as const;
