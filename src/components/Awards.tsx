import React from 'react';
import ScrollReveal from './ScrollReveal';
import { useLanguage } from '../contexts/LanguageContext';
import { Award, ExternalLink } from 'lucide-react';

type Language = 'ko' | 'en';

interface AwardItem {
  title: Record<Language, string>;
  organization: Record<Language, string>;
  date: string;
  description?: Record<Language, string>;
  type: 'gold' | 'silver' | 'bronze' | 'special';
  link?: {
    type: 'image' | 'article';
    url: string;
    label: Record<Language, string>;
  };
}

const Awards: React.FC = () => {
  const { currentLanguage } = useLanguage();

  const awards: AwardItem[] = [
    {
      title: {
        ko: 'AI4GOOD Hackathon 3위',
        en: 'AI4GOOD Hackathon 3rd Place'
      },
      organization: {
        ko: 'AWS | GIST',
        en: 'AWS | GIST'
      },
      date: '2024.03',
      type: 'bronze'
    },
    {
      title: {
        ko: '중소벤처기업부 장관상',
        en: 'Minister Award of SMEs and Startups'
      },
      organization: {
        ko: '중소벤처기업부',
        en: 'Ministry of SMEs and Startups'
      },
      date: '2024.10',
      type: 'special',
      link: {
        type: 'image',
        url: '/award.jpeg',
        label: {
          ko: '수상 사진 보기',
          en: 'View Award Photo'
        }
      }
    },
    {
      title: {
        ko: '우송대 LINC 사업단 캡스톤디자인 경진대회 대상',
        en: 'Woosong University LINC Capstone Design Competition Grand Prize'
      },
      organization: {
        ko: 'LINC 사업단',
        en: 'LINC Project Group'
      },
      date: '2024.06',
      type: 'gold',
      link: {
        type: 'article',
        url: 'https://www.cbiz.kr/news/articleView.html?idxno=27551',
        label: {
          ko: '기사 보기',
          en: 'View Article'
        }
      }
    }
  ];

  return (
    <section id="awards" className="py-12 sm:py-20">
      <ScrollReveal>
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-8 sm:mb-16 gradient-1">
          {currentLanguage === 'ko' ? '수상 내역' : 'Awards'}
        </h2>
      </ScrollReveal>

      <div className="max-w-5xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
        {awards.map((award, index) => (
          <ScrollReveal key={index} delay={index * 200}>
            <div className="relative group">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-[#FF6B6B] to-[#4ECDC4] rounded-lg blur opacity-30 group-hover:opacity-50 transition duration-300" />
              
              <div className="relative p-4 sm:p-6 bg-[var(--bg-secondary)] rounded-lg">
                {award.link && (
                  <div className="absolute inset-0 bg-black/80 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <a
                      href={award.link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white flex items-center gap-2 hover:text-blue-400 transition-colors text-sm sm:text-base"
                    >
                      {award.link.label[currentLanguage]}
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>
                )}
                
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="text-lg sm:text-xl font-bold mb-2 pr-8 gradient-1">
                      {award.title[currentLanguage]}
                    </h3>
                    
                    <div className="flex flex-col space-y-1 sm:space-y-2 mb-3 sm:mb-4">
                      <p className="text-[var(--text-secondary)] font-medium text-sm sm:text-base">
                        {award.organization[currentLanguage]}
                      </p>
                      <p className="text-xs sm:text-sm text-[var(--text-secondary)]">
                        {award.date}
                      </p>
                    </div>
                    
                    {award.description && (
                      <p className="text-[var(--text-primary)] text-sm sm:text-base leading-relaxed">
                        {award.description[currentLanguage]}
                      </p>
                    )}
                  </div>

                  <div className="flex items-center space-x-2">
                    <Award className={`w-5 h-5 sm:w-6 sm:h-6 ${
                      award.type === 'gold' ? 'text-[#FFD700]' :
                      award.type === 'silver' ? 'text-[#C0C0C0]' :
                      award.type === 'bronze' ? 'text-[#CD7F32]' :
                      'text-[#FF6B6B]'
                    }`} />
                  </div>
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