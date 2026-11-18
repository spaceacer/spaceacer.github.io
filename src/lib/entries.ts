import { getCollection, type CollectionEntry } from 'astro:content';

export type Entry = CollectionEntry<'entries'>;

/** The URL slug of an entry: its folder name. */
export const slugOf = (e: Entry) => e.id.replace(/\/index$/, '').split('/').pop()!;
export const urlOf = (e: Entry) => `/work/${slugOf(e)}/`;

/** Entries that get a page of their own (public and preview). */
export const hasPage = (e: Entry) => e.data.visibility !== 'classified';

/** URL-safe form of a topic name. */
export const topicSlug = (t: string) =>
  t.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

/** All non-draft entries, newest first. Enforces the visibility rules. */
export async function getEntries(): Promise<Entry[]> {
  const all = await getCollection('entries', (e: Entry) => import.meta.env.DEV || !e.data.draft);
  for (const e of all) {
    if (e.data.visibility !== 'public' && e.body && e.body.trim().length > 0) {
      throw new Error(
        `Entry "${e.id}" is ${e.data.visibility} but has body text. ` +
          'This repository is public, so keep private details out of it.',
      );
    }
  }
  return all.sort((a, b) => b.data.published.valueOf() - a.data.published.valueOf());
}

/** Topics with their entry counts, most used first. */
export function topicsOf(entries: Entry[]) {
  const counts = new Map<string, { name: string; slug: string; count: number }>();
  for (const e of entries) {
    if (e.data.visibility === 'classified') continue;
    for (const t of e.data.topics) {
      const slug = topicSlug(t);
      const cur = counts.get(slug) ?? { name: t, slug, count: 0 };
      cur.count++;
      counts.set(slug, cur);
    }
  }
  return [...counts.values()].sort((a, b) => b.count - a.count || a.name.localeCompare(b.name));
}

/** Entries sharing the most topics with `entry`. */
export function relatedTo(entry: Entry, entries: Entry[], limit = 4) {
  const mine = new Set(entry.data.topics.map(topicSlug));
  return entries
    .filter((e) => e.id !== entry.id && hasPage(e))
    .map((e) => ({ e, score: e.data.topics.filter((t) => mine.has(topicSlug(t))).length }))
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score || b.e.data.published.valueOf() - a.e.data.published.valueOf())
    .slice(0, limit)
    .map((x) => x.e);
}

export const isoDate = (d: Date) => d.toISOString().slice(0, 10);
