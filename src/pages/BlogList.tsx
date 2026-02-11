import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Tag, ArrowUpRight } from 'lucide-react';
import { fetchBlogIndex } from '../services/blogService';
import type { BlogPostMeta } from '../types/blog';
import { useLanguage } from '../contexts/LanguageContext';

const BlogList: React.FC = () => {
  const { t, currentLanguage } = useLanguage();
  const [posts, setPosts] = useState<BlogPostMeta[]>([]);
  const [status, setStatus] = useState<'idle' | 'loading' | 'error'>('idle');

  const locale = useMemo(() => (currentLanguage === 'ko' ? 'ko-KR' : 'en-US'), [currentLanguage]);
  const formatDate = (value: string) => {
    if (!value) return '—';
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return '—';
    return date.toLocaleDateString(locale, { year: 'numeric', month: 'short', day: 'numeric' });
  };

  useEffect(() => {
    let isMounted = true;
    setStatus('loading');

    fetchBlogIndex()
      .then((data) => {
        if (isMounted) {
          setPosts(data);
          setStatus('idle');
        }
      })
      .catch(() => {
        if (isMounted) {
          setStatus('error');
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <main className="blog-list-page">
      <section className="blog-hero">
        <p className="blog-kicker">{t('blog.label')}</p>
        <h1>{t('blog.title')}</h1>
        <p>{t('blog.subtitle')}</p>
        {status === 'idle' && posts.length > 0 && (
          <div className="blog-hero-stats" aria-label="Blog statistics">
            <span>{posts.length} posts</span>
            <span>Continuously synced from Notion</span>
          </div>
        )}
      </section>

      {status === 'loading' && <div className="blog-state-card">{t('blog.loading')}</div>}
      {status === 'error' && <div className="blog-state-card blog-error">{t('blog.error')}</div>}
      {status === 'idle' && posts.length === 0 && <div className="blog-state-card">{t('blog.empty')}</div>}

      {status === 'idle' && posts.length > 0 && (
        <section className="blog-feed" aria-label="Blog posts">
          {posts.map((post, index) => (
            <article key={post.id} className="blog-feed-card">
              <div className="blog-feed-meta">
                <span>
                  <Calendar className="w-4 h-4" />
                  {formatDate(post.publishedDate)}
                </span>
                {post.tags.length > 0 && (
                  <span className="blog-meta-tags">
                    <Tag className="w-4 h-4" />
                    {post.tags.join(' · ')}
                  </span>
                )}
              </div>

              <h2>{post.title}</h2>
              <p>{post.description}</p>
              {post.tags.length > 0 && (
                <div className="blog-tag-row">
                  {post.tags.map((tag) => (
                    <span key={`${post.id}-${tag}`} className="blog-tag-chip">
                      #{tag}
                    </span>
                  ))}
                </div>
              )}

              <div className="blog-feed-footer">
                <span className="blog-index">{String(index + 1).padStart(2, '0')}</span>
                <Link to={`/blog/${post.slug}`} className="blog-read-link">
                  {t('blog.readMore')}
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
              </div>
            </article>
          ))}
        </section>
      )}
    </main>
  );
};

export default BlogList;
