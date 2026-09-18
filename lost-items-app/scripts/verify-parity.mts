// Phase 5 "Data Parity": every value the prototype renders must still be
// reachable from mockData.ts. Values are now stored in SCHEMA.sql shapes
// (ISO dates, lowercase enums, derived status), so this compares the rendered
// result, not raw substrings.
// Run: node --experimental-strip-types scripts/verify-parity.mts
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  AD_CAMPAIGNS, CATEGORIES, CHAT_SEED, CONVERSATIONS, FAQS, FORUM_THREADS,
  ITEMS, MEMBERS, MODERATION_FLAGS, SCOUTS, SLIDES, SUPPORT_SEED,
  displayStatus, formatDate, initials as initialsOf,
} from '../src/data/mockData.ts';

const dir = path.dirname(fileURLToPath(import.meta.url));
const html = fs.readFileSync(
  path.join(dir, '../../prototype/Lost Items App v3 (native).dc.html'), 'utf8');

const arr = (name: string): any[] => {
  const m = html.match(new RegExp(`const ${name} = (\\[[\\s\\S]*?\\n\\];)`));
  if (!m) throw new Error(`${name} not found in prototype`);
  return eval(m[1].slice(0, -1));
};

const bad: string[] = [];
const eq = (label: string, got: unknown, want: unknown) => {
  if (got !== want) bad.push(`${label}: got ${JSON.stringify(got)}, prototype has ${JSON.stringify(want)}`);
};

for (const p of [...arr('LOST'), ...arr('FOUND')]) {
  const row = ITEMS.find((i) => i.short_code === p.id);
  if (!row) { bad.push(`${p.id}: missing from mockData`); continue; }
  eq(`${p.id}.title`, row.title, p.title);
  eq(`${p.id}.location`, row.location_text, p.location);
  eq(`${p.id}.date`, formatDate(row.date_occurred), p.date);
  eq(`${p.id}.status`, displayStatus(row), p.status);
  eq(`${p.id}.kind`, row.kind, p.kind.toLowerCase());
  eq(`${p.id}.icon`, row.icon, p.icon);
  eq(`${p.id}.by`, row.reporter_username, p.by);
  eq(`${p.id}.desc`, row.description, p.desc);
}

// profiles: ini and posts are UI/aggregate values with no column in SCHEMA.sql.
const initials = (name: string) => name.split(' ').map((w) => w[0]).join('').slice(0, 2).toUpperCase();
for (const p of arr('MEMBERS')) {
  const row = MEMBERS.find((m) => m.username === p.handle);
  if (!row) { bad.push(`member ${p.handle}: missing from mockData`); continue; }
  eq(`${p.handle}.name`, row.full_name, p.name);
  eq(`${p.handle}.suspended`, row.is_suspended, p.suspended);
  eq(`${p.handle}.ini (derived)`, initials(row.full_name ?? ''), p.ini);
  eq(`${p.handle}.joined (derived)`, formatDate(row.created_at).slice(-8), p.joined);
}

for (const c of arr('CATS')) {
  if (!CATEGORIES.some((x) => x.name === c)) bad.push(`category ${c}: missing`);
}

// Forum threads and every reply.
arr('THREADS').forEach((p: any) => {
  const t = FORUM_THREADS.find((x) => x.id === p.id);
  if (!t) { bad.push(`thread ${p.id}: missing`); return; }
  eq(`thread${p.id}.title`, t.title, p.title);
  eq(`thread${p.id}.body`, t.body, p.text);
  eq(`thread${p.id}.tag`, t.tag, p.tag.toLowerCase());
  eq(`thread${p.id}.author`, t.author_name, p.user);
  eq(`thread${p.id}.meta`, `${t.created_at} · ${t.location_text}`, p.meta);
  eq(`thread${p.id}.replyCount`, t.replies.length, p.replies.length);
  p.replies.forEach((r: any, i: number) => {
    eq(`thread${p.id}.reply${i}.body`, t.replies[i]?.body, r.text);
    eq(`thread${p.id}.reply${i}.author`, t.replies[i]?.author_name, r.user);
    eq(`thread${p.id}.reply${i}.time`, t.replies[i]?.created_at, r.time);
  });
});

