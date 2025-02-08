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
    }
  ];

  return (
    <section id="experience" className="py-20">
      <ScrollReveal>
        <h2 className="text-4xl font-bold text-center mb-12 gradient-2">{t('experience.title')}</h2>
      </ScrollReveal>
      <div className="max-w-3xl mx-auto space-y-8">
        {experiences.map((experience, index) => (
          <ScrollReveal key={index} delay={index * 200}>
            <div className="relative group">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-[#FF6B6B] to-[#4ECDC4] rounded-lg blur opacity-30 group-hover:opacity-50 transition duration-300" />
              <div className="relative p-6 bg-[var(--bg-secondary)] rounded-lg">
                <h3 className="text-xl font-bold mb-2 gradient-1">{experience.title}</h3>
                <div className="flex flex-col space-y-2 mb-4">
                  <p className="text-[var(--text-secondary)] font-medium">{experience.company}</p>
                  <p className="text-sm text-[var(--text-secondary)]">{experience.period}</p>
                </div>
                <p className="text-[var(--text-primary)] leading-relaxed">{experience.description}</p>
              </div>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
};

export default Experience; 