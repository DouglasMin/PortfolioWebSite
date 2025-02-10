import React from 'react';
import { 
  ArrowRight, 
  Github, 
  Instagram,
  Linkedin
} from 'lucide-react';
import { 
  SiReact, 
  SiTypescript, 
  SiNextdotjs, 
  SiTailwindcss, 
  SiSass, 
  SiNodedotjs, 
  SiExpress, 
  SiPython, 
  SiFastapi, 
  SiGraphql, 
  SiDjango,
  SiPostgresql,
  SiRedis,
  SiPrisma,
  SiMysql,
  SiAmazonwebservices,
  SiDocker,
  SiGithubactions
} from 'react-icons/si';
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
      { name: 'React', icon: <SiReact className="w-5 h-5 text-[#61DAFB]" /> },
      { name: 'TypeScript', icon: <SiTypescript className="w-5 h-5 text-[#3178C6]" /> },
      { name: 'Next.js', icon: <SiNextdotjs className="w-5 h-5 text-[#000000] dark:text-white" /> },
      { name: 'Tailwind CSS', icon: <SiTailwindcss className="w-5 h-5 text-[#06B6D4]" /> },
      { name: 'SCSS', icon: <SiSass className="w-5 h-5 text-[#CC6699]" /> }
    ],
    backend: [
      { name: 'Node.js', icon: <SiNodedotjs className="w-5 h-5 text-[#339933]" /> },
      { name: 'Express', icon: <SiExpress className="w-5 h-5 text-[#000000] dark:text-white" /> },
      { name: 'Python', icon: <SiPython className="w-5 h-5 text-[#3776AB]" /> },
      { name: 'FastAPI', icon: <SiFastapi className="w-5 h-5 text-[#009688]" /> },
      { name: 'GraphQL', icon: <SiGraphql className="w-5 h-5 text-[#E10098]" /> },
      { name: 'Django', icon: <SiDjango className="w-5 h-5 text-[#092E20]" /> }
    ],
    database: [
      { name: 'PostgreSQL', icon: <SiPostgresql className="w-5 h-5 text-[#4169E1]" /> },
      { name: 'Redis', icon: <SiRedis className="w-5 h-5 text-[#DC382D]" /> },
      { name: 'Prisma', icon: <SiPrisma className="w-5 h-5 text-[#2D3748]" /> },
      { name: 'MySQL', icon: <SiMysql className="w-5 h-5 text-[#4479A1]" /> }
    ],
    architecture: [
      { name: 'AWS', icon: <SiAmazonwebservices className="w-5 h-5 text-[#FF9900]" /> },
      { name: 'Docker', icon: <SiDocker className="w-5 h-5 text-[#2496ED]" /> },
      { name: 'CI/CD', icon: <SiGithubactions className="w-5 h-5 text-[#2088FF]" /> }
    ],
    frameworks: [
      { name: 'React', icon: <SiReact className="w-5 h-5 text-[#61DAFB]" /> },
      { name: 'TypeScript', icon: <SiTypescript className="w-5 h-5 text-[#3178C6]" /> },
      { name: 'Next.js', icon: <SiNextdotjs className="w-5 h-5 text-[#000000] dark:text-white" /> },
      { name: 'Tailwind CSS', icon: <SiTailwindcss className="w-5 h-5 text-[#06B6D4]" /> },
      { name: 'SCSS', icon: <SiSass className="w-5 h-5 text-[#CC6699]" /> }
    ]
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Hero Section */}
      <section id="home" className="text-center py-12 sm:py-20">
        <ScrollReveal>
          <div className="mb-6 sm:mb-8">
            <img
              src="/01.jpg"
              alt="Dongik Min Profile"
              className="w-24 h-24 sm:w-32 sm:h-32 rounded-full mx-auto border-4 border-gradient-1 shadow-lg object-cover"
            />
          </div>
          <ChatIntro />
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mt-8 sm:mt-12">
            <a href="#projects" className="w-full sm:w-auto inline-flex items-center justify-center px-4 sm:px-6 py-2.5 sm:py-3 bg-gradient-to-r from-[#FF6B6B] to-[#4ECDC4] text-white rounded-lg hover:opacity-90 transition-opacity text-sm sm:text-base">
              {t('hero.viewProjects')} <ArrowRight className="ml-2 w-4 h-4 sm:w-5 sm:h-5" />
            </a>
            <div className="flex flex-row gap-3 sm:gap-4 w-full sm:w-auto justify-center">
              <a
                href="https://github.com/DouglasMin"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 sm:flex-none inline-flex items-center justify-center px-3 sm:px-6 py-2.5 sm:py-3 bg-gray-800 text-white rounded-lg hover:bg-gray-900 text-sm sm:text-base"
              >
                <Github className="w-4 h-4 sm:w-5 sm:h-5" />
                <span className="ml-2 hidden sm:inline">GitHub</span>
              </a>
              <a
                href="https://www.instagram.com/mindong_mandongik?igsh=MWR1dWltd2ZnM3o0eg%3D%3D&utm_source=qr"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 sm:flex-none inline-flex items-center justify-center px-3 sm:px-6 py-2.5 sm:py-3 bg-gradient-to-r from-[#833AB4] to-[#FD1D1D] text-white rounded-lg hover:opacity-90 text-sm sm:text-base"
              >
                <Instagram className="w-4 h-4 sm:w-5 sm:h-5" />
                <span className="ml-2 hidden sm:inline">Instagram</span>
              </a>
              <a
                href="https://www.linkedin.com/in/dongik-min-b8976a273/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 sm:flex-none inline-flex items-center justify-center px-3 sm:px-6 py-2.5 sm:py-3 bg-[#0077B5] text-white rounded-lg hover:opacity-90 text-sm sm:text-base"
              >
                <Linkedin className="w-4 h-4 sm:w-5 sm:h-5" />
                <span className="ml-2 hidden sm:inline">LinkedIn</span>
              </a>
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* Tech Stack Section */}
      <section id="skills" className="py-12 sm:py-20">
        <ScrollReveal>
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-8 sm:mb-12 gradient-2">{t('skills.title')}</h2>
        </ScrollReveal>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {(Object.entries(techStack) as [SkillSection, TechItem[]][]).map(([key, technologies]) => (
            <ScrollReveal key={key}>
              <div className="skill-card p-4 sm:p-6">
                <div className="flex items-center mb-4">
                  {key === 'frontend' && <SiReact className="w-6 h-6 sm:w-8 sm:h-8 text-[#61DAFB] mr-3" />}
                  {key === 'backend' && <SiNodedotjs className="w-6 h-6 sm:w-8 sm:h-8 text-[#339933] mr-3" />}
                  {key === 'database' && <SiPostgresql className="w-6 h-6 sm:w-8 sm:h-8 text-[#4169E1] mr-3" />}
                  {key === 'architecture' && <SiAmazonwebservices className="w-6 h-6 sm:w-8 sm:h-8 text-[#FF9900] mr-3" />}
                  {key === 'frameworks' && <SiReact className="w-6 h-6 sm:w-8 sm:h-8 text-[#61DAFB] mr-3" />}
                  <h3 className="text-lg sm:text-xl font-bold gradient-1">{t(`skills.${key}` as const)}</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {technologies.map((tech) => (
                    <span key={tech.name} className="tech-tag text-sm sm:text-base flex items-center gap-1">
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
      <section id="projects" className="py-12 sm:py-20">
        <ScrollReveal>
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-8 sm:mb-12 gradient-3">{t('projects.title')}</h2>
        </ScrollReveal>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {projects.filter(project => project.featured).map((project) => (
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