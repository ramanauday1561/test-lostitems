// Behaviour check for filterRegistry (the feed's only real logic).
// Run: node --experimental-strip-types scripts/test-registry.mts
import assert from 'node:assert';
import {
  FOUND_ITEMS, LOST_ITEMS, displayStatus, filterRegistry, formatDate,
  type ItemListRow,
} from '../src/data/mockData.ts';

const ids = (rows: ItemListRow[]) => rows.map((r) => r.short_code);

// Kind tab switches the source list.
assert.deepStrictEqual(ids(filterRegistry('lost', 'All', '')), ids(LOST_ITEMS));
assert.deepStrictEqual(ids(filterRegistry('found', 'All', '')), ids(FOUND_ITEMS));

// Status filters.
assert.deepStrictEqual(ids(filterRegistry('lost', 'Reunited', '')), ['LOST-1018']);
assert.deepStrictEqual(ids(filterRegistry('lost', 'Active', '')), ['LOST-1029', 'LOST-1024']);
assert.deepStrictEqual(ids(filterRegistry('found', 'Resolved', '')), ['FOUND-1998']);

// "My posts" is by author handle, not status.
assert.deepStrictEqual(ids(filterRegistry('lost', 'My posts', '')), ['LOST-1024']);
assert.deepStrictEqual(ids(filterRegistry('found', 'My posts', '')), []);

// Search spans title, location and id, case-insensitively, and trims.
assert.deepStrictEqual(ids(filterRegistry('lost', 'All', 'backpack')), ['LOST-1024']);
assert.deepStrictEqual(ids(filterRegistry('lost', 'All', 'oak street')), ['LOST-1018']);
assert.deepStrictEqual(ids(filterRegistry('lost', 'All', '  LOST-1031  ')), ['LOST-1031']);
assert.deepStrictEqual(ids(filterRegistry('lost', 'All', 'zzz')), []);

// Filter and search compose.
assert.deepStrictEqual(ids(filterRegistry('lost', 'Active', 'glasses')), ['LOST-1029']);
assert.deepStrictEqual(ids(filterRegistry('lost', 'Reunited', 'backpack')), []);

// displayStatus derives the two labels SCHEMA.sql cannot store.
assert.strictEqual(displayStatus(LOST_ITEMS[3]), 'Reunited');   // resolved + lost
assert.strictEqual(displayStatus(FOUND_ITEMS[3]), 'Resolved');  // resolved + found
assert.strictEqual(displayStatus(LOST_ITEMS[0]), 'Flagged');    // moderation pending + flagged
assert.strictEqual(displayStatus(LOST_ITEMS[1]), 'Active');

// formatDate renders SCHEMA.sql dates the way the prototype does.
assert.strictEqual(formatDate('2024-06-05'), '05 Jun 2024');
assert.strictEqual(formatDate('2024-05-31'), '31 May 2024');

console.log('  [x] filterRegistry + displayStatus + formatDate — 19 assertions passed');

// getItem backs app/item/[id].tsx — it resolves by short_code, not uuid.
import { ITEMS, getItem } from '../src/data/mockData.ts';
assert.strictEqual(getItem('LOST-1018')?.title, 'Grey tabby cat, no collar');
assert.strictEqual(getItem('FOUND-2018')?.title, 'Black Wallet');
assert.strictEqual(getItem('nope'), undefined);
// every feed row must resolve, or a card tap dead-ends
for (const row of ITEMS) assert.ok(getItem(row.short_code!), `${row.short_code} unresolvable`);
console.log(`  [x] getItem — all ${ITEMS.length} rows resolve by short_code, unknown id returns undefined`);

// Auth gate, mirroring the prototype's submit()/quick() behaviour.
import { QUICK_LOGINS, SLIDES, roleFor, signInError } from '../src/data/mockData.ts';
assert.strictEqual(signInError('', ''), 'Username and password are required.');
assert.strictEqual(signInError('user', ''), 'Username and password are required.');
assert.match(signInError('superadmin', 'wrong')!, /Invalid password for superadmin/);
assert.strictEqual(signInError('superadmin', 'Password1!'), null);
assert.strictEqual(signInError('user', 'anything'), null);
assert.strictEqual(roleFor('superadmin'), 'admin');
assert.strictEqual(roleFor('newuser'), 'new');
assert.strictEqual(roleFor('  SuperAdmin  '), 'admin'); // trimmed + case-insensitive
assert.strictEqual(roleFor('j.rivera'), 'member');
assert.strictEqual(SLIDES.length, 3);
assert.strictEqual(QUICK_LOGINS.length, 3);
console.log('  [x] auth gate — 11 assertions passed (signInError, roleFor, slide/login counts)');
