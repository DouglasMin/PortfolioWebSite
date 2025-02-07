import React from 'react';
import { Github, ExternalLink } from 'lucide-react';
import { Project } from '../data/projects';
import { useLanguage } from '../contexts/LanguageContext';

interface ProjectCardProps {
  project: Project;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const { t } = useLanguage();

  return (
    <div className="project-card">
      <img 
        src={project.thumbnail} 
        alt={project.title}
        className="project-image"
      />
      <div className="project-overlay">
        <h3 className="text-2xl font-bold mb-2">{project.title}</h3>
        <p className="text-gray-200 mb-4">{project.description}</p>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {project.technologies.map((tech) => (
            <span key={tech} className="tech-tag">
              {tech}
            </span>
          ))}
        </div>
        
        <div className="flex space-x-4">
          <a 
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center text-white hover:text-blue-300 transition-colors"
          >
            <Github className="w-5 h-5 mr-2" />
            {t('projects.viewCode')}
          </a>
          {project.liveUrl && (
            <a 
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center text-white hover:text-blue-300 transition-colors"
            >
              <ExternalLink className="w-5 h-5 mr-2" />
              {t('projects.viewDemo')}
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;