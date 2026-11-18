// Site-wide settings. Edit the placeholders in brackets.
export const site = {
  name: '[Your Name]',
  handle: 'spaceacer',
  tagline: 'I build things, draw things, and write down what I learn.',
  description:
    '[One or two sentences about you and this site. Shown on the homepage and in search results.]',
  links: [
    { label: 'GitHub', url: 'https://github.com/spaceacer' },
    { label: 'LinkedIn', url: 'https://in.linkedin.com/in/om-nunase' },
  ],
  // The menu. Keep it short and stable; topics handle everything else.
  nav: [
    { label: 'Work', href: '/work/' },
    { label: 'Writing', href: '/kinds/writing/' },
    { label: 'Topics', href: '/topics/' },
    { label: 'About', href: '/about/' },
    { label: 'Now', href: '/now/' },
  ],
};

// Kinds of entry: what a thing IS. Add a new kind here when a genuinely new
// format appears; topics (what a thing is ABOUT) need no setup at all.
export const kinds = {
  project: { label: 'Project', plural: 'Projects' },
  software: { label: 'Software', plural: 'Software' },
  writing: { label: 'Writing', plural: 'Writing' },
  note: { label: 'Note', plural: 'Notes' },
  artwork: { label: 'Artwork', plural: 'Art' },
  research: { label: 'Research', plural: 'Research' },
  log: { label: 'Log', plural: 'Logs' },
  venture: { label: 'Venture', plural: 'Ventures' },
  link: { label: 'Link', plural: 'Links' },
} as const;

export type Kind = keyof typeof kinds;
export const kindKeys = Object.keys(kinds) as [Kind, ...Kind[]];

export const statuses = {
  seedling: { label: 'seedling', hint: 'Early and rough' },
  growing: { label: 'growing', hint: 'Taking shape' },
  evergreen: { label: 'evergreen', hint: 'Reasonably complete' },
  archived: { label: 'archived', hint: 'No longer updated' },
} as const;
