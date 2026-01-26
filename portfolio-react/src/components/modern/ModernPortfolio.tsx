import { useState, useEffect } from 'react';
import { Hero } from './Hero';
import { ProjectShowcase } from './ProjectShowcase';
import { ProjectDetail } from './ProjectDetail';
import { About } from './About';
import { Skills } from './Skills';
import { Contact } from './Contact';

export const ModernPortfolio = () => {
  const [selectedProject, setSelectedProject] = useState<string | null>(null);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToProjects = () => {
    const projectsSection = document.getElementById('projects');
    if (projectsSection) {
      projectsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="bg-[#0a0a0a] text-white overflow-x-hidden">
      {/* Navigation */}
      <nav
        className={`fixed top-0 left-0 right-0 z-40 transition-all ${
          scrollY > 100
            ? 'bg-[#0a0a0a]/95 backdrop-blur-md border-b border-gray-800'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="text-xl font-bold">SR</div>
          <div className="hidden md:flex gap-8">
            {['Projects', 'About', 'Skills', 'Contact'].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="text-gray-400 hover:text-white transition-colors"
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      </nav>

      {/* Sections */}
      <Hero onScroll={scrollToProjects} />
      <div id="projects">
        <ProjectShowcase onProjectClick={setSelectedProject} />
      </div>
      <div id="about">
        <About />
      </div>
      <div id="skills">
        <Skills />
      </div>
      <div id="contact">
        <Contact />
      </div>

      {/* Project Detail Modal */}
      <ProjectDetail projectId={selectedProject} onClose={() => setSelectedProject(null)} />
    </div>
  );
};
