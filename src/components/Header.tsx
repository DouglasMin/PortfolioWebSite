import React from 'react';
import { Github, Linkedin, Instagram } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';

const Header: React.FC = () => {
  const { t } = useLanguage();

  return (
    <header className="fixed top-0 w-full bg-white/80 dark:bg-gray-900/80 backdrop-blur-md z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="text-xl font-bold text-[var(--text-primary)]">
            {t('hero.name')}
          </Link>
          
          <nav className="hidden md:flex space-x-8">
            <Link to="/#home" className="text-[var(--text-secondary)] hover:text-blue-600">{t('nav.home')}</Link>
            <Link to="/#skills" className="text-[var(--text-secondary)] hover:text-blue-600">{t('nav.skills')}</Link>
            <Link to="/#experience" className="text-[var(--text-secondary)] hover:text-blue-600">{t('nav.experience')}</Link>
            <Link to="/#awards" className="text-[var(--text-secondary)] hover:text-blue-600">{t('nav.awards')}</Link>
            <Link to="/#education" className="text-[var(--text-secondary)] hover:text-blue-600">{t('nav.education')}</Link>
            <Link to="/#certifications" className="text-[var(--text-secondary)] hover:text-blue-600">{t('nav.certifications')}</Link>
            <Link to="/#projects" className="text-[var(--text-secondary)] hover:text-blue-600">{t('nav.projects')}</Link>
          </nav>

          <div className="flex items-center space-x-4">
            <a href="https://github.com/DouglasMin" target="_blank" rel="noopener noreferrer" className="social-link">
              <Github className="w-5 h-5 text-[var(--text-secondary)] hover:text-blue-600" />
            </a>
            <a href="https://www.instagram.com/mindong_mandongik?igsh=MWR1dWltd2ZnM3o0eg%3D%3D&utm_source=qr" target="_blank" rel="noopener noreferrer" className="social-link">
              <Instagram className="w-5 h-5 text-[var(--text-secondary)] hover:text-blue-600" />
            </a>
            <a href="https://www.linkedin.com/in/dongik-min-b8976a273/" target="_blank" rel="noopener noreferrer" className="social-link">
              <Linkedin className="w-5 h-5 text-[var(--text-secondary)] hover:text-blue-600" />
            </a>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;