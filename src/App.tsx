import React, { useEffect } from 'react';
import { Sun, Moon, Languages } from 'lucide-react';
import { Link, Route, Routes, useLocation } from 'react-router-dom';
import { useLanguage } from './contexts/LanguageContext';
import { useTheme } from './contexts/ThemeContext';
import Home from './pages/Home';
import BlogList from './pages/BlogList';
import BlogPostPage from './pages/BlogPost';
import Header from './components/Header';
import LikeVisitCounter from './components/LikeVisitCounter';
import './styles/tailwind.css';
import './styles/main.scss';

type NavSection = 'home' | 'skills' | 'experience' | 'awards' | 'education' | 'certifications' | 'projects';
const NAV_SECTIONS: NavSection[] = ['home', 'skills', 'experience', 'awards', 'education', 'certifications', 'projects'];

function App() {
  const { toggleLanguage, t } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();
  const isHome = location.pathname === '/';

  useEffect(() => {
    if (!isHome || !location.hash) {
      return;
    }

    const targetId = decodeURIComponent(location.hash.slice(1));
    if (!targetId) {
      return;
    }

    const timer = setTimeout(() => {
      const element = document.getElementById(targetId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);

    return () => clearTimeout(timer);
  }, [isHome, location.hash]);
  
  useEffect(() => {
    if (!isHome) {
      return;
    }

    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -20% 0px',
      threshold: 0.3,
    };

    const handleIntersect = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // Remove active class from all progress items
          document.querySelectorAll('.progress-item').forEach((item) => {
            item.classList.remove('active');
          });

          // Add active class to the current section's progress item
          const activeItem = document.querySelector(`[data-section="${entry.target.id}"]`);
          if (activeItem) {
            activeItem.classList.add('active');
          }
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersect, observerOptions);

    // Add a small delay to ensure DOM is fully rendered
    const timer = setTimeout(() => {
      NAV_SECTIONS.forEach((section) => {
        const element = document.getElementById(section);
        if (element) {
          observer.observe(element);
        }
      });

      // Manually activate the first visible section on load
      const firstSection = document.getElementById('home');
      if (firstSection) {
        const firstProgressItem = document.querySelector('[data-section="home"]');
        if (firstProgressItem) {
          firstProgressItem.classList.add('active');
        }
      }
    }, 100);

    return () => {
      observer.disconnect();
      clearTimeout(timer);
    };
  }, [isHome]);

  const handleProgressClick = (section: NavSection) => {
    const element = document.getElementById(section);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen">
      <Header />
      {/* Theme, Language, and Blog Navigation */}
      <div className="site-utility-dock">
        <Link
          to={isHome ? '/blog' : '/'}
          className="glass-button px-4 py-2 text-sm font-semibold text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
        >
          {isHome ? t('nav.blog') : t('nav.home')}
        </Link>
        <button
          onClick={toggleLanguage}
          className="toggle-button"
          aria-label={t('lang.toggle')}
        >
          <Languages className="w-6 h-6" />
        </button>
        <button
          onClick={toggleTheme}
          className="toggle-button"
          aria-label="Toggle theme"
        >
          {theme === 'light' ? (
            <Moon className="w-6 h-6" />
          ) : (
            <Sun className="w-6 h-6" />
          )}
        </button>
      </div>

      {/* Navigation Progress */}
      {isHome && (
        <div className="nav-progress">
          {NAV_SECTIONS.map((section) => (
            <div
              key={section}
              className="progress-item"
              data-section={section}
              data-label={t(`nav.${section}`)}
              onClick={() => handleProgressClick(section)}
            />
          ))}
        </div>
      )}

      <main className="pt-8 md:pt-10">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/blog" element={<BlogList />} />
          <Route path="/blog/:slug" element={<BlogPostPage />} />
        </Routes>
      </main>

      {/* Like and Visit Counter */}
      <LikeVisitCounter />
    </div>
  );
}

export default App;
