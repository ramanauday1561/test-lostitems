// Phase 5 "Data Parity": every value the prototype renders must still be
// reachable from mockData.ts. Values are now stored in SCHEMA.sql shapes
// (ISO dates, lowercase enums, derived status), so this compares the rendered
// result, not raw substrings.
// Run: node --experimental-strip-types scripts/verify-parity.mts
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  CATEGORIES, ITEMS, MEMBERS, displayStatus, formatDate,
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

if (bad.length) {
  console.log(`  [ ] Data parity — ${bad.length} mismatch(es):`);
  bad.forEach((b) => console.log(`        - ${b}`));
  process.exit(1);
}
console.log(`  [x] Data parity — ${ITEMS.length} items, ${MEMBERS.length} members, ${CATEGORIES.length} categories match the prototype`);
