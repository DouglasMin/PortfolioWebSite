export interface Project {
  id: string;
  title: Record<'ko' | 'en', string>;
  description: Record<'ko' | 'en', string>;
  period?: string;
  role?: Record<'ko' | 'en', string>;
  company?: Record<'ko' | 'en', string>;
  links?: {
    github?: string;
    demo?: string;
    article?: string;
    paper?: string;
  };
  tags: string[];
  featured: boolean;
} 