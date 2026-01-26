import { motion } from 'framer-motion';

export const Hero = () => {
  return (
    <section
      id="home"
      className="relative flex items-center justify-center min-h-screen bg-white dark:bg-gray-900 pt-20 transition-colors duration-300"
    >
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 opacity-[0.02] dark:opacity-[0.03]">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" className="text-gray-900 dark:text-gray-100" />
        </svg>
      </div>

      {/* Main Content */}
      <div className="relative z-10 w-11/12 md:w-12/12 lg:w-9/12 mx-auto max-w-5xl">
        <div className="text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-6xl md:text-8xl font-bold text-gray-900 dark:text-white mb-6"
          >
            Sabin Raut
          </motion.h1>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-2xl md:text-3xl font-medium text-gray-600 dark:text-gray-300 mb-4"
          >
            Software Developer & Problem Solver
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-xl md:text-2xl text-gray-700 dark:text-gray-400 mb-12 max-w-3xl mx-auto leading-relaxed"
          >
            "I build tools that save time and reduce errors."
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
          >
            <a
              href="#work"
              className="bg-gray-900 dark:bg-white text-white dark:text-gray-900 px-8 py-4 rounded-lg font-semibold hover:bg-gray-800 dark:hover:bg-gray-100 transition-all shadow-lg text-lg"
            >
              Explore Projects
            </a>
            <a
              href="#resume"
              className="bg-white dark:bg-gray-800 border-2 border-gray-900 dark:border-gray-700 text-gray-900 dark:text-white px-8 py-4 rounded-lg font-semibold hover:bg-gray-50 dark:hover:bg-gray-700 transition-all text-lg"
            >
              Resume PDF
            </a>
          </motion.div>

          {/* Availability */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="flex flex-wrap justify-center gap-6 text-sm text-gray-600 dark:text-gray-400"
          >
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-green-500 rounded-full"></span>
              <span>Available for hire</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-green-500 rounded-full"></span>
              <span>Open to relocate</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-green-500 rounded-full"></span>
              <span>Response within 24hrs</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
