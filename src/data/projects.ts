export interface Project {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  githubUrl: string;
  liveUrl?: string;
  technologies: string[];
  featured: boolean;
}

// Replace this data with your actual projects
export const projects: Project[] = [
  {
    id: 'project-1',
    title: 'Project Title 1',
    description: 'Brief description of your project. What problems does it solve? What technologies did you use?',
    thumbnail: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=1600',
    githubUrl: 'https://github.com/yourusername/project1',
    liveUrl: 'https://project1-demo.com',
    technologies: ['React', 'Node.js', 'MongoDB', 'TypeScript'],
    featured: true
  },
  {
    id: 'project-2',
    title: 'Project Title 2',
    description: 'Brief description of your project. What problems does it solve? What technologies did you use?',
    thumbnail: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?auto=format&fit=crop&q=80&w=1600',
    githubUrl: 'https://github.com/yourusername/project2',
    technologies: ['React', 'Firebase', 'Tailwind CSS'],
    featured: true
  }
];