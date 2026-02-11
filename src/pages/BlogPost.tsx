import React, { useEffect, useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Calendar, Tag, ArrowLeft } from 'lucide-react';
import { fetchBlogPost } from '../services/blogService';
import type { BlogPost } from '../types/blog';
import { useLanguage } from '../contexts/LanguageContext';

const BlogPostPage: React.FC = () => {
  const { slug } = useParams();
  const { t, currentLanguage } = useLanguage();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [status, setStatus] = useState<'idle' | 'loading' | 'error'>('idle');

  const locale = useMemo(() => (currentLanguage === 'ko' ? 'ko-KR' : 'en-US'), [currentLanguage]);
  const formatDate = (value: string) => {
    if (!value) return '—';
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return '—';
    return date.toLocaleDateString(locale, { year: 'numeric', month: 'long', day: 'numeric' });
  };

  useEffect(() => {
    if (!slug) {
      setStatus('error');
      return;
    }

    let isMounted = true;
    setStatus('loading');

    fetchBlogPost(slug)
      .then((data) => {
        if (isMounted) {
          setPost(data);
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
  }, [slug]);

  return (
    <main className="blog-post-page">
      <Link to="/blog" className="blog-back-link">
        <ArrowLeft className="w-4 h-4" />
        {t('blog.back')}
      </Link>

      {status === 'loading' && <div className="blog-state-card">{t('blog.loading')}</div>}
      {status === 'error' && <div className="blog-state-card blog-error">{t('blog.error')}</div>}

      {status === 'idle' && post && (
        <article className="blog-post-article">
          <header className="blog-post-header">
            <div className="blog-post-meta">
              <span>
                <Calendar className="w-4 h-4" />
                {formatDate(post.publishedDate)}
              </span>
              {post.tags.length > 0 && (
                <span>
                  <Tag className="w-4 h-4" />
                  {post.tags.join(' · ')}
                </span>
              )}
            </div>
            <h1>{post.title}</h1>
            <p>{post.description}</p>
          </header>

          <div className="blog-content blog-content-article" dangerouslySetInnerHTML={{ __html: post.html }} />
        </article>
      )}
    </main>
  );
};

export default BlogPostPage;
