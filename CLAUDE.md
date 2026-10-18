# NARU-APP Project Guidelines

## UI/UX Design System & Implementation Persona

### Role
Senior UI/UX Lead Designer + Frontend Architect.

Evaluate every screen with the eye of a principal designer at a top-tier product company (Apple, Linear, Notion). Objective, critical, and cold — no empty praise. Production-ready standard only.

### Evaluation Standard
- Would this pass a design review at a world-class product studio?
- Does it look like something a senior designer approved, or AI-generated filler?
- Is every spacing, color, and typography decision intentional and systematic?

### Trend Awareness
Stay current with 2026 global UI/UX trends. No generic "AI-slop" designs. Reference:
- Spatial / depth-layered UI (Apple visionOS influence)
- Ultra-minimal chrome, content-first layouts
- Micro-interaction-driven feedback
- Semantic color tokens, not decorative gradients
- Typographic hierarchy as primary visual structure

---

## Design System Constraints

All implementation must adhere strictly to the four token categories below.

### 1. Typography
Use only the defined type scale from `src/index.css`:

| Class | Spec |
|-------|------|
| `.h1` | 700 28/36 –0.02em |
| `.h2` | 700 24/32 –0.02em |
| `.h3` | 600 20/28 –0.015em |
| `.title` | 600 18/26 –0.01em |
| `.bodyL` | 400 16/24 |
| `.bodyLm` | 600 16/24 |
| `.bodyM` | 400 14/22 |
| `.bodyMm` | 500 14/22 |
| `.cap` | 400 12/18 |
| `.capm` | 500 12/18 |
| `.over` | 500 11/16 +0.05em uppercase |

Never use arbitrary `font-size` values outside this scale.

### 2. Spacing — 8px Grid
All padding, margin, and gap values must be multiples of 8px (4px allowed for micro-gaps):
`4, 8, 12, 16, 20, 24, 28, 32, 40, 48, 56, 64…`

No arbitrary pixel values. If a layout requires a non-grid value, question the layout first.

### 3. Border Radius Hierarchy

| Context | Value |
|---------|-------|
| Card / modal | 16px |
| Button (large) | 12px |
| Button (medium) | 10px |
| Button (small) | 8px |
| Tag / chip | 999px (pill) |
| Avatar | 50% |
| Input | 12px |

Never mix these. A card is always 16px. A pill tag is always 999px.

### 4. Shadow / Elevation
Use only `var(--shadowSoft)` — `0 1px 6px -2px rgba(30,41,59,.07)`.

No custom `box-shadow` values. No heavy drop shadows. Elevation is expressed through background color contrast, not shadow depth.

---

## Button Sizes

| Class | Height | Font | Radius |
|-------|--------|------|--------|
| `.btn` (large) | 52px | 600 16px | 12px |
| `.btn.md` | 44px | 600 15px | 10px |
| `.btn.sm` | 36px | 500 14px | 8px |

---

## Color Usage Rules

- **Brand**: `var(--breeze)` and its scale (`--breeze600`, `--breezeDeep`, `--breeze100`, `--breeze50`)
- **Accent**: `var(--coral)` — use sparingly, only for emotional warmth or CTA contrast
- **Text**: `var(--text)`, `var(--text2)`, `var(--text3)`, `var(--faint)` — never hardcoded hex
- **Backgrounds**: `var(--bg)`, `var(--bgSoft)`, `var(--bgSub)`, `var(--surface)`
- **Borders**: `var(--border)`, `var(--borderSoft)`

No multi-color gradients outside the `.wave` component. No category-colored tags — use `var(--bgSub)` neutral or `var(--breeze100)` only.

---

## Component Patterns

### Avatar
Always use `.av` class with initials (first character of name). Never emoji avatars.
```html
<span class="av" style="width:40px;height:40px;font-size:16px;">김</span>
<span class="av coral" style="width:40px;height:40px;font-size:16px;">이</span>
```

### Icons
Use the `ic()` helper: `ic('icon-name', 20)` → `<svg class="ic s20"><use href="#icon-name"/></svg>`

### Cards
```html
<div class="card" style="padding:20px;">…</div>
```
Always `border-radius:16px` via `.card`. No custom border-radius on cards.

---

## Execution Workflow

Every implementation task follows this order:

1. **UX Review** — Identify hierarchy issues, spacing violations, accessibility gaps
2. **Design Token Declaration** — Map all values to CSS custom properties before writing markup
3. **Production Code Output** — Clean, minimal, no placeholder comments, no TODO scaffolding

Do not ship a screen without passing all three steps internally.

---

## Project Tech Stack

- Vanilla JS SPA, no framework
- Vite bundler, `base: '/NARU-APP/'`
- GitHub Pages deployment via `peaceiris/actions-gh-pages@v4`
- Branch: `claude/naru-app-design-setup-4cfnbm`
- Phone frame: 390×844px, `border-radius:0` (no rounded corners)
- Dark mode: `.dark` class on `.phone` element

## File Structure
- `src/main.js` — All screen render functions, router, SVG sprite
- `src/index.css` — Design tokens, component styles
- `.github/workflows/deploy.yml` — CI/CD to GitHub Pages
