import React from 'react';
import { Languages } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const LanguageToggle: React.FC = () => {
  const { toggleLanguage, t } = useLanguage();

  return (
    <button
      onClick={toggleLanguage}
      className="fixed top-1rem left-1rem z-100 flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-300 hover:bg-opacity-80"
      aria-label={t('lang.toggle')}
    >
      <Languages className="w-5 h-5" />
      <span>{t('lang.toggle')}</span>
    </button>
  );
};

export default LanguageToggle;