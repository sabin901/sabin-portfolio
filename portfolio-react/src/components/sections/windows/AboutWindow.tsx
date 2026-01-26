import { motion } from 'framer-motion';

export const AboutWindow = () => {
  return (
    <div className="h-full w-full bg-white dark:bg-gray-800">
      <div className="h-full flex flex-col">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-purple-50 via-pink-50 to-blue-50 dark:from-gray-800 dark:via-gray-900 dark:to-gray-800 p-12 border-b border-gray-200 dark:border-gray-700">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col md:flex-row gap-8 items-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
              >
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-2xl blur-xl opacity-30" />
                  <img
                    src="/images/profile-pic.png"
                    alt="Sabin Raut"
                    className="relative w-48 h-48 rounded-2xl border-4 border-white dark:border-gray-800 shadow-2xl object-cover"
                  />
                </div>
              </motion.div>

              <div className="flex-1 text-center md:text-left">
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4"
                >
                  About Me
                </motion.h2>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="text-xl text-gray-600 dark:text-gray-400 mb-4"
                >
                  Sabin Raut
                </motion.p>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="text-lg text-gray-700 dark:text-gray-300"
                >
                  Software Developer & Data Engineer
                </motion.p>
              </div>
            </div>
          </div>
        </div>

        {/* Content Sections */}
        <div className="flex-1 overflow-auto p-12">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Left Column */}
              <div className="space-y-8">
                {/* Professional Background */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="bg-gray-50 dark:bg-gray-700 rounded-2xl p-8"
                >
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-3">
                    <span className="text-3xl">💼</span>
                    Professional Background
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-lg mb-4">
                    I'm a hybrid Information Systems & Finance professional with <strong className="text-gray-900 dark:text-white">3+ years of hands-on experience</strong> designing and implementing data-driven systems, analytics solutions, and workflow automations. My work focuses on building tools that save time, reduce errors, and deliver measurable business impact.
                  </p>
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                    Currently pursuing a dual degree in Information Systems and Finance at St. Cloud State University, I combine technical expertise with business acumen to solve complex problems at the intersection of technology and finance.
                  </p>
                </motion.div>

                {/* Education */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="bg-gray-50 dark:bg-gray-700 rounded-2xl p-8"
                >
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-3">
                    <span className="text-3xl">🎓</span>
                    Education
                  </h3>
                  <div>
                    <h4 className="font-bold text-gray-900 dark:text-white mb-2 text-xl">
                      St. Cloud State University
                    </h4>
                    <p className="text-gray-600 dark:text-gray-400 mb-3 text-lg">
                      B.S. Information Systems & Finance • Expected Graduation: 2024
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
                      <strong>Relevant Coursework:</strong> Database Management, Financial Modeling, Data Analytics, Business Intelligence, Systems Integration, Corporate Finance, Data Structures & Algorithms
                    </p>
                    <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                      <strong>GPA:</strong> 3.8/4.0
                    </p>
                  </div>
                </motion.div>

                {/* Core Philosophy */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="bg-gray-50 dark:bg-gray-700 rounded-2xl p-8"
                >
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-3">
                    <span className="text-3xl">💡</span>
                    Core Philosophy
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-lg">
                    I believe the best solutions emerge at the intersection of technical feasibility and business value. My approach involves deeply understanding user needs, iterating rapidly, and focusing on measurable impact. I thrive in environments where I can continuously learn and contribute to meaningful projects that solve real-world problems.
                  </p>
                </motion.div>
              </div>

              {/* Right Column */}
              <div className="space-y-8">
                {/* Key Achievements */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="bg-gray-50 dark:bg-gray-700 rounded-2xl p-8"
                >
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-3">
                    <span className="text-3xl">🏆</span>
                    Key Achievements
                  </h3>
                  <ul className="space-y-3 text-gray-700 dark:text-gray-300">
                    <li className="flex items-start gap-3">
                      <span className="text-blue-500 font-bold mt-0.5">→</span>
                      <span>Led digital scheduling system redesign, <strong>reducing staff conflicts by 40%</strong></span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-blue-500 font-bold mt-0.5">→</span>
                      <span>Built Python automation tools, <strong>reducing manual effort by 30%</strong></span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-blue-500 font-bold mt-0.5">→</span>
                      <span>Mentored <strong>50+ students</strong> in computer science and finance</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-blue-500 font-bold mt-0.5">→</span>
                      <span>Developed interactive learning tools improving <strong>student comprehension by 35%</strong></span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-blue-500 font-bold mt-0.5">→</span>
                      <span>Contributed to data-driven campaigns increasing <strong>ROI by 20%</strong></span>
                    </li>
                  </ul>
                </motion.div>

                {/* Technical Expertise */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 }}
                  className="bg-gray-50 dark:bg-gray-700 rounded-2xl p-8"
                >
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-3">
                    <span className="text-3xl">🛠️</span>
                    Technical Expertise
                  </h3>
                  <div className="space-y-3">
                    <div>
                      <p className="font-semibold text-gray-900 dark:text-white mb-1">Full-Stack Development</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">React, TypeScript, C#, Java, FastAPI, Node.js</p>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 dark:text-white mb-1">Data Engineering</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Python, SQL, Pandas, NumPy, Data Analytics</p>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 dark:text-white mb-1">Cloud & Infrastructure</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">AWS, Docker, Git, CI/CD</p>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 dark:text-white mb-1">Financial Analysis</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Financial Modeling, Forecasting, Risk Analysis, Excel</p>
                    </div>
                  </div>
                </motion.div>

                {/* Interests */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 }}
                  className="bg-gray-50 dark:bg-gray-700 rounded-2xl p-8"
                >
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-3">
                    <span className="text-3xl">🌱</span>
                    Beyond the Code
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-lg mb-3">
                    Outside of building systems, I enjoy exploring new technologies, reading non-fiction (especially on philosophy and economics), hiking, and playing chess. These activities fuel my curiosity and provide fresh perspectives that often inform my problem-solving approach in tech.
                  </p>
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                    I'm passionate about continuous learning and believe that the best developers are those who understand both the technical and human sides of problems.
                  </p>
                </motion.div>

                {/* Quick Stats */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.9 }}
                  className="bg-gray-50 dark:bg-gray-700 rounded-2xl p-8"
                >
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3">
                    <span className="text-3xl">📊</span>
                    Quick Stats
                  </h3>
                  <div className="grid grid-cols-3 gap-4">
                    {[
                      { label: 'Years', value: '3+' },
                      { label: 'Projects', value: '8+' },
                      { label: 'Mentored', value: '50+' },
                    ].map((stat, index) => (
                      <div
                        key={index}
                        className="text-center bg-white dark:bg-gray-800 rounded-xl p-4"
                      >
                        <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-1">{stat.value}</div>
                        <div className="text-xs text-gray-600 dark:text-gray-400">{stat.label}</div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
