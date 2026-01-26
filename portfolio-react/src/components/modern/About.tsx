import { motion } from 'framer-motion';

export const About = () => {
  const stats = [
    { value: '3+', label: 'Years Experience', icon: '💼' },
    { value: '8+', label: 'Projects', icon: '🚀' },
    { value: '50+', label: 'Students Mentored', icon: '👥' },
    { value: '3.8', label: 'GPA', icon: '🎓' },
  ];

  const achievements = [
    'Led digital scheduling system redesign, reducing conflicts by 40%',
    'Built automation tools reducing manual effort by 30%',
    'Mentored 50+ students in computer science and finance',
    'Developed interactive learning tools improving comprehension by 35%',
  ];

  return (
    <section className="min-h-screen py-20 px-6 bg-gradient-to-b from-[#1a1a1a] to-[#0a0a0a]">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <h2 className="text-6xl md:text-7xl font-bold text-white mb-4">About Me</h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Hybrid Information Systems & Finance professional with a passion for building impactful solutions
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Left Column */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div>
              <h3 className="text-3xl font-bold text-white mb-4">Background</h3>
              <p className="text-gray-300 text-lg leading-relaxed mb-4">
                Currently pursuing a dual degree in Information Systems and Finance at St. Cloud State University, 
                combining technical expertise with business acumen to solve complex problems at the intersection 
                of technology and finance.
              </p>
              <p className="text-gray-300 leading-relaxed">
                With <strong className="text-white">3+ years of experience</strong> designing and implementing 
                data-driven systems, I focus on creating solutions that are not just functional, but truly impactful.
              </p>
            </div>

            <div>
              <h3 className="text-3xl font-bold text-white mb-4">Education</h3>
              <div className="bg-[#1a1a1a] border border-gray-800 rounded-xl p-6">
                <div className="text-xl font-bold text-white mb-2">St. Cloud State University</div>
                <div className="text-blue-400 mb-2">B.S. Information Systems & Finance</div>
                <div className="text-gray-400 text-sm mb-4">Expected Graduation: 2024</div>
                <div className="text-white font-semibold">GPA: 3.8/4.0</div>
              </div>
            </div>
          </motion.div>

          {/* Right Column */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            {/* Stats */}
            <div>
              <h3 className="text-3xl font-bold text-white mb-6">By The Numbers</h3>
              <div className="grid grid-cols-2 gap-4">
                {stats.map((stat, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-[#1a1a1a] border border-gray-800 rounded-xl p-6 text-center"
                  >
                    <div className="text-4xl mb-2">{stat.icon}</div>
                    <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
                    <div className="text-sm text-gray-400">{stat.label}</div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Achievements */}
            <div>
              <h3 className="text-3xl font-bold text-white mb-4">Key Achievements</h3>
              <ul className="space-y-3">
                {achievements.map((achievement, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-start gap-3 text-gray-300"
                  >
                    <span className="text-blue-400 mt-1">✓</span>
                    <span>{achievement}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
