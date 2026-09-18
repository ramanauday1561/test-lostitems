# Lost Items Community — Design Instructions

Visual language for the native mobile prototype (`Lost Items App v3 (native).dc.html`).
This file is descriptive: it records what the design already does. Follow it when adding
screens so new work is indistinguishable from existing work.

---

## 1. Core premise

A civic utility, not a marketplace. Calm warm-grey canvas, white cards floating on it,
one institutional blue for action. **Elevation instead of borders.** Nothing in the UI is
drawn with a 1px outline except hairline dividers; separation comes from shadow and the
white-on-warm-grey value step.

Mobile-first: a 390 × 844 device, 46px bezel radius, custom status bar and bottom nav.
Bottom sheets instead of pages for secondary flows. 8px spacing grid throughout.

---

## 2. Color

### Neutrals
| Role | Value | Use |
|---|---|---|
| Canvas | `#F2F2F0` | every screen background, inside the bezel |
| Surface | `#fff` | cards, inputs, sheets, floating buttons |
| Surface tint (image wells) | `linear-gradient(150deg,#F4F4F2,#E9E9E5)` | item thumbnails with no photo |
| Ink | `#16181F` | headings, primary body, input text |
| Ink muted | `#6B7280` | supporting paragraphs, secondary rows |
| Ink soft | `#8b8f95` | metadata, labels, "Skip" |
| Ink faint | `#9a9ea4` | input icons, placeholders |
| Ink faintest | `#a8acb2` / `#b7bbc1` / `#c6c9ce` | mono ID lines, empty-well glyphs, chevrons |
| Divider | `#DEDDD8` (in-app) / `#d8d6d1` (desk rail) | 1px hairlines only |
| Inverse panel | `#101319` | dark hero/announcement blocks |

### Accents
| Role | Value | Tint (backgrounds) |
|---|---|---|
| Primary (blue) | `#0B6BCB` | `rgba(11,107,203,.07)` wash · `.1` icon chip |
| Success | `#0F7B3D` | `rgba(15,123,61,.12)` |
| Warning | `#C98A00` | — |
| Danger | `#B42318` | `rgba(180,35,24,.08)` |
| Accent on dark | `#00E39B` | `rgba(0,227,155,.14)` |

Rules:
- One accent per screen. Blue is the only action color; green/amber/red are **state only**
  (password strength, success, validation), never decoration.
- Tints are always the accent at low alpha over canvas or white — never a new hex.
- Max two background values per screen (`#F2F2F0` + `#fff`, or one dark panel).
- Text on accent is `#fff` at full opacity; text in a tint block is the accent at full
  opacity (e.g. `#0B6BCB` on `rgba(11,107,203,.07)`), never alpha-muted ink.

---

## 3. Typography

Two families, loaded once in `<helmet>`:

- **Public Sans** — 400/500/600/700/800. All UI copy.
- **IBM Plex Mono** — 600. Kickers, IDs, counters, timestamps only.
- **Material Symbols Rounded** — all iconography. No hand-drawn SVG icons.

### Scale (as used)
| Token | Spec | Use |
|---|---|---|
| Display | `800 32–34px/1.08–1.1`, `-.035em` | auth screen H1 (`Reset your password`) |
| Screen title | `800 26px/1.12`, `-.03em` | app header title |
| Onboarding H1 | `800 30px/1.14`, `-.035em` | welcome slides |
| Section H2 | `800 18px`, `-.025em` | in-page section headings |
| Card title | `700 15px/1.25`, `-.015em` | item and shortcut titles |
| Stat number | `800 24px`, `-.04em` | dashboard counters |
| Body | `400 15px/1.6` | intro paragraphs |
| Body small | `400 13px/1.55–1.6` | card bodies, helper text |
| Input | `500 15.5px` | all field values and placeholders |
| Button | `700 15.5px` primary · `700 13.5px` compact | CTAs |
| Link/inline action | `600–700 13–13.5px` accent | "Forgot password?", "Back to sign in" |
| Caption | `500 11.5–12.5px/1.5` | validation, meta rows |
| **Kicker (mono)** | `600 10px`, `letter-spacing:.14–.16em`, uppercase | eyebrow above every title |
| ID line (mono) | `500 10px`, `.04em` | `ITEM-1042 · 12 Mar` |
| Code input (mono) | `600 17px`, `letter-spacing:.32em` | OTP field |

