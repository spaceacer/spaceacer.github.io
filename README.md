# spaceacer.github.io

A personal notebook: projects, art, writing, research and ventures, kept in one place and dated as they grow.

Built with [Astro](https://astro.build), searched with [Pagefind](https://pagefind.app), published to GitHub Pages by a GitHub Actions workflow on every push to `main`.

## Add something

Every piece of work is one **entry**: a folder in `src/content/entries/` with an `index.md` inside, plus any images or files it uses.

```
src/content/entries/my-new-thing/
  index.md
  photo.jpg
```

The top of `index.md` holds a few fields:

```yaml
---
title: Hot-fire test of a 3D-printed nozzle
summary: One sentence that appears in lists and search results.
kind: project            # what it is (see the list below)
topics: [aerospace, additive-manufacturing]   # what it's about: any words
status: growing          # seedling | growing | evergreen | archived
visibility: public       # public | preview | classified
started: 2026-09-02      # optional
published: 2026-11-18
updated: 2026-11-20      # optional
cover: ./photo.jpg       # optional
coverAlt: Nozzle on the test stand
model: /models/nozzle.stl   # optional 3D viewer (file goes in public/models/)
links:
  - { label: Source on GitHub, url: "https://github.com/..." }
---

Write the entry here in Markdown.
```

Commit and push to `main`; the site rebuilds and publishes in a few minutes. The folder name becomes the address: `/work/my-new-thing/`. Don't rename a folder once it's published, or old links break.

### Kinds

`project`, `software`, `writing`, `note`, `artwork`, `research`, `log`, `venture`, `link`. To add a new kind, add one line to `src/data/site.ts`. Topics need no setup: a new topic word creates its own page.

### Visibility

This repository is public, so everything in it can be read by anyone.

- **public**: the whole entry is published.
- **preview** (sneak peek): only the title, summary, topics and cover appear. Leave the body empty; the build stops if it isn't.
- **classified**: only a "Classified" card with the date appears. Give it just `kind`, `visibility` and `published`; the build stops if it has a title, summary, cover or links.

Keep the real details of private work somewhere else, such as a private repository.

### Interactive pieces

- **3D models**: put an `.stl` file in `public/models/` and set `model:` on the entry. Large models load faster converted to compressed GLB.
- **Inside the text**: name the file `index.mdx` instead of `index.md` and place `<StlViewer src="/models/part.stl" />` anywhere in it. Other interactive components work the same way.
- **Downloads**: attach large files to a GitHub Release and link to them, so they don't count toward the 1 GB site limit.

### Pages

`src/content/pages/about.md` and `now.md` are hand-written pages. Any new `.md` file there becomes a page at `/<filename>/`. Site name, menu and profile links are in `src/data/site.ts`.

### Drafts

Add `draft: true` to keep an entry off the published site while you work on it.

## Run it locally

```sh
npm install
npm run dev       # live preview at http://localhost:4321
npm run build     # full build, including search
npm run preview   # serve the full build
```

## Look and feel

All colours, fonts and sizes are tokens at the top of `src/styles/global.css`. Light and dark themes are both defined there.
