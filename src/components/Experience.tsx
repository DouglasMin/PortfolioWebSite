import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import ScrollReveal from './ScrollReveal';
import { Briefcase } from 'lucide-react';

interface ExperienceItem {
  title: string;
  company: string;
  period: string;
  description: string;
}

const Experience: React.FC = () => {
  const { t } = useLanguage();

  const experiences: ExperienceItem[] = [
    {
      title: t('experience.junior.title'),
      company: t('experience.junior.company'),
      period: t('experience.junior.period'),
      description: t('experience.junior.description')
    },
    {
      title: t('experience.intern.title'),
      company: t('experience.intern.company'),
      period: t('experience.intern.period'),
      description: t('experience.intern.description')
    }
  ];

  return (
    <section id="experience" className="py-12 sm:py-20">
      <ScrollReveal>
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-8 sm:mb-12 gradient-2">{t('experience.title')}</h2>
      </ScrollReveal>
      <div className="max-w-3xl mx-auto px-4 space-y-6 sm:space-y-8">
        {experiences.map((experience, index) => (
          <ScrollReveal key={index} delay={index * 200}>
            <div className="relative group">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-[#FF6B6B] to-[#4ECDC4] rounded-lg blur opacity-30 group-hover:opacity-50 transition duration-300" />
              <div className="relative p-4 sm:p-6 bg-[var(--bg-secondary)] rounded-lg">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-lg sm:text-xl font-bold gradient-1">{experience.title}</h3>
                    <div className="flex flex-col space-y-1 sm:space-y-2">
                      <div className="flex items-center">
                        <Briefcase className="w-4 h-4 text-[var(--text-secondary)] mr-2" />
                        <p className="text-[var(--text-secondary)] font-medium text-sm sm:text-base">{experience.company}</p>
                      </div>
                      <p className="text-xs sm:text-sm text-[var(--text-secondary)]">{experience.period}</p>
                    </div>
                  </div>
                </div>
                <p className="text-[var(--text-primary)] text-sm sm:text-base leading-relaxed">
                  {experience.description}
                </p>
              </div>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
};

export default Experience; 