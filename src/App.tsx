import React, { useEffect } from 'react';
import { Sun, Moon, Languages } from 'lucide-react';
import { useLanguage } from './contexts/LanguageContext';
import { useTheme } from './contexts/ThemeContext';
import Home from './pages/Home';
import LikeVisitCounter from './components/LikeVisitCounter';
import './styles/tailwind.css';
import './styles/main.scss';

type NavSection = 'home' | 'skills' | 'experience' | 'awards' | 'education' | 'certifications' | 'projects';

function App() {
  const { toggleLanguage, t } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const sections: NavSection[] = ['home', 'skills', 'experience', 'awards', 'education', 'certifications', 'projects'];
  
  useEffect(() => {
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
      sections.forEach((section) => {
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
  }, [sections]);

  const handleProgressClick = (section: NavSection) => {
    const element = document.getElementById(section);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen">
      {/* Theme and Language Toggles */}
      <div className="fixed top-4 right-4 flex items-center space-x-4 z-50">
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
      <div className="nav-progress">
        {sections.map((section) => (
          <div
            key={section}
            className="progress-item"
            data-section={section}
            data-label={t(`nav.${section}`)}
            onClick={() => handleProgressClick(section)}
          />
        ))}
      </div>

      <main>
        <Home />
      </main>

      {/* Like and Visit Counter */}
      <LikeVisitCounter />
    </div>
  );
}

export default App;