Headlines are tight (negative tracking, 1.1 leading). Body is generous (1.6). Mono is
always small, uppercase, wide-tracked — it never carries a sentence.
Use `text-wrap: pretty` on every multi-line heading and paragraph.

---

## 4. Shape & elevation

### Radii
| Element | Radius |
|---|---|
| Device bezel | 46px |
| Large card / sheet / panel | 26–28px |
| Hero image well | 36px |
| Medium card | 22–24px |
| Input, list row, small card | 18px |
| Primary button, social tile | 20px (16px when compact/inside a dark panel) |
| Icon chip | 12–16px |
| Circular control / avatar | 50% |
| Pill / badge | 999px |

### Shadow ladder (never invent a new one)
```
resting card   0 1px 2px rgba(22,24,31,.05), 0 10px 24px -20px rgba(22,24,31,.4)
raised card    0 1px 2px rgba(22,24,31,.05), 0 12px 28px -22px rgba(22,24,31,.4)
prominent      0 1px 2px rgba(22,24,31,.05), 0 16px 34px -24px rgba(22,24,31,.45)
floating round 0 1px 2px rgba(22,24,31,.06), 0 6px 16px -8px rgba(22,24,31,.24)
hero image     0 24px 50px -28px rgba(22,24,31,.5)
primary button 0 14px 30px -12px rgba(11,107,203,.45)   (accent-tinted)
dark panel     0 20px 40px -24px rgba(16,19,25,.8)
device         0 40px 80px -20px rgba(22,24,31,.35), 0 0 0 1px rgba(22,24,31,.1)
```
Shadows are wide, soft, and heavily negative-spread — the surface lifts, it doesn't drop a
hard shade. Colored shadow is reserved for the blue primary button.

---

## 5. Spacing & layout

- 8px grid. Common steps: 4, 8, 12, 16, 20, 24, 26, 32, 40, 56.
- Screen gutters: 24px on auth/onboarding, 20px on app screens.
- Section rhythm inside scroll views: `display:flex; flex-direction:column; gap:20–24px`.
- Card padding 16px; card-of-rows padding 8px with 12px per row (so rows can tint edge to
  edge inside the radius).
- Stacked input group: 8px between fields, 26px from the paragraph above, 16px to the CTA.
- **Always flex/grid + `gap`.** Never inline siblings spaced by whitespace or per-element
  margins for button rows, chips, stat rows, or nav.
- Horizontal card rails: `overflow-x:auto; scroll-snap-type:x mandatory;` negative margin
  equal to the gutter, padding restoring it, `scroll-snap-align:center` on children.
- Auth screens push the form down with `margin-top:auto` so the CTA sits near the thumb.

---

## 6. Components

**Input row** — white, 18px radius, 16px padding, `min-height:56px`, resting shadow;
`display:flex; align-items:center; gap:12px`; leading Material glyph 21px `#9a9ea4`;
borderless transparent `<input>` at `500 15.5px`. Trailing status glyph (20px, green
`check_circle` / red `cancel`) only where a live check exists (confirm-password match).

**Primary button** — full width, `min-height:56px`, radius 20px, `#0B6BCB`, `#fff`,
`700 15.5px`, blue shadow; `style-active="transform:scale(.98)"`. Disabled = muted fill,
no shadow, same footprint (computed in logic, never a second visual language).

**Secondary / ghost** — white surface with resting shadow, ink label; or transparent with
accent label for inline links. On the dark panel: `rgba(255,255,255,.1)` fill, white label.

**Icon button** — 44 × 44, circle. Bare (ink glyph, active `scale(.92)` + faint grey wash)
in headers; white with floating shadow when it sits over content.

