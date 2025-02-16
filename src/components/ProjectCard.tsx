import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { ExternalLink, FileText, Newspaper, Calendar, Building2 } from 'lucide-react';

interface Project {
  id: string;
  title: Record<'ko' | 'en', string>;
  description: Record<'ko' | 'en', string>;
  period?: string;
  role?: Record<'ko' | 'en', string>;
  company?: Record<'ko' | 'en', string>;
  links?: {
    github?: string;
    demo?: string;
    article?: string;
    paper?: string;
  };
  tags: string[];
  featured: boolean;
}

interface ProjectCardProps {
  project: Project;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const { currentLanguage } = useLanguage();

  return (
    <div className="relative group [perspective:1000px] h-full">
      <div className="relative duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)] h-full">
        {/* Front of Card */}
        <div className="absolute backface-hidden w-full h-full">
          <div className="relative">
            {/* Gradient Border Effect */}
            <div className="absolute -inset-0.5 bg-gradient-to-r from-[#FF6B6B] to-[#4ECDC4] rounded-lg blur opacity-30 group-hover:opacity-75 transition duration-300" />
            
            {/* Main Card Front */}
            <div className="relative rounded-lg bg-[var(--bg-secondary)] shadow-lg h-full">
              <div className="p-6">
                <h3 className="text-xl font-bold mb-4 gradient-1">
                  {project.title[currentLanguage]}
                </h3>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 text-xs font-medium rounded-full bg-[var(--bg-tertiary)] text-[var(--text-secondary)] transition-colors duration-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Mobile View - Always Visible */}
                <div className="block sm:hidden space-y-4 mt-4">
                  {(project.company || project.period || project.role) && (
                    <div className="flex flex-col space-y-2">
                      {project.company && (
                        <div className="flex items-center text-sm text-[var(--text-secondary)]">
                          <Building2 className="w-4 h-4 mr-2 text-[#4ECDC4] flex-shrink-0" />
                          {project.company[currentLanguage]}
                        </div>
                      )}
                      {project.period && (
                        <div className="flex items-center text-sm text-[var(--text-secondary)]">
                          <Calendar className="w-4 h-4 mr-2 text-[#4ECDC4] flex-shrink-0" />
                          {project.period}
                        </div>
                      )}
                      {project.role && (
                        <div className="flex items-center text-sm font-medium text-[var(--text-primary)]">
                          {project.role[currentLanguage]}
                        </div>
                      )}
                    </div>
                  )}

                  <p className="text-[var(--text-primary)] text-sm leading-relaxed">
                    {project.description[currentLanguage]}
                  </p>

                  {project.links && (
                    <div className="flex flex-wrap gap-3 pt-2">
                      {project.links.github && (
                        <a
                          href={project.links.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1 text-sm text-[#4ECDC4] hover:text-[#45b8b0] transition-colors"
                        >
                          View Code <ExternalLink className="w-4 h-4" />
                        </a>
                      )}
                      {project.links.demo && (
                        <a
                          href={project.links.demo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1 text-sm text-[#4ECDC4] hover:text-[#45b8b0] transition-colors"
                        >
                          Live Demo <ExternalLink className="w-4 h-4" />
                        </a>
                      )}
                      {project.links.article && (
                        <a
                          href={project.links.article}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1 text-sm text-[#4ECDC4] hover:text-[#45b8b0] transition-colors group"
                        >
                          <Newspaper className="w-4 h-4 flex-shrink-0" />
                          <span className="group-hover:underline">
                            {currentLanguage === 'ko' ? '기사 보기' : 'View Article'}
                          </span>
                        </a>
                      )}
                      {project.links.paper && (
                        <a
                          href={project.links.paper}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1 text-sm text-[#4ECDC4] hover:text-[#45b8b0] transition-colors group"
                        >
                          <FileText className="w-4 h-4 flex-shrink-0" />
                          <span className="group-hover:underline">
                            {currentLanguage === 'ko' ? '논문 다운로드' : 'Download Paper'}
                          </span>
                        </a>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Back of Card */}
        <div className="absolute backface-hidden w-full h-full [transform:rotateY(180deg)]">
          <div className="relative h-full">
            {/* Gradient Border Effect */}
            <div className="absolute -inset-0.5 bg-gradient-to-r from-[#4ECDC4] to-[#FF6B6B] rounded-lg blur opacity-75 transition duration-300" />
            
            {/* Main Card Back */}
            <div className="relative rounded-lg bg-[var(--bg-secondary)] shadow-lg h-full">
              <div className="p-6 space-y-4">
                {(project.company || project.period || project.role) && (
                  <div className="flex flex-col space-y-2">
                    {project.company && (
                      <div className="flex items-center text-sm text-[var(--text-secondary)]">
                        <Building2 className="w-4 h-4 mr-2 text-[#4ECDC4] flex-shrink-0" />
                        {project.company[currentLanguage]}
                      </div>
                    )}
                    {project.period && (
                      <div className="flex items-center text-sm text-[var(--text-secondary)]">
                        <Calendar className="w-4 h-4 mr-2 text-[#4ECDC4] flex-shrink-0" />
                        {project.period}
                      </div>
                    )}
                    {project.role && (
                      <div className="flex items-center text-sm font-medium text-[var(--text-primary)]">
                        {project.role[currentLanguage]}
                      </div>
                    )}
                  </div>
                )}

                <p className="text-[var(--text-primary)] text-sm leading-relaxed">
                  {project.description[currentLanguage]}
                </p>

                {project.links && (
                  <div className="flex flex-wrap gap-3 pt-2">
                    {project.links.github && (
                      <a
                        href={project.links.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 text-sm text-[#4ECDC4] hover:text-[#45b8b0] transition-colors"
                      >
                        View Code <ExternalLink className="w-4 h-4" />
                      </a>
                    )}
                    {project.links.demo && (
                      <a
                        href={project.links.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 text-sm text-[#4ECDC4] hover:text-[#45b8b0] transition-colors"
                      >
                        Live Demo <ExternalLink className="w-4 h-4" />
                      </a>
                    )}
                    {project.links.article && (
                      <a
                        href={project.links.article}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 text-sm text-[#4ECDC4] hover:text-[#45b8b0] transition-colors group"
                      >
                        <Newspaper className="w-4 h-4 flex-shrink-0" />
                        <span className="group-hover:underline">
                          {currentLanguage === 'ko' ? '기사 보기' : 'View Article'}
                        </span>
                      </a>
                    )}
                    {project.links.paper && (
                      <a
                        href={project.links.paper}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 text-sm text-[#4ECDC4] hover:text-[#45b8b0] transition-colors group"
                      >
                        <FileText className="w-4 h-4 flex-shrink-0" />
                        <span className="group-hover:underline">
                          {currentLanguage === 'ko' ? '논문 다운로드' : 'Download Paper'}
                        </span>
                      </a>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;