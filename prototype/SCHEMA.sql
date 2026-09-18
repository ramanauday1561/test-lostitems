-- Extensions
create extension if not exists "uuid-ossp";

-- Enums
create type user_role as enum ('member', 'admin');
create type contact_pref as enum ('after_match', 'always', 'never');
create type device_platform as enum ('ios', 'android');
create type item_kind as enum ('lost', 'found');
create type item_status as enum ('active', 'resolved', 'removed');
create type moderation_status as enum ('pending', 'approved', 'removed');
create type match_status as enum ('proposed', 'confirmed', 'rejected');
create type ticket_status as enum ('bot', 'escalated', 'closed');
create type message_sender as enum ('user', 'bot', 'agent');
create type screen_slot as enum ('home', 'registry', 'forum', 'report_success');
create type notification_type as enum ('message', 'forum_reply', 'item_match', 'moderation', 'system');

-- 1. Profiles & Contacts
create table profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  username text unique not null,
  full_name text,
  avatar_url text,
  role user_role default 'member' not null,
  city text,
  notification_prefs jsonb default '{}'::jsonb,
  contact_sharing_pref contact_pref default 'after_match' not null,
  guidelines_accepted_at timestamptz,
  guidelines_version int,
  is_suspended boolean default false not null,
  created_at timestamptz default now() not null
);

create table profile_contacts (
  user_id uuid primary key references profiles(id) on delete cascade,
  phone text,
  email text,
  updated_at timestamptz default now() not null
);

create table device_tokens (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid not null references profiles(id) on delete cascade,
  token text not null,
  platform device_platform not null,
  created_at timestamptz default now() not null
);

-- 2. Registry
create table categories (
  id uuid primary key default uuid_generate_v4(),
  name text unique not null,
  icon text not null,
  sort_order int default 0 not null
);

create table items (
  id uuid primary key default uuid_generate_v4(),
  short_code text unique,
  reporter_id uuid not null references profiles(id) on delete cascade,
  kind item_kind not null,
  title text not null,
  description text not null,
  category_id uuid references categories(id) on delete set null,
  location_text text not null,
  latitude numeric(9,6),
  longitude numeric(9,6),
  date_occurred date not null,
  status item_status default 'active' not null,
  moderation_status moderation_status default 'pending' not null,
  flagged_count int default 0 not null,
  search_tsv tsvector generated always as (to_tsvector('english', title || ' ' || description || ' ' || location_text)) stored,
  created_at timestamptz default now() not null
);

create index items_search_idx on items using gin(search_tsv);

create table item_photos (
  id uuid primary key default uuid_generate_v4(),
  item_id uuid not null references items(id) on delete cascade,
  storage_path text not null,
  sort_order int default 0 not null
);

create table item_matches (
  id uuid primary key default uuid_generate_v4(),
  lost_item_id uuid not null references items(id) on delete cascade,
  found_item_id uuid not null references items(id) on delete cascade,
  proposed_by uuid references profiles(id) on delete set null,
  status match_status default 'proposed' not null,
  note text,
  confirmed_by uuid references profiles(id) on delete set null,
  confirmed_at timestamptz,
  created_at timestamptz default now() not null
);

-- 3. Messaging
create table conversations (
  id uuid primary key default uuid_generate_v4(),
  item_id uuid references items(id) on delete set null,
  last_message_at timestamptz default now() not null,
  created_at timestamptz default now() not null
);

create table conversation_participants (
  conversation_id uuid references conversations(id) on delete cascade,
  user_id uuid references profiles(id) on delete cascade,
  last_read_at timestamptz,
  primary key (conversation_id, user_id)
);

create table messages (
  id uuid primary key default uuid_generate_v4(),
  conversation_id uuid not null references conversations(id) on delete cascade,
  sender_id uuid not null references profiles(id) on delete cascade,
  body text not null,
  is_quick_reply boolean default false not null,
  is_removed boolean default false not null,
  created_at timestamptz default now() not null
);

