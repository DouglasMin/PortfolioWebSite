import React from 'react';
import { 
  ArrowRight, 
  Github, 
  Instagram,
  Linkedin,
  FileText
} from 'lucide-react';
import { 
  SiReact, 
  SiTypescript, 
  SiNextdotjs, 
  SiTailwindcss,
  SiNodedotjs, 
  SiExpress,  
  SiFastapi, 
  SiPostgresql,
  SiRedis,
  SiPrisma,
  SiMysql,
  SiAmazonwebservices,
  SiDocker,
  SiGithubactions,
  SiAmazondynamodb,
  SiAmazonrds
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
      { name: 'Tailwind CSS', icon: <SiTailwindcss className="w-5 h-5 text-[#06B6D4]" /> }
    ],
    backend: [
      { name: 'Node.js', icon: <SiNodedotjs className="w-5 h-5 text-[#339933]" /> },
      { name: 'Express', icon: <SiExpress className="w-5 h-5 text-[#000000] dark:text-white" /> },
      { name: 'FastAPI', icon: <SiFastapi className="w-5 h-5 text-[#009688]" /> }
        ],
    database: [
      { name: 'PostgreSQL', icon: <SiPostgresql className="w-5 h-5 text-[#4169E1]" /> },
      { name: 'Redis', icon: <SiRedis className="w-5 h-5 text-[#DC382D]" /> },
      { name: 'MySQL', icon: <SiMysql className="w-5 h-5 text-[#4479A1]" /> },
      { name: 'DynamoDB', icon: <SiAmazondynamodb className="w-5 h-5 text-[#4479A1]" /> },
      
    ],
    architecture: [
      { name: 'AWS', icon: <SiAmazonwebservices className="w-5 h-5 text-[#FF9900]" /> },
      { name: 'Docker', icon: <SiDocker className="w-5 h-5 text-[#2496ED]" /> },
      { name: 'Github Actions', icon: <SiGithubactions className="w-5 h-5 text-[#2088FF]" /> }
    ],
    frameworks: [
      { name: 'React', icon: <SiReact className="w-5 h-5 text-[#61DAFB]" /> },
      { name: 'TypeScript', icon: <SiTypescript className="w-5 h-5 text-[#3178C6]" /> },
      { name: 'Next.js', icon: <SiNextdotjs className="w-5 h-5 text-[#000000] dark:text-white" /> },
      { name: 'Tailwind CSS', icon: <SiTailwindcss className="w-5 h-5 text-[#06B6D4]" /> }
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
                href="/민동익_이력서1.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 sm:flex-none inline-flex items-center justify-center px-3 sm:px-6 py-2.5 sm:py-3 bg-gradient-to-r from-[#4ECDC4] to-[#2AB19F] text-white rounded-lg hover:opacity-90 text-sm sm:text-base"
              >
                <FileText className="w-4 h-4 sm:w-5 sm:h-5" />
                <span className="ml-2 hidden sm:inline">{t('hero.resume')}</span>
              </a>
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
      <section id="skills" className="py-12 sm:py-20 relative">
        {/* Background decoration */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/10 to-purple-600/10 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-pink-400/10 to-yellow-600/10 rounded-full blur-3xl"></div>
        </div>
        <ScrollReveal>
          <div className="text-center mb-8 sm:mb-12 relative">
            <div className="inline-block relative">
              <h2 className="text-3xl sm:text-4xl font-bold gradient-2 relative z-10">{t('skills.title')}</h2>
              <div className="absolute -inset-2 bg-gradient-to-r from-blue-600/20 to-purple-600/20 blur-lg rounded-lg -z-10"></div>
            </div>
            <p className="text-[var(--text-secondary)] mt-4 text-lg max-w-2xl mx-auto">
              현대적인 기술 스택으로 혁신적인 솔루션을 구축합니다
            </p>
          </div>
        </ScrollReveal>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 relative z-10">
          {(Object.entries(techStack) as [SkillSection, TechItem[]][]).map(([key, technologies], index) => (
            <ScrollReveal key={key} delay={index * 100}>
              <div className="skill-card p-4 sm:p-6 relative group overflow-hidden">
                {/* Animated background gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                {/* Floating particles */}
                <div className="absolute inset-0 overflow-hidden">
                  <div className="absolute top-4 right-4 w-2 h-2 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full opacity-20 group-hover:animate-pulse"></div>
                  <div className="absolute bottom-6 left-6 w-1 h-1 bg-gradient-to-r from-pink-400 to-yellow-400 rounded-full opacity-30 group-hover:animate-bounce"></div>
                </div>
                
                <div className="flex items-center mb-4 relative z-10">
                  <div className="relative">
                    {key === 'frontend' && <SiReact className="w-6 h-6 sm:w-8 sm:h-8 text-[#61DAFB] mr-3 group-hover:animate-spin" style={{animationDuration: '3s'}} />}
                    {key === 'backend' && <SiNodedotjs className="w-6 h-6 sm:w-8 sm:h-8 text-[#339933] mr-3 group-hover:scale-110 transition-transform duration-300" />}
                    {key === 'database' && <SiPostgresql className="w-6 h-6 sm:w-8 sm:h-8 text-[#4169E1] mr-3 group-hover:scale-110 transition-transform duration-300" />}
                    {key === 'architecture' && <SiAmazonwebservices className="w-6 h-6 sm:w-8 sm:h-8 text-[#FF9900] mr-3 group-hover:scale-110 transition-transform duration-300" />}
                    {key === 'frameworks' && <SiReact className="w-6 h-6 sm:w-8 sm:h-8 text-[#61DAFB] mr-3 group-hover:animate-spin" style={{animationDuration: '3s'}} />}
                    <div className="absolute -inset-1 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-full blur opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold gradient-1 group-hover:text-shimmer transition-all duration-300">{t(`skills.${key}` as const)}</h3>
                </div>
                <div className="flex flex-wrap gap-2 relative z-10">
                  {technologies.map((tech, techIndex) => (
                    <span 
                      key={tech.name} 
                      className="tech-tag text-sm sm:text-base flex items-center gap-1 group-hover:scale-105 transition-transform duration-200 hover:bg-gradient-to-r hover:from-blue-500/10 hover:to-purple-500/10"
                      style={{transitionDelay: `${techIndex * 50}ms`}}
                    >
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
      <section id="projects" className="py-12 sm:py-20 relative">
        {/* Background decoration */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 right-10 w-32 h-32 bg-gradient-to-br from-green-400/20 to-blue-600/20 rounded-full blur-2xl"></div>
          <div className="absolute bottom-20 left-10 w-40 h-40 bg-gradient-to-tr from-purple-400/20 to-pink-600/20 rounded-full blur-2xl"></div>
        </div>
        <ScrollReveal>
          <div className="text-center mb-8 sm:mb-12 relative">
            <div className="inline-block relative">
              <h2 className="text-3xl sm:text-4xl font-bold gradient-3 relative z-10">{t('projects.title')}</h2>
              <div className="absolute -inset-2 bg-gradient-to-r from-orange-600/20 to-red-600/20 blur-lg rounded-lg -z-10"></div>
            </div>
            <p className="text-[var(--text-secondary)] mt-4 text-lg max-w-2xl mx-auto">
              실제 비즈니스 문제를 해결하는 프로젝트들을 소개합니다
            </p>
          </div>
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