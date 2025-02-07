import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import ScrollReveal from './ScrollReveal';

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
      title: t('experience.senior.title'),
      company: t('experience.senior.company'),
      period: t('experience.senior.period'),
      description: t('experience.senior.description')
    },
    {
      title: t('experience.fullstack.title'),
      company: t('experience.fullstack.company'),
      period: t('experience.fullstack.period'),
      description: t('experience.fullstack.description')
    },
    {
      title: t('experience.junior.title'),
      company: t('experience.junior.company'),
      period: t('experience.junior.period'),
      description: t('experience.junior.description')
    }
  ];

  return (
    <section id="experience" className="py-20">
      <ScrollReveal>
        <h2 className="text-4xl font-bold text-center mb-12 gradient-2">{t('experience.title')}</h2>
      </ScrollReveal>
      
      <div className="relative max-w-3xl mx-auto mt-12">
        {/* Vertical Line */}
        <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-gradient-to-b from-[#FF6B6B] to-[#4ECDC4]" />
        
        {experiences.map((exp, index) => (
          <ScrollReveal key={index} delay={index * 200}>
            <div className={`relative flex items-center mb-12 ${
              index % 2 === 0 ? 'flex-row-reverse' : ''
            }`}>
              {/* Timeline Dot */}
              <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 rounded-full bg-gradient-to-r from-[#FF6B6B] to-[#4ECDC4]" />
              
              {/* Content */}
              <div className={`w-1/2 ${index % 2 === 0 ? 'pr-12' : 'pl-12'}`}>
                <div className="p-6 rounded-lg shadow-lg bg-[var(--bg-secondary)] hover:transform hover:-translate-y-1 transition-transform duration-300">
                  <h3 className="text-xl font-bold mb-2 gradient-1">{exp.title}</h3>
                  <p className="text-[var(--text-secondary)] font-medium mb-2">{exp.company}</p>
                  <p className="text-sm text-[var(--text-secondary)] mb-3">{exp.period}</p>
                  <p className="text-[var(--text-primary)]">{exp.description}</p>
                </div>
              </div>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
};

export default Experience; 