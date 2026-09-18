// Phase 5, rendered form: boot the built site in Chromium and measure real
// geometry. Source greps cannot see a class Tailwind never generated, or a
// className a third-party component silently drops — both shipped broken once.
// Run: node scripts/verify-render.cjs   (expects `expo export -p web` first)
const http = require('http');
const fs = require('fs');
const p = require('path');

const ROOT = p.join(__dirname, '../dist');
const CHROME = ['/opt/pw-browsers/chromium-1194/chrome-linux/chrome', '/opt/pw-browsers/chromium/chrome-linux/chrome']
  .find((c) => fs.existsSync(c));

let chromium;
try { ({ chromium } = require('playwright-core')); } catch { /* handled below */ }
if (!chromium || !CHROME) {
  console.log('  [-] Render check skipped (no playwright-core or chromium)');
  process.exit(0);
}

// Expected geometry, read off the prototype markup.
const EXPECT = [
  ['Item card height = 12px padding + 60px well', (m) => m.card.h === 84],
  ['Item card padding 12px', (m) => m.padding === '12px'],
  ['Item card gap 14px', (m) => m.gap === '14px'],
  ['Item card radius 24px', (m) => m.borderRadius === '24px'],
  ['Image well 60x60 (not collapsed)', (m) => m.well && m.well.w === 60 && m.well.h === 60],
  ['Card shadow applied', (m) => m.boxShadow && m.boxShadow !== 'none'],
  ['No zero-sized visible boxes', (m) => m.collapsed === 0],
  ['No runtime page errors across the flow', (m) => m.pageErrors.length === 0],
  ['Bottom nav pill rendered', (m) => m.nav && m.nav.h >= 56],
  ['Report FAB 52x52', (m) => m.fab && m.fab.w === 52 && m.fab.h === 52],
];

const server = http.createServer((req, res) => {
  let f = p.join(ROOT, decodeURIComponent(req.url.split('?')[0]));
  if (!fs.existsSync(f) || fs.statSync(f).isDirectory()) f = p.join(ROOT, 'index.html');
  const t = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css',
    '.ttf': 'font/ttf', '.png': 'image/png', '.ico': 'image/x-icon' }[p.extname(f)] || 'application/octet-stream';
  res.writeHead(200, { 'Content-Type': t });
  fs.createReadStream(f).pipe(res);
});

(async () => {
  await new Promise((r) => server.listen(0, r));
  const url = `http://127.0.0.1:${server.address().port}/`;
  const b = await chromium.launch({ executablePath: CHROME, args: ['--no-sandbox'] });
  const page = await b.newPage({ viewport: { width: 660, height: 1400 } });
  const pageErrors = [];
  page.on('pageerror', (e) => pageErrors.push(String(e).slice(0, 160)));
  await page.goto(url, { waitUntil: 'networkidle', timeout: 60000 });
  await page.waitForTimeout(2000);

  // The app now opens on onboarding; sign in so the registry is reachable.
  const skip = page.getByText('Skip', { exact: true }).first();
  if (await skip.count()) { await skip.click(); await page.waitForTimeout(1200); }
  const quick = page.getByText('Simple User', { exact: true }).first();
  if (await quick.count()) { await quick.click(); await page.waitForTimeout(2000); }
  // The registry moved off / to the Lost tab when the dashboard became home.
  const lost = page.getByText('Lost', { exact: true }).first();
  if (await lost.count()) { await lost.click(); await page.waitForTimeout(1500); }

  const m = await page.evaluate(() => {
    const t = [...document.querySelectorAll('*')]
      .find((e) => !e.children.length && e.textContent === 'Samsung Galaxy S24');
    let el = t, card = null;
    while (el) {
      const cs = getComputedStyle(el);
      if (cs.backgroundColor === 'rgb(255, 255, 255)' && el.getBoundingClientRect().width > 200) { card = el; break; }
      el = el.parentElement;
    }
    if (!card) return { error: 'item card not found in DOM' };
    const cs = getComputedStyle(card);
    const r = card.getBoundingClientRect();
    const g = card.querySelector('[style*="gradient"], canvas, svg');
    const gr = g && g.getBoundingClientRect();
    // any element that has a background/border but renders at zero size
    const collapsed = [...document.querySelectorAll('*')].filter((e) => {
      const b = e.getBoundingClientRect();
      const s = getComputedStyle(e);
      return e.children.length && (b.width === 0 || b.height === 0) &&
        s.backgroundColor !== 'rgba(0, 0, 0, 0)' && s.display !== 'none';
    }).length;
    // Bottom nav pill + FAB
    const fabEl = [...document.querySelectorAll('*')].find((e) => {
      const b = e.getBoundingClientRect();
      return Math.round(b.width) === 52 && Math.round(b.height) === 52 &&
        getComputedStyle(e).backgroundColor === 'rgb(11, 107, 203)';
    });
    const navEl = fabEl && fabEl.parentElement;
    const box = (el) => el ? { w: Math.round(el.getBoundingClientRect().width), h: Math.round(el.getBoundingClientRect().height) } : null;

    return {
      nav: box(navEl),
      fab: box(fabEl),
      card: { w: Math.round(r.width), h: Math.round(r.height) },
      padding: cs.padding, gap: cs.gap, borderRadius: cs.borderRadius,
      boxShadow: cs.boxShadow,
      well: gr ? { w: Math.round(gr.width), h: Math.round(gr.height) } : null,
      collapsed,
    };
  });

  m.pageErrors = pageErrors;
  await b.close();
  server.close();

  if (m.error) { console.log(`  [ ] ${m.error}`); process.exit(1); }
  let fail = 0;
  for (const [name, fn] of EXPECT) {
    const ok = fn(m);
    if (!ok) fail++;
    console.log(`  [${ok ? 'x' : ' '}] ${name}${ok ? '' : `  <-- got ${JSON.stringify(m)}`}`);
  }
  console.log(`  ${EXPECT.length - fail}/${EXPECT.length} rendered-geometry checks passed`);
  process.exit(fail ? 1 : 0);
})();
