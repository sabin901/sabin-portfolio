import { motion } from 'framer-motion';
import type { Project } from '../../data/projects';

interface ProjectCardProps {
  project: Project;
  onViewCaseStudy: (projectId: string) => void;
}

export const ProjectCard = ({ project, onViewCaseStudy }: ProjectCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden hover:shadow-xl transition-all group"
    >
      <div className="p-8">
        {/* Category Badge */}
        <div className="mb-4">
          <span className="inline-block px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-xs font-semibold">
            {project.category}
          </span>
        </div>

        {/* Project Title */}
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          {project.title}
        </h3>

        {/* Problem */}
        <div className="mb-6">
          <h4 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">
            🎯 Problem
          </h4>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            {project.problem}
          </p>
        </div>

        {/* Approach */}
        <div className="mb-6">
          <h4 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">
            🛠️ My Approach
          </h4>
          <ul className="space-y-2 text-gray-700 dark:text-gray-300">
            {project.approach.split('. ').filter(Boolean).slice(0, 3).map((point, index) => (
              <li key={index} className="flex items-start gap-2">
                <span className="text-green-500 dark:text-green-400 mt-1">•</span>
                <span>{point.trim()}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Results */}
        <div className="mb-6">
          <h4 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">
            📈 Results
          </h4>
          <div className="space-y-2">
            {Object.entries(project.results).slice(0, 2).map(([key, value]) => (
              <div key={key} className="text-gray-700 dark:text-gray-300">
                <span className="font-semibold">{key}:</span> {value}
              </div>
            ))}
          </div>
        </div>

        {/* Tech Stack */}
        <div className="mb-6">
          <div className="flex flex-wrap gap-2">
            {project.technologies.slice(0, 4).map((tech) => (
              <span
                key={tech}
                className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-xs font-medium"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          <button
            onClick={() => onViewCaseStudy(project.id)}
            className="flex-1 bg-gray-900 dark:bg-white text-white dark:text-gray-900 px-6 py-3 rounded-lg font-semibold hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors"
          >
            View Case Study
          </button>
          <a
            href={project.links.github}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg font-semibold hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors flex items-center justify-center"
          >
            GitHub
          </a>
        </div>
      </div>
    </motion.div>
  );
};
