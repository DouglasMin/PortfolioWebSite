import React, { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import ScrollReveal from './ScrollReveal';
import { Briefcase, ExternalLink, Newspaper, Calendar, MapPin, User, ChevronRight, Info, FileText } from 'lucide-react';

interface ExperienceItem {
  title: string;
  company: string;
  period: string;
  description: string;
  technologies?: string[];
  role?: string;
  type: 'work' | 'project';
  links?: {
    title: string;
    url: string;
    type: 'news' | 'demo' | 'github' | 'paper';
  }[];
}

interface ProjectCardProps {
  project: ExperienceItem;
  index: number;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, index }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <ScrollReveal delay={index * 150}>
      <div className="space-y-4">
        {/* Project Card */}
        <div className="relative h-80 perspective-1000">
          <div 
            className={`relative w-full h-full transition-transform duration-700 transform-style-preserve-3d cursor-pointer ${
              isFlipped ? 'rotate-y-180' : ''
            }`}
            onClick={() => setIsFlipped(!isFlipped)}
          >
            {/* Front Side */}
            <div className="absolute inset-0 backface-hidden rounded-xl overflow-hidden">
              <div className="relative h-full glass-card rounded-xl p-6 group hover:shadow-2xl transition-all duration-300">
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl"></div>
                
                {/* Content */}
                <div className="relative z-10 h-full flex flex-col">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-lg sm:text-xl font-bold gradient-1 mb-2 line-clamp-2">{project.title}</h3>
                      <div className="space-y-2">
                        <div className="flex items-center text-sm text-[var(--text-secondary)]">
                          <MapPin className="w-4 h-4 mr-2" />
                          {project.company}
                        </div>
                        <div className="flex items-center text-sm text-[var(--text-secondary)]">
                          <Calendar className="w-4 h-4 mr-2" />
                          {project.period}
                        </div>
                        {project.role && (
                          <div className="flex items-center text-sm text-[var(--text-secondary)]">
                            <User className="w-4 h-4 mr-2" />
                            {project.role}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex-1 mb-4">
                    <p className="text-sm text-[var(--text-primary)] line-clamp-4 leading-relaxed">
                      {project.description.split('\n')[0]}
                    </p>
                  </div>

                  {project.technologies && (
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.technologies.map((tech) => (
                        <span key={tech} className="tech-tag text-xs">
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-xs text-[var(--text-secondary)]">
                      <Info className="w-3 h-3 mr-1" />
                      클릭하여 자세히 보기
                    </div>
                    <ChevronRight className="w-5 h-5 text-[var(--text-secondary)] group-hover:text-[var(--text-primary)] transition-colors" />
                  </div>
                </div>
              </div>
            </div>

            {/* Back Side */}
            <div className="absolute inset-0 backface-hidden rotate-y-180 rounded-xl overflow-hidden">
              <div className="relative h-full glass-heavy rounded-xl p-6">
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 via-blue-500/5 to-purple-500/5 rounded-xl"></div>
                
                {/* Content */}
                <div className="relative z-10 h-full flex flex-col">
                  <h3 className="text-lg font-bold gradient-2 mb-4">{project.title}</h3>
                  
                  <div className="flex-1 overflow-y-auto">
                    <div className="space-y-3 text-sm text-[var(--text-primary)] leading-relaxed">
                      {project.description.split('\n\n').map((paragraph, idx) => (
                        <div key={idx} className="relative pl-4 border-l-2 border-gradient-to-b from-[#4ECDC4] to-[#FF6B6B]">
                          <div className="absolute -left-1.5 top-1 w-3 h-3 bg-gradient-to-r from-[#4ECDC4] to-[#FF6B6B] rounded-full"></div>
                          <p>{paragraph}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-center mt-4 text-xs text-[var(--text-secondary)]">
                    <Info className="w-3 h-3 mr-1" />
                    다시 클릭하여 돌아가기
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* External Links - Outside of card */}
        {project.links && project.links.length > 0 && (
          <div className="flex justify-center">
            <div className="flex flex-wrap gap-2 justify-center">
              {project.links.map((link, linkIdx) => (
                <a
                  key={linkIdx}
                  href={link.url}
                  {...(link.type === 'paper' ? { download: link.title + '.pdf' } : { target: '_blank', rel: 'noopener noreferrer' })}
                  className="inline-flex items-center gap-2 px-4 py-2 text-sm glass-button rounded-full text-[var(--text-primary)] hover:text-blue-400 transition-all duration-200 hover:scale-105"
                >
                  {link.type === 'news' && <Newspaper className="w-4 h-4" />}
                  {link.type === 'paper' && <FileText className="w-4 h-4" />}
                  {link.type === 'demo' && <ExternalLink className="w-4 h-4" />}
                  {link.type === 'github' && <ExternalLink className="w-4 h-4" />}
                  <span>{link.title}</span>
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </ScrollReveal>
  );
};

const Experience: React.FC = () => {
  const { t } = useLanguage();

  const workExperiences: ExperienceItem[] = [
    {
      title: t('experience.junior.title'),
      company: t('experience.junior.company'),
      period: t('experience.junior.period'),
      description: t('experience.junior.description'),
      type: 'work',
      links: [
        {
          title: '딥비스트로 관련 서울신문 기사',
          url: 'https://www.seoul.co.kr/news/economy/2024/12/06/20241206500081',
          type: 'news'
        }
      ]
    },
    {
      title: t('experience.intern.title'),
      company: t('experience.intern.company'),
      period: t('experience.intern.period'),
      description: t('experience.intern.description'),
      type: 'work'
    }
  ];

  const projectExperiences: ExperienceItem[] = [
    {
      title: t('experience.seah.title'),
      company: t('experience.seah.company'),
      period: t('experience.seah.period'),
      description: t('experience.seah.description'),
      role: t('experience.seah.role'),
      type: 'project',
      technologies: ['Python', 'FastAPI', 'React', 'AI']
    },
    {
      title: t('experience.purdue.title'),
      company: t('experience.purdue.company'),
      period: t('experience.purdue.period'),
      description: t('experience.purdue.description'),
      role: t('experience.purdue.role'),
      type: 'project',
      technologies: ['Python', 'Computer Vision', 'YOLOv8', 'UAV'],
      links: [
        {
          title: 'Lost and Found 논문',
          url: '/Lost_and_Found.pdf',
          type: 'paper'
        }
      ]
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

      {/* Work Experience Section */}
      <div className="max-w-4xl mx-auto px-4 mb-16">
        <ScrollReveal>
          <h3 className="text-2xl font-bold text-center mb-8 gradient-1 flex items-center justify-center">
            <Briefcase className="w-6 h-6 mr-2" />
            실무 경험
          </h3>
        </ScrollReveal>
        <div className="space-y-6 sm:space-y-8">
          {workExperiences.map((experience, index) => (
            <ScrollReveal key={index} delay={index * 200}>
              <div className="relative group">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-[#FF6B6B] to-[#4ECDC4] rounded-lg blur opacity-30 group-hover:opacity-50 transition duration-300" />
                <div className="relative p-4 sm:p-6 glass-card rounded-lg">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h4 className="text-lg sm:text-xl font-bold gradient-1">{experience.title}</h4>
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
                        <p className="leading-relaxed text-[var(--text-primary)]">
                          {paragraph}
                        </p>
                      </div>
                    ))}
                  </div>
                  
                  {experience.links && experience.links.length > 0 && (
                    <div className="mt-4 pt-4 border-t border-[var(--border-color)]">
                      <h5 className="text-sm font-semibold text-[var(--text-secondary)] mb-2 flex items-center">
                        <ExternalLink className="w-4 h-4 mr-1" />
                        참고 자료
                      </h5>
                      <div className="flex flex-wrap gap-2">
                        {experience.links.map((link, linkIdx) => (
                          <a
                            key={linkIdx}
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 px-3 py-1.5 text-xs sm:text-sm glass-button rounded-full text-[var(--text-primary)] hover:text-blue-400 transition-all duration-200 group"
                          >
                            {link.type === 'news' && <Newspaper className="w-3 h-3" />}
                            <span className="group-hover:underline">{link.title}</span>
                            <ExternalLink className="w-3 h-3 opacity-50 group-hover:opacity-100" />
                          </a>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>

      {/* Project Experience Section */}
      <div id="projects" className="max-w-6xl mx-auto px-4">
        <ScrollReveal>
          <h3 className="text-2xl font-bold text-center mb-8 gradient-3 flex items-center justify-center">
            <MapPin className="w-6 h-6 mr-2" />
            주요 프로젝트
          </h3>
        </ScrollReveal>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {projectExperiences.map((project, index) => (
            <ProjectCard key={index} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience; 
