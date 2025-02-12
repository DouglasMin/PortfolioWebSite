import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import ScrollReveal from './ScrollReveal';
import { Award, ExternalLink } from 'lucide-react';

type Language = 'ko' | 'en';

interface CertificationItem {
  name: Record<Language, string>;
  issuer: Record<Language, string>;
  date: string;
  credentialId?: string;
  url?: string;
}

const Certifications: React.FC = () => {
  const { currentLanguage } = useLanguage();

  const certifications: CertificationItem[] = [
    {
      name: {
        ko: 'AWS 공인 솔루션스 아키텍트 - 어소시에이트',
        en: 'AWS Certified Solutions Architect - Associate'
      },
      issuer: {
        ko: '아마존 웹 서비스',
        en: 'Amazon Web Services'
      },
      date: '2024.12',
      url: 'https://aws.amazon.com/verification'
    }
  ];

  return (
    <section id="certifications" className="py-12 sm:py-20">
      <ScrollReveal>
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-8 sm:mb-12 gradient-3">
          {currentLanguage === 'ko' ? '자격증' : 'Certifications'}
        </h2>
      </ScrollReveal>

      <div className="max-w-4xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
        {certifications.map((cert, index) => (
          <ScrollReveal key={index} delay={index * 200}>
            <div className="p-4 sm:p-6 rounded-lg bg-[var(--bg-secondary)] hover:transform hover:-translate-y-1 transition-transform duration-300 shadow-lg">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="text-lg sm:text-xl font-bold mb-2 gradient-1">{cert.name[currentLanguage]}</h3>
                  <p className="text-[var(--text-secondary)] font-medium mb-1 text-sm sm:text-base">{cert.issuer[currentLanguage]}</p>
                  <p className="text-xs sm:text-sm text-[var(--text-secondary)] mb-2">{cert.date}</p>
                  {cert.credentialId && (
                    <p className="text-xs sm:text-sm text-[var(--text-secondary)]">
                      ID: {cert.credentialId}
                    </p>
                  )}
                </div>
                <div className="flex items-center space-x-2">
                  <Award className="w-5 h-5 sm:w-6 sm:h-6 text-[#4ECDC4]" />
                  {cert.url && (
                    <a
                      href={cert.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#4ECDC4] hover:text-[#45b8b0] transition-colors"
                    >
                      <ExternalLink className="w-4 h-4 sm:w-5 sm:h-5" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
};

export default Certifications; 