import React from 'react';
import { 
  ArrowRight, 
  Github, 
  Blocks, 
  Database, 
  Cloud, 
  Braces, 
  FileJson, 
  Cpu, 
  LayoutTemplate,
  Server,
  Binary,
  Container,
  TestTube,
  Code2
} from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { projects } from '../data/projects';
import ProjectCard from '../components/ProjectCard';
import ScrollReveal from '../components/ScrollReveal';
import ChatIntro from '../components/ChatIntro';
import Experience from '../components/Experience';
import Awards from '../components/Awards';
import Education from '../components/Education';
import Certifications from '../components/Certifications';

type SkillSection = 'frontend' | 'backend' | 'database' | 'architecture' | 'frameworks';

interface TechItem {
  name: string;
  icon: JSX.Element;
}

const Home: React.FC = () => {
  const { t } = useLanguage();
  const featuredProjects = projects.filter(project => project.featured);

  const techStack: Record<SkillSection, TechItem[]> = {
    frontend: [
      { name: 'React', icon: <Blocks className="w-4 h-4" /> },
      { name: 'TypeScript', icon: <FileJson className="w-4 h-4" /> },
      { name: 'Next.js', icon: <Binary className="w-4 h-4" /> },
      { name: 'Tailwind CSS', icon: <LayoutTemplate className="w-4 h-4" /> },
      { name: 'SCSS', icon: <Code2 className="w-4 h-4" /> }
    ],
    backend: [
      { name: 'Node.js', icon: <Server className="w-4 h-4" /> },
      { name: 'Express', icon: <Cpu className="w-4 h-4" /> },
      { name: 'Python', icon: <Binary className="w-4 h-4" /> },
      { name: 'FastAPI', icon: <Braces className="w-4 h-4" /> },
      { name: 'GraphQL', icon: <Code2 className="w-4 h-4" /> },
      { name: 'Django', icon: <Code2 className="w-4 h-4" /> }
    ],
    database: [
      { name: 'PostgreSQL', icon: <Database className="w-4 h-4" /> },
      { name: 'Redis', icon: <Database className="w-4 h-4" /> },
      { name: 'Prisma', icon: <Database className="w-4 h-4" /> },
      { name: 'MySQL', icon: <Database className="w-4 h-4" /> }
    ],
    architecture: [
      { name: 'AWS', icon: <Cloud className="w-4 h-4" /> },
      { name: 'Docker', icon: <Container className="w-4 h-4" /> },
      { name: 'CI/CD', icon: <Binary className="w-4 h-4" /> },
    ],
    frameworks: [
      { name: 'React', icon: <Blocks className="w-4 h-4" /> },
      { name: 'TypeScript', icon: <FileJson className="w-4 h-4" /> },
      { name: 'Next.js', icon: <Binary className="w-4 h-4" /> },
      { name: 'Tailwind CSS', icon: <LayoutTemplate className="w-4 h-4" /> },
      { name: 'SCSS', icon: <Code2 className="w-4 h-4" /> }
    ]
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Hero Section */}
      <section id="home" className="text-center py-20">
        <ScrollReveal>
          <div className="mb-8">
            <img
              src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix"
              alt="Profile"
              className="w-32 h-32 rounded-full mx-auto border-4 border-gradient-1 shadow-lg"
            />
          </div>
          <ChatIntro />
          <div className="flex justify-center space-x-4 mt-12">
            <a href="#projects" className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-[#FF6B6B] to-[#4ECDC4] text-white rounded-lg hover:opacity-90 transition-opacity">
              {t('hero.viewProjects')} <ArrowRight className="ml-2 w-5 h-5" />
            </a>
            <a
              href="https://github.com/yourusername"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-6 py-3 bg-gray-800 text-white rounded-lg hover:bg-gray-900"
            >
              <Github className="mr-2 w-5 h-5" /> GitHub
            </a>
          </div>
        </ScrollReveal>
      </section>

      {/* Tech Stack Section */}
      <section id="skills" className="py-20">
        <ScrollReveal>
          <h2 className="text-4xl font-bold text-center mb-12 gradient-2">{t('skills.title')}</h2>
        </ScrollReveal>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
          {(Object.entries(techStack) as [SkillSection, TechItem[]][]).map(([key, technologies]) => (
            <ScrollReveal key={key}>
              <div className="skill-card">
                <div className="flex items-center mb-4">
                  {key === 'frontend' && <Blocks className="w-8 h-8 text-[#FF6B6B] mr-3" />}
                  {key === 'backend' && <Server className="w-8 h-8 text-[#4ECDC4] mr-3" />}
                  {key === 'database' && <Database className="w-8 h-8 text-[#FFD93D] mr-3" />}
                  {key === 'architecture' && <Cloud className="w-8 h-8 text-[#FF6B6B] mr-3" />}
                  {key === 'frameworks' && <TestTube className="w-8 h-8 text-[#4ECDC4] mr-3" />}
                  <h3 className="text-xl font-bold gradient-1">{t(`skills.${key}` as const)}</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {technologies.map((tech) => (
                    <span key={tech.name} className="tech-tag flex items-center gap-1">
                      {tech.icon}
                      {tech.name}
                    </span>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* Experience Section */}
      <Experience />

      {/* Awards Section */}
      <Awards />

      {/* Education Section */}
      <Education />

      {/* Certifications Section */}
      <Certifications />

      {/* Featured Projects Section */}
      <section id="projects" className="py-20">
        <ScrollReveal>
          <h2 className="text-4xl font-bold text-center mb-12 gradient-3">{t('projects.title')}</h2>
        </ScrollReveal>
        <div className="grid md:grid-cols-2 gap-8 mt-12">
          {featuredProjects.map((project) => (
            <ScrollReveal key={project.id}>
              <ProjectCard project={project} />
            </ScrollReveal>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;