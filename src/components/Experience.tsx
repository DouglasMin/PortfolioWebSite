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
    <section id="experience" className="py-12 sm:py-20 relative">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 w-64 h-64 bg-gradient-to-br from-indigo-400/10 to-purple-600/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-48 h-48 bg-gradient-to-tr from-teal-400/10 to-blue-600/10 rounded-full blur-3xl"></div>
      </div>
      <ScrollReveal>
        <div className="text-center mb-8 sm:mb-12 relative">
          <div className="inline-block relative">
            <h2 className="text-3xl sm:text-4xl font-bold gradient-2 relative z-10">{t('experience.title')}</h2>
            <div className="absolute -inset-2 bg-gradient-to-r from-teal-600/20 to-blue-600/20 blur-lg rounded-lg -z-10"></div>
          </div>
          <p className="text-[var(--text-secondary)] mt-4 text-lg max-w-2xl mx-auto">
            다양한 프로젝트를 통해 쌓아온 실무 경험과 성과를 소개합니다
          </p>
        </div>
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
                <div className="text-[var(--text-primary)] text-sm sm:text-base leading-relaxed space-y-3">
                  {experience.description.split('\n\n').map((paragraph, idx) => (
                    <div key={idx} className="relative pl-4 border-l-2 border-gradient-to-b from-[#FF6B6B] to-[#4ECDC4]">
                      <div className="absolute -left-1.5 top-2 w-3 h-3 bg-gradient-to-r from-[#FF6B6B] to-[#4ECDC4] rounded-full"></div>
                      <p className="leading-relaxed text-[var(--text-primary)] bg-gradient-to-r from-[var(--text-primary)] to-[var(--text-secondary)] bg-clip-text">
                        {paragraph}
                      </p>
                    </div>
                  ))}
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