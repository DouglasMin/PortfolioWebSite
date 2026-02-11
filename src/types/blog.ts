export interface BlogPostMeta {
  id: string;
  slug: string;
  title: string;
  description: string;
  publishedDate: string;
  tags: string[];
}

export interface BlogPost extends BlogPostMeta {
  html: string;
}
