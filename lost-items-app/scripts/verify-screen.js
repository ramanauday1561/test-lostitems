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
  welcome: [
    ['Logo + wordmark header', /source=\{LOGO\}[\s\S]{0,300}Lost Items Community/],
    ['Skip control, 44px', /min-h-\[44px\][\s\S]{0,120}Skip/],
    ['Square image well, 36px radius', /aspect-square[\s\S]{0,60}rounded-well/],
    ['Hero shadow from the sec.4 ladder', /SHADOW\.hero/],
    ['Per-slide tint background', /backgroundColor: slide\.tint/],
    ['3 progress bars, 4px, filled vs divider', /h-1 flex-1 rounded-full[\s\S]{0,60}bg-primary.*bg-divider/],
    ['Mono kicker, uppercase, wide tracking', /font-mono text-\[10px\] uppercase tracking-\[1\.6px\] text-primary/],
    ['Title 800 30px/1.14', /text-\[30px\] leading-\[34px\] tracking-\[-1\.05px\]/],
    ['Body 400 15px/1.6', /text-\[15px\] leading-\[24px\] text-ink-muted/],
    ['Back button appears after slide 1', /i > 0 &&/],
    ['Primary CTA with blue shadow', /SHADOW\.primaryButton/],
    ['"Already a member? Sign in"', /Already a member\?[\s\S]{0,300}Sign in/],
  ],
  login: [
    ['Logo + wordmark', /source=\{LOGO\}[\s\S]{0,300}Lost Items Community/],
    ['"Welcome back" across two lines', /Welcome\{'\\n'\}back/],
    ['Display title 800 34px/1.08', /text-\[34px\] leading-\[36\.7px\]/],
    ['Username input, person glyph', /name="person" size=\{21\}/],
    ['Password input, lock glyph, masked', /name="lock"[\s\S]{0,400}secureTextEntry/],
    ['Input rows 56px, radius 18, resting shadow', /min-h-\[56px\][\s\S]{0,60}rounded-row[\s\S]{0,80}SHADOW\.resting/],
    ['Remember me checkbox, 44px target', /accessibilityRole="checkbox"[\s\S]{0,120}min-h-\[44px\]/],
    ['Forgot password link', /Forgot password\?/],
    ['Validation block, danger 8% tint', /bg-danger\/\[0\.08\][\s\S]{0,120}name="error"/],
    ['Errors clear on next keystroke', /setError\(null\)/],
    ['Sign in CTA with blue shadow', /SHADOW\.primaryButton/],
    ['Social divider copy', /Or continue with a social account/],
    ['3 socials: Google / Facebook / X', /SOCIALS\.map/],
    ['Quick test logins divider', /Quick test logins/],
    ['3 quick logins with tint chips + mono handle', /QUICK_LOGINS\.map[\s\S]{0,900}q\.handle/],
    ['"Join free in 30 seconds"', /Join free in 30 seconds/],
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
