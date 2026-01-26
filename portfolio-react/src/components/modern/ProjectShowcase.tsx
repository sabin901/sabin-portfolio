import { useState } from 'react';
import { motion } from 'framer-motion';
import { projects } from '../../data/projects';

interface ProjectShowcaseProps {
  onProjectClick: (projectId: string) => void;
}

export const ProjectShowcase = ({ onProjectClick }: ProjectShowcaseProps) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const featuredProjects = projects.slice(0, 6);

  return (
    <section className="min-h-screen py-20 px-6 bg-gradient-to-b from-[#0a0a0a] to-[#1a1a1a]">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <h2 className="text-6xl md:text-7xl font-bold text-white mb-4">Featured Projects</h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            A collection of systems and applications built to solve real problems
          </p>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              onClick={() => onProjectClick(project.id)}
              className="group relative bg-[#1a1a1a] border border-gray-800 rounded-2xl overflow-hidden cursor-pointer hover:border-blue-500/50 transition-all"
            >
              {/* Project Image/Visual */}
              <div className="relative h-64 bg-gradient-to-br from-blue-500/20 to-purple-500/20 overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center text-6xl opacity-20 group-hover:opacity-40 transition-opacity">
                  {project.category === 'Business Systems' && '💼'}
                  {project.category === 'Data Analytics' && '📊'}
                  {project.category === 'Machine Learning' && '🤖'}
                  {project.category === 'Web Development' && '🌐'}
                  {project.category === 'E-commerce' && '🛒'}
                  {!['Business Systems', 'Data Analytics', 'Machine Learning', 'Web Development', 'E-commerce'].includes(project.category) && '🚀'}
                </div>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-t from-[#1a1a1a] to-transparent"
                  animate={{ opacity: hoveredIndex === index ? 0.3 : 0.6 }}
                />
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-semibold text-blue-400 uppercase tracking-wider">
                    {project.category}
                  </span>
                  <motion.div
                    animate={{ x: hoveredIndex === index ? 5 : 0 }}
                    className="text-white"
                  >
                    →
                  </motion.div>
                </div>
                <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors">
                  {project.title}
                </h3>
                <p className="text-gray-400 text-sm line-clamp-3 mb-4">
                  {project.problem}
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.slice(0, 3).map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 bg-[#0a0a0a] border border-gray-800 text-gray-400 text-xs rounded-full"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.technologies.length > 3 && (
                    <span className="px-3 py-1 bg-[#0a0a0a] border border-gray-800 text-gray-400 text-xs rounded-full">
                      +{project.technologies.length - 3}
                    </span>
                  )}
                </div>
              </div>

              {/* Hover overlay */}
              <motion.div
                className="absolute inset-0 bg-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
                initial={false}
                animate={{ opacity: hoveredIndex === index ? 1 : 0 }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
