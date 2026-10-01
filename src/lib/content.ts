import { getCollection, type CollectionEntry } from 'astro:content';

// The only place that queries collections: pages never call getCollection directly,
// so "drafts never reach production" and "newest first" are decided in one spot.

const newestFirst = (a: { data: { date: Date } }, b: { data: { date: Date } }) =>
  b.data.date.valueOf() - a.data.date.valueOf();

// Drafts show in `npm run dev` and are left out of `npm run build`.
const isPublished = ({ data }: { data: { draft: boolean } }) =>
  import.meta.env.PROD ? !data.draft : true;

export async function getPublishedProjects(): Promise<CollectionEntry<'projects'>[]> {
  return (await getCollection('projects', isPublished)).sort(newestFirst);
}

// Frontmatter dates are midnight UTC, so format in UTC or the day shifts west of Greenwich.
export function formatDate(date: Date): string {
  return date.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    timeZone: 'UTC',
  });
}
