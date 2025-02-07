import React from 'react';
import { projects } from '../data/projects';
import ProjectCard from '../components/ProjectCard';
import ScrollReveal from '../components/ScrollReveal';

const Projects: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <ScrollReveal>
        <h1 className="section-title text-center">My Projects</h1>
      </ScrollReveal>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
        {projects.map((project) => (
          <ScrollReveal key={project.id}>
            <ProjectCard project={project} />
          </ScrollReveal>
        ))}
      </div>
    </div>
  );
};

export default Projects;