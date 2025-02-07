import React from 'react';
import ScrollReveal from './ScrollReveal';
import { useLanguage } from '../contexts/LanguageContext';

type Language = 'ko' | 'en';

interface AwardItem {
  title: Record<Language, string>;
  organization: Record<Language, string>;
  date: string;
  description: Record<Language, string>;
  type: 'gold' | 'silver' | 'bronze' | 'special';
}

const Awards: React.FC = () => {
  const { currentLanguage } = useLanguage();

  const awards: AwardItem[] = [
    {
      title: {
        ko: '2023 전국 대학생 해커톤 대상',
        en: '2023 National University Hackathon Grand Prize'
      },
      organization: {
        ko: '과학기술정보통신부',
        en: 'Ministry of Science and ICT'
      },
      date: '2023.09',
      description: {
        ko: 'AI 기반 실시간 자동 번역 시스템 개발로 대상 수상',
        en: 'Grand Prize for developing AI-based real-time automatic translation system'
      },
      type: 'gold'
    },
    {
      title: {
        ko: '제4회 SW 개발 공모전 최우수상',
        en: '4th SW Development Competition Excellence Award'
      },
      organization: {
        ko: '한국소프트웨어산업협회',
        en: 'Korea Software Industry Association'
      },
      date: '2023.06',
      description: {
        ko: '클라우드 기반 협업 툴 개발 프로젝트로 최우수상 수상',
        en: 'Excellence Award for cloud-based collaboration tool development project'
      },
      type: 'special'
    }
  ];

  // 수상 타입에 따른 메달 아이콘 SVG
  const getMedalIcon = (type: AwardItem['type']) => {
    const baseClass = "w-12 h-12 absolute -top-6 -right-6 transform rotate-12";
    
    switch (type) {
      case 'gold':
        return (
          <svg className={baseClass} viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="10" className="fill-[#FFD700] dark:fill-[#FFC000]" />
            <path d="M8 12l3 3 5-5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <circle cx="12" cy="12" r="10" className="stroke-[#FFD700] dark:stroke-[#FFC000] opacity-30" strokeWidth="4"/>
          </svg>
        );
      case 'special':
        return (
          <svg className={baseClass} viewBox="0 0 24 24" fill="none">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" 
                  className="fill-[#FF6B6B] dark:fill-[#FF4949] stroke-[#FF6B6B] dark:stroke-[#FF4949]" 
                  strokeWidth="1"/>
          </svg>
        );
      // 다른 타입의 메달도 필요하다면 여기에 추가
    }
  };

  return (
    <section id="awards" className="py-20">
      <ScrollReveal>
        <h2 className="text-4xl font-bold text-center mb-16 gradient-1">
          {currentLanguage === 'ko' ? '수상 내역' : 'Awards'}
        </h2>
      </ScrollReveal>

      <div className="max-w-5xl mx-auto px-4 grid md:grid-cols-2 gap-8">
        {awards.map((award, index) => (
          <ScrollReveal key={index} delay={index * 200}>
            <div className="relative group">
              {/* 배경 그라데이션 효과 */}
              <div className="absolute -inset-0.5 bg-gradient-to-r from-[#FF6B6B] to-[#4ECDC4] rounded-lg blur opacity-30 group-hover:opacity-50 transition duration-300" />
              
              {/* 카드 내용 */}
              <div className="relative p-6 bg-[var(--bg-secondary)] rounded-lg">
                {getMedalIcon(award.type)}
                
                <h3 className="text-xl font-bold mb-2 pr-8 gradient-1">
                  {award.title[currentLanguage]}
                </h3>
                
                <div className="flex flex-col space-y-2 mb-4">
                  <p className="text-[var(--text-secondary)] font-medium">
                    {award.organization[currentLanguage]}
                  </p>
                  <p className="text-sm text-[var(--text-secondary)]">
                    {award.date}
                  </p>
                </div>
                
                <p className="text-[var(--text-primary)] leading-relaxed">
                  {award.description[currentLanguage]}
                </p>

                {/* 장식적 요소 */}
                <div className="absolute bottom-0 right-0 w-24 h-24 opacity-5 pointer-events-none">
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                  </svg>
                </div>
              </div>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
};

export default Awards; 