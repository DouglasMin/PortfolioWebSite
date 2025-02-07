import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import ScrollReveal from './ScrollReveal';

type Language = 'ko' | 'en';

interface EducationItem {
  school: Record<Language, string>;
  degree: Record<Language, string>;
  period: string;
  description: Record<Language, string>;
}

const Education: React.FC = () => {
  const { currentLanguage } = useLanguage();

  const educationItems: EducationItem[] = [
    {
      school: {
        ko: '우송대학교',
        en: 'Woosong University'
      },
      degree: {
        ko: 'AI/빅데이터학과 학사',
        en: 'Bachelor of AI/Big Data'
      },
      period: '2021.03 - 2025.02',
      description: {
        ko: '공로상 수상, 중소벤처기업부 장관상 수상',
        en: 'Excellence Award, Minister of SMEs Award'
      }
    }
  ];

  return (
    <section id="education" className="py-20">
      <ScrollReveal>
        <h2 className="text-4xl font-bold text-center mb-12 gradient-2">
          {currentLanguage === 'ko' ? '학력' : 'Education'}
        </h2>
      </ScrollReveal>

      <div className="max-w-3xl mx-auto px-4">
        {educationItems.map((item, index) => (
          <ScrollReveal key={index} delay={index * 200}>
            <div className="mb-8 p-6 rounded-lg bg-[var(--bg-secondary)] hover:transform hover:-translate-y-1 transition-transform duration-300 shadow-lg">
              <h3 className="text-xl font-bold mb-2 gradient-1">{item.school[currentLanguage]}</h3>
              <p className="text-[var(--text-secondary)] font-medium mb-2">{item.degree[currentLanguage]}</p>
              <p className="text-sm text-[var(--text-secondary)] mb-3">{item.period}</p>
              <p className="text-[var(--text-primary)]">{item.description[currentLanguage]}</p>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
};

export default Education; 