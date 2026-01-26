import { motion, AnimatePresence } from 'framer-motion';
import { getProjectById } from '../../data/projects';

interface ProjectDetailProps {
  projectId: string | null;
  onClose: () => void;
}

export const ProjectDetail = ({ projectId, onClose }: ProjectDetailProps) => {
  const project = projectId ? getProjectById(projectId) : null;

  if (!project) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto"
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0, y: 20 }}
          onClick={(e) => e.stopPropagation()}
          className="bg-[#1a1a1a] border border-gray-800 rounded-2xl max-w-5xl w-full max-h-[90vh] overflow-y-auto"
        >
          {/* Header */}
          <div className="sticky top-0 bg-[#1a1a1a] border-b border-gray-800 p-8 flex items-start justify-between z-10">
            <div>
              <span className="inline-block px-4 py-2 bg-blue-500/20 border border-blue-500/50 text-blue-400 rounded-full text-sm font-semibold mb-4">
                {project.category}
              </span>
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-2">{project.title}</h2>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white text-3xl transition-colors"
            >
              ×
            </button>
          </div>

          {/* Content */}
          <div className="p-8 space-y-12">
            {/* Problem */}
            <section>
              <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                <span className="w-1 h-8 bg-blue-500"></span>
                The Problem
              </h3>
              <p className="text-gray-300 text-lg leading-relaxed">{project.problem}</p>
            </section>

            {/* Context */}
            <section>
              <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                <span className="w-1 h-8 bg-purple-500"></span>
                Context
              </h3>
              <p className="text-gray-300 leading-relaxed">{project.context}</p>
            </section>

            {/* Approach */}
            <section>
              <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                <span className="w-1 h-8 bg-green-500"></span>
                My Approach
              </h3>
              <p className="text-gray-300 leading-relaxed">{project.approach}</p>
            </section>

            {/* Technologies */}
            <section>
              <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                <span className="w-1 h-8 bg-yellow-500"></span>
                Technologies
              </h3>
              <div className="flex flex-wrap gap-3">
                {project.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="px-4 py-2 bg-[#0a0a0a] border border-gray-800 text-gray-300 rounded-lg font-medium"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </section>

            {/* Results */}
            <section>
              <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <span className="w-1 h-8 bg-red-500"></span>
                Results
              </h3>
              <div className="grid md:grid-cols-2 gap-4">
                {Object.entries(project.results).map(([key, value]) => (
                  <div
                    key={key}
                    className="p-6 bg-[#0a0a0a] border border-gray-800 rounded-xl"
                  >
                    <div className="text-sm text-gray-400 mb-2 font-medium">{key}</div>
                    <div className="text-xl font-bold text-white">{value}</div>
                  </div>
                ))}
              </div>
            </section>

            {/* Lessons */}
            <section>
              <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                <span className="w-1 h-8 bg-pink-500"></span>
                Lessons & Next Steps
              </h3>
              <p className="text-gray-300 leading-relaxed">{project.lessons}</p>
            </section>

            {/* Links */}
            <div className="flex gap-4 pt-8 border-t border-gray-800">
              {project.links.github && (
                <a
                  href={project.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 bg-white text-black rounded-lg font-semibold hover:bg-gray-100 transition-colors"
                >
                  View on GitHub
                </a>
              )}
              {project.links.demo && project.links.demo !== '#' && (
                <a
                  href={project.links.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 border-2 border-white text-white rounded-lg font-semibold hover:bg-white hover:text-black transition-colors"
                >
                  Live Demo
                </a>
              )}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
