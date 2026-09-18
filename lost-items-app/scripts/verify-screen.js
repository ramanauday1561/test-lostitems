// Phase 5 "Component Mapping": assert each UI element the prototype's screen has
// is present in the generated React Native source.
// Usage: node scripts/verify-screen.js <screen-label> <source-file> [more-sources...]
const fs = require('fs');
const path = require('path');

const [label, ...sources] = process.argv.slice(2);
const src = sources.map((f) => fs.readFileSync(path.join(__dirname, '..', f), 'utf8')).join('\n');

// element name -> a probe that must be found in the generated source
const SPECS = {
  registry: [
    ['Lost/Found segmented control', /kind === k|setKind/],
    ['Segment track #E7E7E3 (bg-track)', /bg-track/],
    ['Active segment shadow', /SHADOW_SEG_ON/],
    ['Search bar, 52px, radius 26', /min-h-\[52px\][\s\S]{0,80}rounded-panel/],
    ['Search placeholder copy', /Search title, place or ID/],
    ['Search leading glyph 21px', /name="search" size=\{21\}/],
    ['Filter chips row, horizontal scroll', /horizontal/],
    ['5 filters incl. "My posts"', /'All', 'My posts', 'Active', 'Reunited', 'Resolved'/],
    ['Chip 44px hit target', /min-h-\[44px\][\s\S]{0,120}rounded-full/],
    ['Chip on/off shadows', /SHADOW_PILL_ON[\s\S]{0,40}SHADOW_PILL_OFF/],
    ['Item card 60px gradient well', /h-\[60px\] w-\[60px\]/],
    ['Well gradient #F4F4F2 -> #E9E9E5', /'#F4F4F2', '#E9E9E5'/],
    ['Well glyph 26px #b7bbc1', /size=\{26\} color="#b7bbc1"/],
    ['Card title 700 15px, truncated', /numberOfLines=\{1\}[\s\S]{0,90}text-\[15px\]/],
    ['location_on row 14px', /name="location_on" size=\{14\}/],
    ['Mono ID · date line', /\{item\.short_code\} · \{formatDate\(item\.date_occurred\)\}/],
    ['Status chip, 10% tint', /\$\{hue\}1A/],
    ['Card raised shadow', /SHADOW\.raised/],
    ['Card press scale .985', /active:scale-\[\.985\]/],
    ['Empty: "My posts" card', /You&apos;t?|You&apos;ve|haven&apos;t posted anything/],
    ['Empty: post_add glyph in blue tint', /name="post_add"[\s\S]{0,40}#0B6BCB/],
    ['Empty: "Report an item" CTA', /Report an item/],
    ['Empty: no-match copy', /No records match that search\./],
    ['Search matches title + location + id', /\$\{i\.title\} \$\{i\.location_text\} \$\{i\.short_code\}/],
    ['Status label derived, not stored (SCHEMA.sql)', /displayStatus/],
  ],
  detail: [
    ['196px hero image well', /h-\[196px\]/],
    ['Well gradient #F4F4F2 -> #E9E9E5', /'#F4F4F2', '#E9E9E5'/],
    ['Hero glyph 52px #b7bbc1', /size=\{52\} color="#b7bbc1"/],
    ['"photo submitted with the record" caption', /photo submitted with the record/],
    ['Mono short_code line', /\{item\.short_code\}/],
    ['Status chip, 10% tint', /\$\{hue\}1A/],
    ['Title 800 25px, tight tracking', /font-sans-xb text-\[25px\][\s\S]{0,40}tracking-\[-0\.8px\]/],
    ['Description 400 14.5px/1.65', /text-\[14\.5px\] leading-\[24px\]/],
    ['Detail rows card on subtle bg', /bg-subtle/],
    ['4 rows: Status/Where/When/Submitted by', /'Status'[\s\S]{0,200}'Submitted by'/],
    ['Row min-height 48px', /min-h-\[48px\]/],
    ['Owner block, blue 7% tint', /bg-primary\/\[0\.07\]/],
    ['Owner how_to_reg glyph', /name="how_to_reg"/],
    ['Owner hint copy, both states', /Handed over\.[\s\S]{0,200}stops searching/],
    ['Claim CTA label by kind', /This is mine[\s\S]{0,60}I have found this/],
    ['Claim CTA uses primary button shadow', /SHADOW\.primaryButton/],
    ['Back control 44px, bare', /h-11 w-11[\s\S]{0,80}active:scale-\[\.92\]/],
    ['Not-found fallback for bad id', /Record not found/],
  ],
};

const spec = SPECS[label];
if (!spec) throw new Error(`no spec for "${label}"`);

let fail = 0;
console.log(`  Component mapping — ${label}`);
for (const [name, probe] of spec) {
  const ok = probe.test(src);
  if (!ok) fail++;
  console.log(`  [${ok ? 'x' : ' '}] ${name}${ok ? '' : '  <-- MISSING'}`);
}
console.log(`  ${spec.length - fail}/${spec.length} elements present`);
process.exit(fail ? 1 : 0);
