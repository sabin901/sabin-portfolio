import { motion, AnimatePresence } from 'framer-motion';
import { getProjectById } from '../../data/projects';

interface ProjectModalProps {
  projectId: string | null;
  onClose: () => void;
}

export const ProjectModal = ({ projectId, onClose }: ProjectModalProps) => {
  const project = projectId ? getProjectById(projectId) : null;

  if (!project) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[2000] flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0, y: 20 }}
          onClick={(e) => e.stopPropagation()}
          className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl max-w-5xl max-h-[90vh] overflow-hidden w-full shadow-2xl"
          style={{
            boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
          }}
        >
          {/* Header - macOS Style */}
          <div className="sticky top-0 bg-white dark:bg-gray-800 px-8 py-6 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between z-10 backdrop-blur-sm">
            <div>
              <span className="inline-block px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-xs font-semibold mb-3">
                {project.category}
              </span>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                {project.title}
              </h2>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
              aria-label="Close modal"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Content */}
          <div className="overflow-y-auto max-h-[calc(90vh-120px)]">
            <div className="p-8 space-y-8">
              {/* Problem */}
              <div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                  <span>🎯</span>
                  Problem
                </h3>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-lg">{project.problem}</p>
              </div>

              {/* Context */}
              <div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Context</h3>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{project.context}</p>
              </div>

              {/* Approach */}
              <div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                  <span>🛠️</span>
                  My Approach
                </h3>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{project.approach}</p>
              </div>

              {/* Technologies */}
              <div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Technologies Used</h3>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg text-sm font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Results */}
              <div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                  <span>📈</span>
                  Results
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {Object.entries(project.results).map(([key, value]) => (
                    <div
                      key={key}
                      className="bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 p-6 rounded-xl"
                    >
                      <div className="text-sm text-gray-600 dark:text-gray-400 mb-2 font-medium">{key}</div>
                      <div className="text-xl font-bold text-gray-900 dark:text-white">{value}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Lessons */}
              <div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Lessons & Next Steps</h3>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{project.lessons}</p>
              </div>

              {/* Links */}
              <div className="flex gap-4 pt-6 border-t border-gray-200 dark:border-gray-700">
                {project.links.github && (
                  <a
                    href={project.links.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-all shadow-lg hover:shadow-xl flex items-center gap-2"
                    style={{
                      boxShadow: '0 4px 12px rgba(37, 99, 235, 0.4)',
                    }}
                  >
                    View on GitHub
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                )}
                {project.links.demo && project.links.demo !== '#' && (
                  <a
                    href={project.links.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="border-2 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                  >
                    Live Demo
                  </a>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
