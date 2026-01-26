import { motion } from 'framer-motion';
import { useState } from 'react';

const technicalSkills = [
  { name: 'Python', icon: '/images/skills/python.svg' },
  { name: 'SQL', icon: '/images/skills/sql.svg' },
  { name: 'JavaScript', icon: '/images/skills/javascript.svg' },
  { name: 'TypeScript', icon: '/images/skills/javascript.svg' },
  { name: 'React', icon: '/images/skills/react.svg' },
  { name: 'C#', icon: '/images/skills/java.svg' },
  { name: 'Java', icon: '/images/skills/java.svg' },
  { name: 'FastAPI', icon: '/images/skills/fastapi.png' },
  { name: 'AWS', icon: '/images/skills/aws.png' },
  { name: 'Docker', icon: '/images/skills/docker.png' },
  { name: 'Git', icon: '/images/skills/git.png' },
  { name: 'Pandas', icon: '/images/skills/pandas.png' },
  { name: 'NumPy', icon: '/images/skills/Numpy.png' },
  { name: 'Tableau', icon: '/images/skills/tableau.png' },
];

const financeSkills = [
  { name: 'Financial Modeling', icon: '/images/skills/Financial-modeling.png' },
  { name: 'Data Analysis', icon: '/images/skills/pandas.png' },
  { name: 'Forecasting', icon: '/images/skills/forecasting.png' },
  { name: 'Excel', icon: '/images/skills/excel.png' },
  { name: 'Risk Analysis', icon: '/images/skills/regression.png' },
  { name: 'KPI Development', icon: '/images/skills/tableau.png' },
];

export const Skills = () => {
  const [activeTab, setActiveTab] = useState<'technical' | 'finance'>('technical');

  const currentSkills = activeTab === 'technical' ? technicalSkills : financeSkills;

  return (
    <section id="skills" className="py-20 bg-gray-50 dark:bg-gray-800 transition-colors duration-300">
      <div className="w-11/12 md:w-12/12 lg:w-9/12 mx-auto lg:ml-80 max-w-5xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Skills & Technologies
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Technologies I work with and skills I bring to projects
          </p>
        </motion.div>

        {/* Category Tabs */}
        <div className="flex gap-4 mb-8">
          {[
            { id: 'technical', label: 'Technical' },
            { id: 'finance', label: 'Finance & Analytics' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-6 py-3 rounded-lg font-medium transition-all ${
                activeTab === tab.id
                  ? 'bg-gray-900 dark:bg-white text-white dark:text-gray-900'
                  : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Skills Grid */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6"
        >
          {currentSkills.map((skill, index) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.03 }}
              whileHover={{ scale: 1.05, y: -5 }}
              className="flex flex-col items-center p-6 bg-white dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600 hover:shadow-lg transition-all cursor-pointer group"
            >
              <img
                src={skill.icon}
                alt={skill.name}
                className="w-16 h-16 mb-3 group-hover:scale-110 transition-transform"
                loading="lazy"
              />
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white text-center">
                {skill.name}
              </h3>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