// Ad campaigns: stored fields plus the two the schema derives.
arr('ADS').forEach((p: any) => {
  const a = AD_CAMPAIGNS.find((x) => x.short_code === p.id);
  if (!a) { bad.push(`ad ${p.id}: missing`); return; }
  eq(`${p.id}.campaign`, a.campaign_name, p.campaign);
  eq(`${p.id}.advertiser`, a.advertiser_name, p.advertiser);
  eq(`${p.id}.slot`, a.slot_description, p.slot);
  eq(`${p.id}.format`, a.format, p.format);
  eq(`${p.id}.size`, a.size, p.size);
  eq(`${p.id}.icon`, a.icon, p.icon);
  eq(`${p.id}.screen`, a.screen_slot, p.screen.toLowerCase().replace(' ', '_'));
  eq(`${p.id}.live`, a.is_live, p.live);
  eq(`${p.id}.days`, a.days, p.days);
  eq(`${p.id}.daysLeft`, a.days_left, p.daysLeft);
  eq(`${p.id}.revenue`, a.revenue, p.revenue);
  eq(`${p.id}.impressions`, a.impressions, p.impressions);
  eq(`${p.id}.ctr (derived)`, Math.round((a.clicks / a.impressions) * 1000) / 10, p.ctr);
});

arr('CAMPAIGNS').forEach((p: any) => {
  if (!AD_CAMPAIGNS.some((a) => a.campaign_name === p.campaign && a.cpm === p.cpm)) {
    bad.push(`campaign ${p.key}: missing or cpm mismatch`);
  }
});

// Moderation queue.
arr('FLAGGED').forEach((p: any) => {
  const f = MODERATION_FLAGS.find((x) => x.target_code === p.id);
  if (!f) { bad.push(`flag ${p.id}: missing`); return; }
  eq(`${p.id}.title`, f.title, p.title);
  eq(`${p.id}.author`, f.author_username, p.author);
  eq(`${p.id}.category`, f.category, p.category);
  eq(`${p.id}.reason`, f.reason, p.reason);
  eq(`${p.id}.date`, f.created_at, p.date);
});

// Conversations and their messages.
arr('CONVOS').forEach((p: any) => {
  const c = CONVERSATIONS.find((x) => x.item_short_code === p.itemId);
  if (!c) { bad.push(`convo ${p.itemId}: missing`); return; }
  eq(`${p.itemId}.with`, c.with_username, p.with);
  eq(`${p.itemId}.item`, c.item_title, p.item);
  eq(`${p.itemId}.icon`, c.icon, p.icon);
  eq(`${p.itemId}.unread`, c.unread, p.unread);
  eq(`${p.itemId}.time`, c.last_message_at, p.time);
  p.msgs.forEach((m: any, i: number) => {
    eq(`${p.itemId}.msg${i}.body`, c.messages[i]?.body, m.text);
    eq(`${p.itemId}.msg${i}.sender`, c.messages[i]?.sender, m.from);
    eq(`${p.itemId}.msg${i}.time`, c.messages[i]?.created_at, m.time);
  });
});

arr('CHAT_SEED').forEach((m: any, i: number) => {
  eq(`chatSeed${i}.body`, CHAT_SEED[i]?.body, m.text);
  eq(`chatSeed${i}.sender`, CHAT_SEED[i]?.sender, m.from);
});

arr('FAQ').forEach((p: any, i: number) => {
  eq(`faq${i}.question`, FAQS[i]?.question, p.q);
  eq(`faq${i}.answer`, FAQS[i]?.answer, p.a);
  eq(`faq${i}.keywords`, JSON.stringify(FAQS[i]?.keywords), JSON.stringify(p.keys));
});

arr('SUPPORT_SEED').forEach((p: any, i: number) => {
  eq(`support${i}.body`, SUPPORT_SEED[i]?.body, p.text);
  eq(`support${i}.sender`, SUPPORT_SEED[i]?.sender, p.from);
});

arr('SCOUTS').forEach((p: any, i: number) => eq(`scout${i}`, SCOUTS[i], p.ini));

arr('SLIDES').forEach((p: any, i: number) => {
  eq(`slide${i}.kicker`, SLIDES[i]?.kicker, p.kicker);
  eq(`slide${i}.title`, SLIDES[i]?.title, p.title);
  eq(`slide${i}.body`, SLIDES[i]?.body, p.body);
  eq(`slide${i}.tint`, SLIDES[i]?.tint, p.tint);
});

if (bad.length) {
  console.log(`  [ ] Data parity — ${bad.length} mismatch(es):`);
  bad.forEach((b) => console.log(`        - ${b}`));
  process.exit(1);
}
console.log(
  `  [x] Data parity — ${ITEMS.length} items, ${MEMBERS.length} members, ` +
  `${CATEGORIES.length} categories, ${FORUM_THREADS.length} threads, ` +
  `${AD_CAMPAIGNS.length} campaigns, ${MODERATION_FLAGS.length} flags, ` +
  `${CONVERSATIONS.length} conversations, ${FAQS.length} FAQs, ` +
  `${SCOUTS.length} scouts, ${SLIDES.length} slides match the prototype`
);
