import React from 'react';
import { Download } from 'lucide-react';

const About: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="max-w-3xl mx-auto">
        <h1 className="section-title text-center">About Me</h1>
        
        <div className="mt-12">
          <img
            src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400"
            alt="Profile"
            className="w-48 h-48 rounded-full mx-auto mb-8 object-cover"
          />
          
          <div className="prose prose-lg max-w-none">
            <p className="mb-6">
              Hi! I'm John Doe, a passionate Full Stack Developer based in New York City. With over 5 years of experience
              in web development, I specialize in creating efficient, scalable, and user-friendly applications.
            </p>
            
            <p className="mb-6">
              My journey in tech started when I built my first website at 15. Since then, I've worked with various
              technologies and frameworks, always staying current with the latest industry trends and best practices.
            </p>

            <h2 className="text-2xl font-bold mt-12 mb-4">Technical Skills</h2>
            <ul className="grid grid-cols-2 gap-4">
              <li>JavaScript/TypeScript</li>
              <li>React.js</li>
              <li>Node.js</li>
              <li>Python</li>
              <li>PostgreSQL</li>
              <li>AWS</li>
              <li>Docker</li>
              <li>Git</li>
            </ul>

            <h2 className="text-2xl font-bold mt-12 mb-4">Experience</h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-bold">Senior Full Stack Developer</h3>
                <p className="text-gray-600">Tech Corp Inc. • 2020 - Present</p>
                <p>Led development of multiple high-impact web applications using React and Node.js.</p>
              </div>
              <div>
                <h3 className="text-xl font-bold">Full Stack Developer</h3>
                <p className="text-gray-600">Digital Solutions Ltd. • 2018 - 2020</p>
                <p>Developed and maintained various client projects using modern web technologies.</p>
              </div>
            </div>

            <div className="mt-12 text-center">
              <a
                href="/resume.pdf"
                className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                <Download className="mr-2 w-5 h-5" />
                Download Resume
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;