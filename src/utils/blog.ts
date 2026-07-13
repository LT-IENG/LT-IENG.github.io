import { getCollection, type CollectionEntry } from 'astro:content';

export type BlogPost = CollectionEntry<'blog'>;

/** Get all blog posts, sorted by date descending */
export async function getAllPosts(): Promise<BlogPost[]> {
  const posts = await getCollection('blog');
  return posts.sort((a, b) => b.data.date.getTime() - a.data.date.getTime());
}

/** Get posts by section */
export async function getPostsBySection(section: string): Promise<BlogPost[]> {
  const all = await getAllPosts();
  return all.filter((p) => p.data.section === section);
}

/** Get featured posts */
export async function getFeaturedPosts(): Promise<BlogPost[]> {
  const all = await getAllPosts();
  const featured = all.filter((p) => p.data.featured);
  return featured.length > 0 ? featured : all.slice(0, 6);
}

/** Group posts by year (for archives) */
export async function getPostsByYear(): Promise<Record<string, BlogPost[]>> {
  const all = await getAllPosts();
  const grouped: Record<string, BlogPost[]> = {};
  for (const post of all) {
    const year = post.data.date.getFullYear().toString();
    if (!grouped[year]) grouped[year] = [];
    grouped[year].push(post);
  }
  return grouped;
}

/** Get adjacent posts (prev/next) */
export async function getAdjacentPosts(slug: string) {
  const all = await getAllPosts();
  const idx = all.findIndex((p) => p.slug === slug);
  return {
    prev: idx > 0 ? all[idx - 1] : null,
    next: idx < all.length - 1 ? all[idx + 1] : null,
  };
}
