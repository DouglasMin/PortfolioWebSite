import React, { useEffect, useState } from 'react';
import { Sun, Moon, Languages } from 'lucide-react';
import { useLanguage } from './contexts/LanguageContext';
import Home from './pages/Home';
import './styles/main.scss';

function App() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const { toggleLanguage, t } = useLanguage();
  const sections = ['home', 'skills', 'experience', 'projects'];
  
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null;
    if (savedTheme) {
      setTheme(savedTheme);
      document.body.className = savedTheme;
    } else {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setTheme(prefersDark ? 'dark' : 'light');
      document.body.className = prefersDark ? 'dark' : 'light';
    }
  }, []);

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

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    document.body.className = newTheme;
    localStorage.setItem('theme', newTheme);
  };

  const handleProgressClick = (section: string) => {
    const element = document.getElementById(section);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className={`min-h-screen ${theme}`}>
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
    </div>
  );
}

export default App;