import { motion } from 'framer-motion';

export const HomeWindow = () => {
  return (
    <div className="h-full w-full bg-white dark:bg-gray-800">
      {/* Full Screen Layout */}
      <div className="h-full flex flex-col">
        {/* Hero Section - Full Width */}
        <div className="flex-1 flex items-center justify-center bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-800 dark:via-gray-900 dark:to-gray-800 p-12">
          <div className="max-w-7xl mx-auto w-full">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Left Side - Profile */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="text-center lg:text-left"
              >
                {/* Profile Picture */}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                  className="mb-8 flex justify-center lg:justify-start"
                >
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full blur-2xl opacity-40 animate-pulse-slow" />
                    <img
                      src="/images/profile-pic.png"
                      alt="Sabin Raut"
                      className="relative w-48 h-48 rounded-full border-4 border-white dark:border-gray-800 shadow-2xl object-cover"
                    />
                  </div>
                </motion.div>

                {/* Name */}
                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-4"
                >
                  Sabin Raut
                </motion.h1>

                {/* Title */}
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="text-2xl md:text-3xl font-medium text-gray-600 dark:text-gray-300 mb-6"
                >
                  Software Developer & Data Engineer
                </motion.h2>

                {/* Professional Tagline */}
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="text-lg md:text-xl text-gray-700 dark:text-gray-400 mb-8 leading-relaxed"
                >
                  Building scalable systems and data-driven solutions that drive business value. 
                  Specialized in full-stack development, financial modeling, and process automation.
                </motion.p>

                {/* Status Indicators */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                  className="flex flex-wrap gap-4 mb-8"
                >
                  <div className="flex items-center gap-2 bg-white dark:bg-gray-700 px-4 py-2 rounded-full shadow-sm border border-gray-200 dark:border-gray-600">
                    <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                    <span className="text-sm text-gray-700 dark:text-gray-300 font-medium">Available for hire</span>
                  </div>
                  <div className="flex items-center gap-2 bg-white dark:bg-gray-700 px-4 py-2 rounded-full shadow-sm border border-gray-200 dark:border-gray-600">
                    <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                    <span className="text-sm text-gray-700 dark:text-gray-300 font-medium">Open to relocate</span>
                  </div>
                </motion.div>

                {/* Quick Action Buttons */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.7 }}
                  className="flex flex-wrap gap-4"
                >
                  <a
                    href="/images/resume-example.pdf"
                    download="Sabin_Raut_Resume.pdf"
                    className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-lg transition-all duration-200 transform hover:scale-105"
                  >
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H5a2 2 0 01-2-2V6a2 2 0 012-2h7l2 2h4a2 2 0 012 2v8a2 2 0 01-2 2z" />
                    </svg>
                    Download Resume
                  </a>
                  <a
                    href="https://github.com/sabin901"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-6 py-3 bg-gray-900 hover:bg-gray-800 text-white font-semibold rounded-lg shadow-lg transition-all duration-200 transform hover:scale-105"
                  >
                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                      <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                    </svg>
                    GitHub
                  </a>
                  <a
                    href="https://linkedin.com/in/sabin-raut"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-6 py-3 bg-blue-700 hover:bg-blue-800 text-white font-semibold rounded-lg shadow-lg transition-all duration-200 transform hover:scale-105"
                  >
                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                    LinkedIn
                  </a>
                </motion.div>
              </motion.div>

              {/* Right Side - Information Cards */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="space-y-6"
              >
                {/* Quick Stats */}
                <div className="grid grid-cols-3 gap-4">
                  {[
                    { value: '3+', label: 'Years Experience', icon: '💼' },
                    { value: '8+', label: 'Projects', icon: '🚀' },
                    { value: '50+', label: 'Students Mentored', icon: '👥' },
                  ].map((stat, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.7 + index * 0.1 }}
                      className="bg-white dark:bg-gray-700 rounded-xl p-6 text-center shadow-lg border border-gray-200 dark:border-gray-600"
                    >
                      <div className="text-2xl mb-2">{stat.icon}</div>
                      <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-1">{stat.value}</div>
                      <div className="text-xs text-gray-600 dark:text-gray-400 font-medium">{stat.label}</div>
                    </motion.div>
                  ))}
                </div>

                {/* Education Card */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 }}
                  className="bg-white dark:bg-gray-700 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-600"
                >
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                    <span className="text-2xl">🎓</span>
                    Education
                  </h3>
                  <p className="font-semibold text-gray-900 dark:text-white mb-1 text-lg">
                    St. Cloud State University
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                    B.S. Information Systems & Finance
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                    Expected Graduation: 2024
                  </p>
                  <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                    GPA: 3.8/4.0
                  </p>
                </motion.div>

                {/* Core Competencies */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.9 }}
                  className="bg-white dark:bg-gray-700 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-600"
                >
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                    <span className="text-2xl">💻</span>
                    Core Competencies
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {['Python', 'SQL', 'React', 'TypeScript', 'AWS', 'C#', 'Java', 'FastAPI', 'Financial Modeling', 'Data Analytics'].map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1.5 bg-gray-100 dark:bg-gray-600 border border-gray-200 dark:border-gray-500 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </motion.div>

                {/* Professional Highlights */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1 }}
                  className="bg-white dark:bg-gray-700 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-600"
                >
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                    <span className="text-2xl">⭐</span>
                    Key Highlights
                  </h3>
                  <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                    <li className="flex items-start gap-2">
                      <span className="text-blue-500 mt-0.5">✓</span>
                      <span>Led digital system redesign reducing conflicts by 40%</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-500 mt-0.5">✓</span>
                      <span>Built automation tools reducing manual effort by 30%</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-500 mt-0.5">✓</span>
                      <span>Mentored 50+ students in CS and finance</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-500 mt-0.5">✓</span>
                      <span>Cross-functional collaboration expertise</span>
                    </li>
                  </ul>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Bottom Section - Professional Summary */}
        <div className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 p-8">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-8"
            >
              {/* Professional Summary */}
              <div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                  <span className="text-2xl">👨‍💻</span>
                  Professional Summary
                </h3>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                  Hybrid Information Systems & Finance professional with <strong className="text-gray-900 dark:text-white">3+ years of experience</strong> designing and implementing data-driven systems, analytics solutions, and workflow automations. Proven track record of building tools that save time, reduce errors, and deliver measurable business impact.
                </p>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  Currently pursuing a dual degree in Information Systems and Finance, combining technical expertise with business acumen to solve complex problems at the intersection of technology and finance.
                </p>
              </div>

              {/* Value Proposition */}
              <div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                  <span className="text-2xl">🎯</span>
                  What I Bring
                </h3>
                <ul className="space-y-3 text-gray-700 dark:text-gray-300">
                  <li className="flex items-start gap-3">
                    <span className="text-blue-500 font-bold mt-0.5">→</span>
                    <span><strong>Technical Excellence:</strong> Full-stack development, database design, cloud infrastructure, and API development</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-blue-500 font-bold mt-0.5">→</span>
                    <span><strong>Business Acumen:</strong> Financial modeling, data analytics, KPI development, and process optimization</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-blue-500 font-bold mt-0.5">→</span>
                    <span><strong>Leadership:</strong> Cross-functional collaboration, mentorship, and stakeholder management</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-blue-500 font-bold mt-0.5">→</span>
                    <span><strong>Results-Driven:</strong> Focus on measurable impact, automation, and efficiency improvements</span>
                  </li>
                </ul>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};
