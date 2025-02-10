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
    <div className="relative group">
      {/* Gradient Border Effect */}
      <div className="absolute -inset-0.5 bg-gradient-to-r from-[#FF6B6B] to-[#4ECDC4] rounded-lg blur opacity-30 group-hover:opacity-75 transition duration-300" />
      
      {/* Main Card */}
      <div className="relative rounded-lg bg-[var(--bg-secondary)] shadow-lg hover:transform hover:-translate-y-1 transition-all duration-300 min-h-[250px] overflow-hidden">
        {/* Initial View */}
        <div className="p-6">
          <h3 className="text-xl font-bold mb-4 gradient-1">
            {project.title[currentLanguage]}
          </h3>
          
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 text-xs font-medium rounded-full bg-[var(--bg-tertiary)] text-[var(--text-secondary)] transition-colors duration-300"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Preview Text */}
          <p className="mt-4 text-sm text-[var(--text-secondary)] line-clamp-2 group-hover:opacity-0 transition-opacity duration-300">
            {project.description[currentLanguage]}
          </p>
        </div>

        {/* Hover View - Details */}
        <div className="absolute inset-0 bg-[var(--bg-secondary)] p-6 translate-y-full group-hover:translate-y-0 transition-all duration-300 ease-in-out overflow-y-auto max-h-full">
          <div className="space-y-4">
            {/* Company & Role Info */}
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

            {/* Description */}
            <p className="text-[var(--text-primary)] text-sm leading-relaxed">
              {project.description[currentLanguage]}
            </p>

            {/* Links */}
            {project.links && (
              <div className="flex flex-wrap items-center gap-4 pt-4">
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
  );
};

export default ProjectCard;