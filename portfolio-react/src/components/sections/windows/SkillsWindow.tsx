import { useState } from 'react';
import { motion } from 'framer-motion';

const technicalSkills = [
  { name: 'Python', icon: '/images/skills/python.svg', level: 'Expert', years: '3+' },
  { name: 'SQL', icon: '/images/skills/sql.svg', level: 'Expert', years: '3+' },
  { name: 'JavaScript', icon: '/images/skills/javascript.svg', level: 'Advanced', years: '2+' },
  { name: 'TypeScript', icon: '/images/skills/javascript.svg', level: 'Advanced', years: '2+' },
  { name: 'React', icon: '/images/skills/react.svg', level: 'Advanced', years: '2+' },
  { name: 'C#', icon: '/images/skills/java.svg', level: 'Advanced', years: '2+' },
  { name: 'Java', icon: '/images/skills/java.svg', level: 'Intermediate', years: '1+' },
  { name: 'FastAPI', icon: '/images/skills/fastapi.png', level: 'Intermediate', years: '1+' },
  { name: 'AWS', icon: '/images/skills/aws.png', level: 'Intermediate', years: '1+' },
  { name: 'Docker', icon: '/images/skills/docker.png', level: 'Intermediate', years: '1+' },
  { name: 'Git', icon: '/images/skills/git.png', level: 'Advanced', years: '3+' },
  { name: 'Pandas', icon: '/images/skills/pandas.png', level: 'Advanced', years: '2+' },
  { name: 'NumPy', icon: '/images/skills/Numpy.png', level: 'Advanced', years: '2+' },
  { name: 'Tableau', icon: '/images/skills/tableau.png', level: 'Intermediate', years: '1+' },
];

const financeSkills = [
  { name: 'Financial Modeling', icon: '/images/skills/Financial-modeling.png', level: 'Advanced', years: '2+' },
  { name: 'Data Analysis', icon: '/images/skills/pandas.png', level: 'Advanced', years: '3+' },
  { name: 'Forecasting', icon: '/images/skills/forecasting.png', level: 'Advanced', years: '2+' },
  { name: 'Excel', icon: '/images/skills/excel.png', level: 'Expert', years: '3+' },
  { name: 'Risk Analysis', icon: '/images/skills/regression.png', level: 'Intermediate', years: '1+' },
  { name: 'KPI Development', icon: '/images/skills/tableau.png', level: 'Advanced', years: '2+' },
];

const getLevelColor = (level: string) => {
  switch (level) {
    case 'Expert':
      return { bg: 'bg-green-100 dark:bg-green-900/20', text: 'text-green-700 dark:text-green-300', border: 'border-green-500' };
    case 'Advanced':
      return { bg: 'bg-blue-100 dark:bg-blue-900/20', text: 'text-blue-700 dark:text-blue-300', border: 'border-blue-500' };
    case 'Intermediate':
      return { bg: 'bg-yellow-100 dark:bg-yellow-900/20', text: 'text-yellow-700 dark:text-yellow-300', border: 'border-yellow-500' };
    default:
      return { bg: 'bg-gray-100 dark:bg-gray-700', text: 'text-gray-700 dark:text-gray-300', border: 'border-gray-400' };
  }
};

export const SkillsWindow = () => {
  const [activeTab, setActiveTab] = useState<'technical' | 'finance'>('technical');
  const currentSkills = activeTab === 'technical' ? technicalSkills : financeSkills;

  return (
    <div className="h-full w-full bg-white dark:bg-gray-800">
      <div className="h-full flex flex-col">
        {/* Header Section */}
        <div className="bg-gradient-to-r from-blue-50 to-green-50 dark:from-gray-800 dark:to-gray-900 p-8 border-b border-gray-200 dark:border-gray-700">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
                Skills & Technologies
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400">
                Technologies I work with and skills I bring to projects
              </p>
            </motion.div>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-auto p-8">
          <div className="max-w-6xl mx-auto">
            {/* Category Tabs - macOS Segmented Control */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="mb-10"
            >
              <div className="inline-flex bg-gray-100 dark:bg-gray-700 rounded-lg p-1 gap-1">
                {[
                  { id: 'technical', label: 'Technical' },
                  { id: 'finance', label: 'Finance & Analytics' },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`px-6 py-2.5 rounded-md text-sm font-semibold transition-all ${
                      activeTab === tab.id
                        ? 'bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow-sm'
                        : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </motion.div>

            {/* Skills Grid */}
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6"
            >
              {currentSkills.map((skill, index) => {
                const levelColors = getLevelColor(skill.level);
                return (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.03 }}
                    whileHover={{ scale: 1.05, y: -5 }}
                    className="flex flex-col items-center p-6 bg-white dark:bg-gray-700 border-2 border-gray-200 dark:border-gray-600 rounded-2xl hover:shadow-xl transition-all cursor-pointer group"
                    style={{
                      borderColor: levelColors.border + '40',
                    }}
                  >
                    {/* Icon */}
                    <div className="relative mb-4">
                      <div className={`w-20 h-20 flex items-center justify-center rounded-2xl ${levelColors.bg} border-2`} style={{ borderColor: levelColors.border + '30' }}>
                        <img
                          src={skill.icon}
                          alt={skill.name}
                          className="w-12 h-12 group-hover:scale-110 transition-transform"
                          loading="lazy"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48"><rect width="48" height="48" fill="%23ccc"/></svg>';
                          }}
                        />
                      </div>
                    </div>

                    {/* Name */}
                    <h3 className="text-sm font-bold text-gray-900 dark:text-white text-center mb-2">
                      {skill.name}
                    </h3>

                    {/* Level Badge */}
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold mb-1 ${levelColors.bg} ${levelColors.text}`}>
                      {skill.level}
                    </span>

                    {/* Years */}
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      {skill.years} years
                    </span>
                  </motion.div>
                );
              })}
            </motion.div>

            {/* Legend */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700"
            >
              <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-4">Proficiency Levels:</p>
              <div className="flex flex-wrap gap-6">
                {[
                  { level: 'Expert', color: 'bg-green-500', bg: 'bg-green-100 dark:bg-green-900/20', text: 'text-green-700 dark:text-green-300' },
                  { level: 'Advanced', color: 'bg-blue-500', bg: 'bg-blue-100 dark:bg-blue-900/20', text: 'text-blue-700 dark:text-blue-300' },
                  { level: 'Intermediate', color: 'bg-yellow-500', bg: 'bg-yellow-100 dark:bg-yellow-900/20', text: 'text-yellow-700 dark:text-yellow-300' },
                ].map((item) => (
                  <div key={item.level} className="flex items-center gap-3">
                    <div className={`w-4 h-4 rounded-full ${item.color}`} />
                    <span className={`text-sm font-medium px-3 py-1 rounded-full ${item.bg} ${item.text}`}>{item.level}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};
