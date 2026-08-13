# Inue Kang

my personal website

## Editing content

All site content lives in [`my-site/src/lib/content/`](my-site/src/lib/content/) —
you never need to touch page code to change what the site says:

| File          | Controls                                          |
| ------------- | ------------------------------------------------- |
| `projects.js` | The orbs on /projects and each project's own page |
| `awards.js`   | The year orbs + award nodes on /awards            |
| `posts.js`    | The cards on /posts                               |
| `about.js`    | All text on /about                                |

See [`my-site/src/lib/content/README.md`](my-site/src/lib/content/README.md)
for a field-by-field guide.

## Developing

```bash
cd my-site
npm install
npm run dev
```

- `npm run build` — production build
- `npm test` — sanity-checks the content files
- `npm run check` — type checking
- `npm run lint` — linting
