// Phase 5 "Data Parity": every field value in the prototype's data arrays must appear
// in mockData.ts. Run: node scripts/verify-parity.js
const fs = require('fs');
const path = require('path');

const HTML = path.join(__dirname, '../../prototype/Lost Items App v3 (native).dc.html');
const MOCK = path.join(__dirname, '../src/data/mockData.ts');

const html = fs.readFileSync(HTML, 'utf8');
const mock = fs.readFileSync(MOCK, 'utf8');

// Pull `const NAME = [ ... ];` out of the prototype and eval it.
const arr = (name) => {
  const m = html.match(new RegExp(`const ${name} = (\\[[\\s\\S]*?\\n\\];)`));
  if (!m) throw new Error(`${name} not found in prototype`);
  return eval(m[1].slice(0, -1));
};

const missing = [];
const check = (name, rows) =>
  rows.forEach((row) =>
    Object.entries(row).forEach(([k, v]) => {
      if (typeof v !== 'string') return;
      if (!mock.includes(v)) missing.push(`${name}.${row.id ?? row.handle}.${k} = ${JSON.stringify(v)}`);
    })
  );

check('FOUND', arr('FOUND'));
check('LOST', arr('LOST'));
check('MEMBERS', arr('MEMBERS'));
arr('CATS').forEach((c) => mock.includes(`'${c}'`) || missing.push(`CATS: ${c}`));

if (missing.length) {
  console.log(`  [ ] Data parity — ${missing.length} value(s) missing from mockData.ts:`);
  missing.forEach((m) => console.log(`        - ${m}`));
  process.exit(1);
}
console.log('  [x] Data parity — every prototype value present in mockData.ts');
