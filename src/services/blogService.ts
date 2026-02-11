import type { BlogPost, BlogPostMeta } from '../types/blog';

const INDEX_URL = '/blog/index.json';

export async function fetchBlogIndex(): Promise<BlogPostMeta[]> {
  const response = await fetch(INDEX_URL, { cache: 'no-store' });
  if (!response.ok) {
    throw new Error('Failed to load blog index');
  }
  return response.json();
}

export async function fetchBlogPost(slug: string): Promise<BlogPost> {
  const response = await fetch(`/blog/posts/${slug}.json`, { cache: 'no-store' });
  if (!response.ok) {
    throw new Error('Failed to load blog post');
  }
  return response.json();
}