**Segment / step indicator** — 3–4 bars, `flex:1; height:4px; radius:999px`,
`#0B6BCB` filled vs `#DEDDD8` empty, `transition:background .2s ease`. The same primitive
serves onboarding progress and password strength (strength recolors to its state hue).

**Inline validation** — 16px radius block, `rgba(180,35,24,.08)`, 14/16px padding, 19px
`error` glyph + `500 12.5px/1.5` text, both `#B42318`. Informational variant uses the blue
tint and a relevant glyph (`mark_email_read`). Errors clear on the next keystroke.

**Success state** — centered white card, 26px radius, prominent shadow, 60px circular
green tint badge with 32px `task_alt`, `800 18px` title, `400 13px/1.55` muted body.

**Kicker + title + body** — the standard screen opener, in that order, always. Mono kicker
(accent on auth/onboarding, `#9a9ea4` in app headers), display H1, muted 15px paragraph.

**Item card** — white, 26px radius, 8px padding; 20px-radius image well on top with a
centered 40–44px glyph fallback; floating status pill over the well; then title, 11.5px
location row with `location_on`, mono ID · date line.

**Hit targets** — nothing tappable below 44px. Checkboxes and small links get a 44px box
pulled back with negative margin so the visual mark stays small.

---

## 7. Motion

Restrained and press-driven only. `style-active` on every tappable: `scale(.98)` for wide
buttons, `scale(.92)` + wash for circular ones, `opacity:.6–.7` for text links. State color
changes use `transition:background .2s ease`. No entrance animations, parallax, or
autoplaying motion.

---

## 8. Copy

Plain, second person, matter-of-fact. Sentence case everywhere except mono kickers
(uppercase). One idea per line. Errors say what to do: "Passwords don't match. Check both
fields." No exclamation marks, no emoji, no marketing adjectives, no metadiscourse.
Step labels are literal: "Step 2 of 3". Brand is always written **Lost Items Community**.

---

## 9. Anti-patterns — do not

- Gradient backgrounds (the only gradient permitted is the neutral image-well fill).
- Borders where a shadow belongs; `1px solid` anything except hairline dividers.
- New hex values. Every color comes from §2; variation comes from alpha over canvas.
- A fourth accent, or accent used decoratively rather than as state.
- Emoji, or hand-drawn SVG icons instead of Material Symbols Rounded.
- Inter / Roboto / Arial; more than the two declared families.
- Rounded container with a left-border accent stripe.
- Ink at reduced opacity for body text (alpha the background, never the type).
- Shadows outside the §6 ladder; tight, dark, or offset-down shadows.
- Fake data density — extra counters, badges, or stat tiles that nothing reads.
- Full-page routes for secondary flows; use a bottom sheet.
- CSS classes or stylesheets — this design is inline-styled by construction; animated or
  computed values live in `renderVals()` and arrive as style objects.

---

## 10. Adding a screen: checklist

1. Canvas `#F2F2F0`, gutter 20–24px, `flex column`.
2. Back control (44px, bare) if it is not a root tab.
3. Mono kicker → `800 32px` title → `400 15px/1.6` body.
4. Content in white cards from §6, resting or raised shadow, radii from §4.
5. One blue CTA at the bottom, disabled until valid, error block above it.
6. Register the screen in the header/nav visibility lists and the `startAt` prop so it is
   reachable in the prototype.

Use the claude_design MCP (https://api.anthropic.com/v1/design/mcp, auth via /design-login) to import this project:
https://claude.ai/design/p/dc5d125e-08d8-499a-b53a-7d047ebe5c06?file=Lost+Items+App+v3+%28native%29.dc.html

Focus on these files (the whole project is readable):
- `Lost Items App v3 (native).dc.html`

Also read these files the selection imports:
- `public/images/HomePage1.webp`
- `public/images/illustration-exchange-item.webp`
- `public/images/illustration-treasure-chest.webp`
- `public/images/logo.png`
- `support.js`

