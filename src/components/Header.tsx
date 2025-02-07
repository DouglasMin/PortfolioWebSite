import React from 'react';
import { Github, Linkedin, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';

const Header: React.FC = () => {
  const { t } = useLanguage();

  return (
    <header className="fixed top-0 w-full bg-white/80 backdrop-blur-md z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="text-xl font-bold text-gray-900">
            {t('hero.name')}
          </Link>
          
          <nav className="hidden md:flex space-x-8">
            <Link to="/" className="text-gray-700 hover:text-blue-600">{t('nav.home')}</Link>
            <Link to="/projects" className="text-gray-700 hover:text-blue-600">{t('nav.projects')}</Link>
            <Link to="/about" className="text-gray-700 hover:text-blue-600">{t('nav.about')}</Link>
            <Link to="/contact" className="text-gray-700 hover:text-blue-600">{t('nav.contact')}</Link>
          </nav>

          <div className="flex items-center space-x-4">
            <a href="https://github.com/yourusername" target="_blank" rel="noopener noreferrer">
              <Github className="w-5 h-5 text-gray-700 hover:text-blue-600" />
            </a>
            <a href="https://linkedin.com/in/yourusername" target="_blank" rel="noopener noreferrer">
              <Linkedin className="w-5 h-5 text-gray-700 hover:text-blue-600" />
            </a>
            <a href="mailto:your.email@example.com">
              <Mail className="w-5 h-5 text-gray-700 hover:text-blue-600" />
            </a>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;