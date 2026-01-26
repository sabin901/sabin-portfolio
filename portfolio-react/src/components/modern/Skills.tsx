import { motion } from 'framer-motion';

export const Skills = () => {
  const technicalSkills = [
    { name: 'Python', level: 90 },
    { name: 'SQL', level: 90 },
    { name: 'React', level: 80 },
    { name: 'TypeScript', level: 80 },
    { name: 'C#', level: 75 },
    { name: 'Java', level: 70 },
    { name: 'AWS', level: 70 },
    { name: 'FastAPI', level: 70 },
  ];

  const financeSkills = [
    'Financial Modeling',
    'Forecasting',
    'Risk Analysis',
    'Excel',
    'Data Analytics',
    'Tableau',
    'KPI Development',
    'Budgeting',
  ];

  return (
    <section className="min-h-screen py-20 px-6 bg-gradient-to-b from-[#0a0a0a] to-[#1a1a1a]">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <h2 className="text-6xl md:text-7xl font-bold text-white mb-4">Skills & Expertise</h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Technical proficiency meets business acumen
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Technical Skills */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h3 className="text-3xl font-bold text-white mb-8">Technical Skills</h3>
            <div className="space-y-6">
              {technicalSkills.map((skill, index) => (
                <motion.div
                  key={skill.name}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-white font-semibold">{skill.name}</span>
                    <span className="text-gray-400 text-sm">{skill.level}%</span>
                  </div>
                  <div className="h-2 bg-[#1a1a1a] rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.level}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: index * 0.1 }}
                      className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Finance & Analytics */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h3 className="text-3xl font-bold text-white mb-8">Finance & Analytics</h3>
            <div className="grid grid-cols-2 gap-4">
              {financeSkills.map((skill, index) => (
                <motion.div
                  key={skill}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="p-4 bg-[#1a1a1a] border border-gray-800 rounded-xl text-center hover:border-blue-500/50 transition-colors"
                >
                  <span className="text-white font-medium">{skill}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
