# Editing site content

Everything you'd normally want to change lives in this folder — you should
never need to touch the pages in `src/routes/` for content edits.

| File          | Controls                                          |
| ------------- | ------------------------------------------------- |
| `projects.js` | The orbs on /projects and each project's own page |
| `awards.js`   | The year orbs + award nodes on /awards            |
| `posts.js`    | The sticky notes on /posts and each post's page   |
| `about.js`    | All text on /about                                |
| `site.js`     | Global settings (deployed URL for social cards)   |

After editing, the site picks the change up automatically (`npm run dev`
hot-reloads; for production just rebuild).

## Projects (`projects.js`)

Add/remove/reorder entries in the `projects` array. Each entry:

- `slug` — the URL: `/projects/<slug>`. Lowercase, no spaces, must be unique.
- `name` — display name (shown in the orb and as the page heading).
- `tag` — short line inside the orb (2–4 words).
- `blurb` — one-sentence subtitle at the top of the project page.
- `icon` — a Phosphor icon component. Pick one at https://phosphoricons.com,
  import it at the top of the file like
  `import RocketIcon from 'phosphor-svelte/lib/RocketIcon';`
  (the icon name + `Icon` suffix), and reference it here.
- `links` — the buttons on the project page: `{ label, href }`.
- `body` — array of paragraphs. Plain HTML (like `<a>`) is allowed.
- `image` / `imageCaption` — optional screenshot. Put the file in
  `src/lib/assets/`, import it at the top, reference it here. Remove both
  fields for no image.

Orb positions are laid out automatically — no coordinates to manage.

## Awards (`awards.js`)

`years` is an array of `{ year, awards }`, newest year first. Each award:

- `id` — any unique string.
- `name` — short label inside the node circle (keep words short; the font
  auto-shrinks to fit, but shorter reads better).
- `place` — placement line inside the node ("1st", "19th", ...).
- `date`, `title`, `meta` — shown in the popup.
- `members` — optional "Group Members" line.
- `link` — `{ label, href }`, or `null` to show "Currently Unavailable".
- `objective`, `theme` — popup overview lines (`theme` optional).
- `project` — optional `{ label, href }` "Our Project" line.

Adding a new year: add a new `{ year: '2026', awards: [...] }` object at the
top of the array. Orb positions are automatic.

## Posts (`posts.js`)

Each entry becomes a sticky note on /posts; clicking it opens the full
post at `/posts/<slug>`. Add entries newest first — there's a commented
example in the file. An empty array shows "No posts currently."

- `slug` — the URL: `/posts/<slug>`. Lowercase, no spaces, must be unique.
- `title`, `date` — shown on the note and at the top of the post page.
- `color` — optional sticky-note paper color (default is the classic
  yellow `#fdf2b3`).
- `body` — array of paragraphs. Plain HTML (like `<a>`) is allowed. The
  first paragraph doubles as the note's preview text.

## About (`about.js`)

- `whoAmI` — array of paragraphs.
- `skills` — array of lines.
- `certificates` — `{ label, href }` links.
- `contact` — `{ label, text }` lines; add `href` to make one a link
  (use `mailto:...` as the href for email addresses).
