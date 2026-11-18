import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { site } from '../data/site';
import { getEntries, urlOf } from '../lib/entries';

// One feed for everything. Classified entries are left out.
export async function GET(context: APIContext) {
  const entries = (await getEntries()).filter((e) => e.data.visibility !== 'classified');
  return rss({
    title: site.name,
    description: site.description,
    site: context.site!,
    items: entries.map((e) => ({
      title: e.data.title!,
      description: e.data.summary,
      pubDate: e.data.published,
      link: urlOf(e),
      categories: [e.data.kind, ...e.data.topics],
    })),
  });
}
