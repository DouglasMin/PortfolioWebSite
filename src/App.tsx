import React, { useEffect } from 'react';
import { Sun, Moon, Languages } from 'lucide-react';
import { useLanguage } from './contexts/LanguageContext';
import { useTheme } from './contexts/ThemeContext';
import Home from './pages/Home';
import LikeVisitCounter from './components/LikeVisitCounter';
import './styles/main.scss';

type NavSection = 'home' | 'skills' | 'experience' | 'awards' | 'education' | 'certifications' | 'projects';

function App() {
  const { toggleLanguage, t } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const sections: NavSection[] = ['home', 'skills', 'experience', 'awards', 'education', 'certifications', 'projects'];
  
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.5,
    };

    const handleIntersect = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          document.querySelectorAll('.progress-item').forEach((item) => {
            item.classList.remove('active');
          });
          
          const activeItem = document.querySelector(`[data-section="${entry.target.id}"]`);
          if (activeItem) {
            activeItem.classList.add('active');
          }
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersect, observerOptions);

    sections.forEach((section) => {
      const element = document.getElementById(section);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

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