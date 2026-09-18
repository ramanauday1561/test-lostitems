// Behaviour check for filterRegistry (the feed's only real logic).
// Run: node --experimental-strip-types scripts/test-registry.mts
import assert from 'node:assert';
import { FOUND_ITEMS, LOST_ITEMS, filterRegistry, type Item } from '../src/data/mockData.ts';

const ids = (rows: Item[]) => rows.map((r) => r.id);

// Kind tab switches the source list.
assert.deepStrictEqual(ids(filterRegistry('Lost', 'All', '')), ids(LOST_ITEMS));
assert.deepStrictEqual(ids(filterRegistry('Found', 'All', '')), ids(FOUND_ITEMS));

// Status filters.
assert.deepStrictEqual(ids(filterRegistry('Lost', 'Reunited', '')), ['LOST-1018']);
assert.deepStrictEqual(ids(filterRegistry('Lost', 'Active', '')), ['LOST-1029', 'LOST-1024']);
assert.deepStrictEqual(ids(filterRegistry('Found', 'Resolved', '')), ['FOUND-1998']);

// "My posts" is by author handle, not status.
assert.deepStrictEqual(ids(filterRegistry('Lost', 'My posts', '')), ['LOST-1024']);
assert.deepStrictEqual(ids(filterRegistry('Found', 'My posts', '')), []);

// Search spans title, location and id, case-insensitively, and trims.
assert.deepStrictEqual(ids(filterRegistry('Lost', 'All', 'backpack')), ['LOST-1024']);
assert.deepStrictEqual(ids(filterRegistry('Lost', 'All', 'oak street')), ['LOST-1018']);
assert.deepStrictEqual(ids(filterRegistry('Lost', 'All', '  LOST-1031  ')), ['LOST-1031']);
assert.deepStrictEqual(ids(filterRegistry('Lost', 'All', 'zzz')), []);

// Filter and search compose.
assert.deepStrictEqual(ids(filterRegistry('Lost', 'Active', 'glasses')), ['LOST-1029']);
assert.deepStrictEqual(ids(filterRegistry('Lost', 'Reunited', 'backpack')), []);

console.log('  [x] filterRegistry — 13 assertions passed');
