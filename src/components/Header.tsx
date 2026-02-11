import React, { useEffect, useMemo, useState } from 'react';
import { Github, Linkedin, Instagram, Mail, Menu, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';

const Header: React.FC = () => {
  const { t } = useLanguage();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const isHome = location.pathname === '/';
  const isBlog = location.pathname.startsWith('/blog');
  const activeHash = location.hash.replace('#', '');

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname, location.hash]);

  const sectionHref = (id: string) => (isHome ? `#${id}` : `/#${id}`);

  const navItems = useMemo(
    () => [
      { key: 'home', label: t('nav.home'), href: sectionHref('home') },
      { key: 'skills', label: t('nav.skills'), href: sectionHref('skills') },
      { key: 'experience', label: t('nav.experience'), href: sectionHref('experience') },
      { key: 'awards', label: t('nav.awards'), href: sectionHref('awards') },
      { key: 'blog', label: t('nav.blog'), href: '/blog', router: true },
      { key: 'contact', label: t('nav.contact'), href: sectionHref('contact') }
    ],
    [isHome, t]
  );

  const isItemActive = (key: string, router?: boolean) => {
    if (router) {
      return key === 'blog' && isBlog;
    }
    if (!isHome) {
      return key === 'home';
    }
    if (!activeHash) {
      return key === 'home';
    }
    return key === activeHash;
  };

  return (
    <header className="site-nav-shell">
      <div className="site-nav-inner">
        <Link to="/" className="site-brand" title="Home">
          <span>{t('hero.name')}</span>
          <small>Tech Blog & Portfolio</small>
        </Link>

        <nav className="site-nav-links" aria-label="Primary navigation">
          {navItems.map((item) =>
            item.router ? (
              <Link
                key={item.key}
                to={item.href}
                className={`site-nav-link ${isItemActive(item.key, true) ? 'active' : ''}`}
              >
                {item.label}
              </Link>
            ) : (
              <a
                key={item.key}
                href={item.href}
                className={`site-nav-link ${isItemActive(item.key) ? 'active' : ''}`}
              >
                {item.label}
              </a>
            )
          )}
        </nav>

        <div className="site-nav-actions">
          <a href="https://github.com/DouglasMin" target="_blank" rel="noopener noreferrer" className="social-link inline-flex" title="GitHub">
            <Github className="w-4 h-4" />
          </a>
          <a href="https://www.instagram.com/mindong_mandongik?igsh=MWR1dWltd2ZnM3o0eg%3D%3D&utm_source=qr" target="_blank" rel="noopener noreferrer" className="social-link inline-flex" title="Instagram">
            <Instagram className="w-4 h-4" />
          </a>
          <a href="https://www.linkedin.com/in/dongik-min-b8976a273/" target="_blank" rel="noopener noreferrer" className="social-link inline-flex" title="LinkedIn">
            <Linkedin className="w-4 h-4" />
          </a>
          <a href="mailto:douglas0703iscool@gmail.com" className="social-link inline-flex" title="Email">
            <Mail className="w-4 h-4" />
          </a>
          <button
            type="button"
            className="site-nav-mobile-toggle"
            aria-label="Toggle menu"
            onClick={() => setMobileOpen((prev) => !prev)}
          >
            {mobileOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <nav className="site-nav-mobile" aria-label="Mobile navigation">
          {navItems.map((item) =>
            item.router ? (
              <Link
                key={item.key}
                to={item.href}
                className={`site-nav-mobile-link ${isItemActive(item.key, true) ? 'active' : ''}`}
              >
                {item.label}
              </Link>
            ) : (
              <a
                key={item.key}
                href={item.href}
                className={`site-nav-mobile-link ${isItemActive(item.key) ? 'active' : ''}`}
              >
                {item.label}
              </a>
            )
          )}
        </nav>
      )}
    </header>
  );
};

export default Header;