create table contact_reveals (
  id uuid primary key default uuid_generate_v4(),
  conversation_id uuid not null references conversations(id) on delete cascade,
  from_user_id uuid not null references profiles(id) on delete cascade,
  to_user_id uuid not null references profiles(id) on delete cascade,
  revealed_at timestamptz default now() not null
);

-- 4. Community Forum
create table forum_threads (
  id uuid primary key default uuid_generate_v4(),
  author_id uuid not null references profiles(id) on delete cascade,
  topic text not null,
  title text not null,
  body text not null,
  helpful_count int default 0 not null,
  is_suspended boolean default false not null,
  is_removed boolean default false not null,
  created_at timestamptz default now() not null
);

create table forum_replies (
  id uuid primary key default uuid_generate_v4(),
  thread_id uuid not null references forum_threads(id) on delete cascade,
  author_id uuid not null references profiles(id) on delete cascade,
  body text not null,
  is_removed boolean default false not null,
  created_at timestamptz default now() not null
);

create table forum_helpful_votes (
  thread_id uuid not null references forum_threads(id) on delete cascade,
  user_id uuid not null references profiles(id) on delete cascade,
  primary key (thread_id, user_id)
);

-- 5. Moderation & Audit
create table moderation_flags (
  id uuid primary key default uuid_generate_v4(),
  item_id uuid references items(id) on delete cascade,
  thread_id uuid references forum_threads(id) on delete cascade,
  reply_id uuid references forum_replies(id) on delete cascade,
  profile_id uuid references profiles(id) on delete cascade,
  target_type text generated always as (
    case 
      when item_id is not null then 'item'
      when thread_id is not null then 'thread'
      when reply_id is not null then 'reply'
      when profile_id is not null then 'profile'
      else 'unknown'
    end
  ) stored,
  reason text not null,
  flagged_by uuid references profiles(id) on delete set null,
  status moderation_status default 'pending' not null,
  reviewed_by uuid references profiles(id) on delete set null,
  reviewed_at timestamptz,
  created_at timestamptz default now() not null,
  constraint check_single_target check (
    (item_id is not null)::int +
    (thread_id is not null)::int +
    (reply_id is not null)::int +
    (profile_id is not null)::int = 1
  )
);

create table admin_audit_log (
  id uuid primary key default uuid_generate_v4(),
  admin_id uuid not null references profiles(id) on delete cascade,
  action_type text not null,
  target_type text not null,
  target_id uuid not null,
  notes text,
  created_at timestamptz default now() not null
);

-- 6. Support & FAQ
create table support_tickets (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid not null references profiles(id) on delete cascade,
  status ticket_status default 'bot' not null,
  created_at timestamptz default now() not null
);

create table support_messages (
  id uuid primary key default uuid_generate_v4(),
  ticket_id uuid not null references support_tickets(id) on delete cascade,
  sender message_sender not null,
  body text not null,
  created_at timestamptz default now() not null
);

create table faqs (
  id uuid primary key default uuid_generate_v4(),
  question text not null,
  answer text not null,
  sort_order int default 0 not null
);

-- 7. Ads / Sponsorship
create table ad_campaigns (
  id uuid primary key default uuid_generate_v4(),
  short_code text unique not null,
  advertiser_name text not null,
  campaign_name text not null,
  screen_slot screen_slot not null,
  format text not null,
  start_date date not null,
  end_date date not null,
  is_live boolean default true not null
);

create table ad_stats (
  id uuid primary key default uuid_generate_v4(),
  campaign_id uuid not null references ad_campaigns(id) on delete cascade,
  date date not null,
  impressions int default 0 not null,
  clicks int default 0 not null,
  revenue numeric(10,2) default 0.00 not null,
  unique (campaign_id, date)
);

-- 8. Notifications
create table notifications (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid not null references profiles(id) on delete cascade,
  type notification_type not null,
  title text not null,
  body text not null,
  is_read boolean default false not null,
  created_at timestamptz default now() not null
);