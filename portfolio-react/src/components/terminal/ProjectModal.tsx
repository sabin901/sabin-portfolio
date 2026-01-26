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
        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[2000] flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          onClick={(e) => e.stopPropagation()}
          className="bg-[#161b22] border-2 border-[#30363d] rounded-2xl max-w-5xl max-h-[90vh] overflow-y-auto w-full shadow-2xl"
          style={{ scrollbarWidth: 'thin', scrollbarColor: '#30363d #161b22' }}
        >
          {/* Terminal Header */}
          <div className="sticky top-0 bg-[#0d1117] border-b-2 border-[#30363d] px-6 py-4 flex items-center justify-between z-10">
            <div className="flex items-center gap-3">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-[#ff5f56]"></div>
                <div className="w-3 h-3 rounded-full bg-[#ffbd2e]"></div>
                <div className="w-3 h-3 rounded-full bg-[#27c93f]"></div>
              </div>
              <div className="text-[#58a6ff] font-mono text-sm">
                $ cat {project.id}.md
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-[#8b949e] hover:text-[#c9d1d9] text-2xl transition-colors"
              aria-label="Close"
            >
              ×
            </button>
          </div>

          <div className="p-8">
            {/* Project Header */}
            <div className="mb-8">
              <div className="inline-block px-4 py-2 bg-gradient-to-r from-[#58a6ff] to-[#79c0ff] rounded-lg text-white text-sm font-bold mb-4">
                {project.category}
              </div>
              <h2 className="text-4xl font-black text-[#c9d1d9] mb-4">{project.title}</h2>
              <p className="text-xl text-[#8b949e] leading-relaxed">{project.problem}</p>
            </div>

            {/* Context */}
            <div className="mb-8 p-6 bg-[#0d1117] border border-[#30363d] rounded-xl">
              <h3 className="text-[#3fb950] mb-3 font-bold text-lg">📖 Context</h3>
              <p className="text-[#c9d1d9] leading-relaxed">{project.context}</p>
            </div>

            {/* Approach */}
            <div className="mb-8 p-6 bg-[#0d1117] border border-[#30363d] rounded-xl">
              <h3 className="text-[#3fb950] mb-3 font-bold text-lg">🛠️ Approach</h3>
              <p className="text-[#c9d1d9] leading-relaxed">{project.approach}</p>
            </div>

            {/* Technologies */}
            <div className="mb-8">
              <h3 className="text-[#3fb950] mb-4 font-bold text-lg">💻 Technologies</h3>
              <div className="flex flex-wrap gap-3">
                {project.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="px-4 py-2 bg-[#0d1117] border-2 border-[#30363d] rounded-lg text-[#c9d1d9] font-semibold hover:border-[#58a6ff] transition-colors"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Results */}
            <div className="mb-8">
              <h3 className="text-[#3fb950] mb-4 font-bold text-lg">📈 Results</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Object.entries(project.results).map(([key, value]) => (
                  <div
                    key={key}
                    className="p-6 bg-gradient-to-br from-[#0d1117] to-[#161b22] border-2 border-[#30363d] rounded-xl hover:border-[#3fb950] transition-colors"
                  >
                    <div className="text-[#8b949e] text-sm mb-2">{key}</div>
                    <div className="text-2xl font-bold text-[#3fb950]">{value}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Lessons */}
            <div className="mb-8 p-6 bg-[#0d1117] border border-[#30363d] rounded-xl">
              <h3 className="text-[#3fb950] mb-3 font-bold text-lg">📚 Lessons & Next Steps</h3>
              <p className="text-[#c9d1d9] leading-relaxed">{project.lessons}</p>
            </div>

            {/* Links */}
            <div className="flex gap-4 pt-6 border-t border-[#30363d]">
              {project.links.github && (
                <a
                  href={project.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 bg-[#238636] hover:bg-[#2ea043] text-white rounded-xl font-bold transition-all hover:scale-105 shadow-lg"
                >
                  View on GitHub
                </a>
              )}
              {project.links.demo && project.links.demo !== '#' && (
                <a
                  href={project.links.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 bg-[#161b22] border-2 border-[#58a6ff] hover:bg-[#58a6ff]/10 text-[#58a6ff] rounded-xl font-bold transition-all hover:scale-105"
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
