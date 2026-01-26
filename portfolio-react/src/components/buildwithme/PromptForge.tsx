import { useState } from 'react';
import { motion } from 'framer-motion';

interface Skill {
  name: string;
  proficiency: 'Expert' | 'Advanced' | 'Intermediate';
  category: 'Programming' | 'Data & Analytics' | 'Finance' | 'Tools & Platforms';
  yearsExperience?: number;
  projectsUsed?: number;
}

const skills: Skill[] = [
  // Programming
  { name: 'Python', proficiency: 'Expert', category: 'Programming', yearsExperience: 4, projectsUsed: 8 },
  { name: 'SQL', proficiency: 'Expert', category: 'Programming', yearsExperience: 5, projectsUsed: 10 },
  { name: 'TypeScript', proficiency: 'Advanced', category: 'Programming', yearsExperience: 2, projectsUsed: 4 },
  { name: 'JavaScript', proficiency: 'Advanced', category: 'Programming', yearsExperience: 3, projectsUsed: 6 },
  { name: 'React', proficiency: 'Advanced', category: 'Programming', yearsExperience: 2, projectsUsed: 4 },
  { name: 'C#', proficiency: 'Intermediate', category: 'Programming', yearsExperience: 3, projectsUsed: 3 },
  { name: 'Java', proficiency: 'Intermediate', category: 'Programming', yearsExperience: 2, projectsUsed: 2 },
  
  // Data & Analytics
  { name: 'Pandas', proficiency: 'Expert', category: 'Data & Analytics', yearsExperience: 4, projectsUsed: 7 },
  { name: 'NumPy', proficiency: 'Advanced', category: 'Data & Analytics', yearsExperience: 3, projectsUsed: 5 },
  { name: 'Data Analytics', proficiency: 'Expert', category: 'Data & Analytics', yearsExperience: 4, projectsUsed: 8 },
  { name: 'Tableau', proficiency: 'Intermediate', category: 'Data & Analytics', yearsExperience: 2, projectsUsed: 3 },
  
  // Finance
  { name: 'Financial Modeling', proficiency: 'Expert', category: 'Finance', yearsExperience: 4, projectsUsed: 5 },
  { name: 'Excel', proficiency: 'Expert', category: 'Finance', yearsExperience: 5, projectsUsed: 8 },
  { name: 'Forecasting', proficiency: 'Advanced', category: 'Finance', yearsExperience: 3, projectsUsed: 4 },
  { name: 'Risk Analysis', proficiency: 'Advanced', category: 'Finance', yearsExperience: 3, projectsUsed: 3 },
  { name: 'KPI Development', proficiency: 'Advanced', category: 'Finance', yearsExperience: 3, projectsUsed: 4 },
  
  // Tools & Platforms
  { name: 'Git', proficiency: 'Expert', category: 'Tools & Platforms', yearsExperience: 5, projectsUsed: 10 },
  { name: 'AWS', proficiency: 'Intermediate', category: 'Tools & Platforms', yearsExperience: 1, projectsUsed: 1 },
  { name: 'FastAPI', proficiency: 'Advanced', category: 'Tools & Platforms', yearsExperience: 1, projectsUsed: 2 },
  { name: 'Docker', proficiency: 'Intermediate', category: 'Tools & Platforms', yearsExperience: 1, projectsUsed: 1 },
];

const getProficiencyColor = (proficiency: string): string => {
  switch (proficiency) {
    case 'Expert': return 'from-emerald-500 to-green-600';
    case 'Advanced': return 'from-blue-500 to-cyan-600';
    case 'Intermediate': return 'from-amber-500 to-yellow-600';
    default: return 'from-gray-400 to-gray-500';
  }
};

const getProficiencyBadgeColor = (proficiency: string): string => {
  switch (proficiency) {
    case 'Expert': return 'bg-emerald-100 text-emerald-800 border-emerald-200';
    case 'Advanced': return 'bg-blue-100 text-blue-800 border-blue-200';
    case 'Intermediate': return 'bg-amber-100 text-amber-800 border-amber-200';
    default: return 'bg-gray-100 text-gray-800 border-gray-200';
  }
};

export const PromptForge = () => {
  const [selectedCategory, setSelectedCategory] = useState<Skill['category'] | 'All'>('All');

  const categories: Skill['category'][] = ['Programming', 'Data & Analytics', 'Finance', 'Tools & Platforms'];
  const filteredSkills = selectedCategory === 'All' 
    ? skills 
    : skills.filter(s => s.category === selectedCategory);

  const groupedSkills = filteredSkills.reduce((acc, skill) => {
    if (!acc[skill.proficiency]) {
      acc[skill.proficiency] = [];
    }
    acc[skill.proficiency].push(skill);
    return acc;
  }, {} as Record<string, Skill[]>);

  const expertCount = skills.filter(s => s.proficiency === 'Expert').length;
  const totalYears = skills.reduce((sum, s) => sum + (s.yearsExperience || 0), 0);
  const totalProjects = skills.reduce((sum, s) => sum + (s.projectsUsed || 0), 0);

  return (
    <div className="min-h-screen bg-white py-20 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-4 tracking-tight">
            Skills & Technologies
          </h2>
          <p className="text-xl text-gray-600 font-light max-w-2xl mx-auto leading-relaxed">
            A focused set of technologies I use to build impactful solutions
          </p>
        </motion.div>

        {/* Summary Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16"
        >
          <div className="bg-gradient-to-br from-emerald-50 to-green-50 border border-emerald-200 rounded-xl p-6 text-center">
            <div className="text-4xl font-black text-emerald-600 mb-2">{expertCount}</div>
            <div className="text-sm text-gray-600 font-medium">Expert Level Skills</div>
          </div>
          <div className="bg-gradient-to-br from-blue-50 to-cyan-50 border border-blue-200 rounded-xl p-6 text-center">
            <div className="text-4xl font-black text-blue-600 mb-2">{skills.length}</div>
            <div className="text-sm text-gray-600 font-medium">Total Skills</div>
          </div>
          <div className="bg-gradient-to-br from-purple-50 to-pink-50 border border-purple-200 rounded-xl p-6 text-center">
            <div className="text-4xl font-black text-purple-600 mb-2">{totalYears}+</div>
            <div className="text-sm text-gray-600 font-medium">Years Experience</div>
          </div>
          <div className="bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-200 rounded-xl p-6 text-center">
            <div className="text-4xl font-black text-amber-600 mb-2">{totalProjects}+</div>
            <div className="text-sm text-gray-600 font-medium">Projects Used</div>
          </div>
        </motion.div>

        {/* Category Filter */}
        <div className="flex gap-3 justify-center mb-12 flex-wrap">
          <button
            onClick={() => setSelectedCategory('All')}
            className={`px-6 py-3 rounded-xl font-semibold transition-all ${
              selectedCategory === 'All'
                ? 'bg-gray-900 text-white shadow-lg'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            All
          </button>
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-3 rounded-xl font-semibold transition-all ${
                selectedCategory === category
                  ? 'bg-gray-900 text-white shadow-lg'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Skills by Proficiency */}
        <div className="space-y-12">
          {(['Expert', 'Advanced', 'Intermediate'] as const).map((proficiency) => {
            const skillsInLevel = groupedSkills[proficiency] || [];
            if (skillsInLevel.length === 0) return null;

            return (
              <motion.div
                key={proficiency}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-gray-50 rounded-2xl p-8 border border-gray-200"
              >
                <div className="flex items-center gap-4 mb-8">
                  <div className={`w-3 h-12 bg-gradient-to-b ${getProficiencyColor(proficiency)} rounded-full shadow-md`}></div>
                  <div>
                    <h3 className="text-3xl font-bold text-gray-900">{proficiency}</h3>
                    <span className="text-gray-500 text-sm">({skillsInLevel.length} skills)</span>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {skillsInLevel.map((skill, index) => (
                    <motion.div
                      key={skill.name}
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.05 }}
                      whileHover={{ scale: 1.02, y: -2 }}
                      className="bg-white border border-gray-200 rounded-xl p-5 hover:border-gray-900 hover:shadow-lg transition-all group"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="font-bold text-gray-900 text-lg group-hover:text-blue-600 transition-colors">
                          {skill.name}
                        </div>
                        <span className={`px-2 py-1 rounded-lg text-xs font-semibold border ${getProficiencyBadgeColor(skill.proficiency)}`}>
                          {skill.proficiency}
                        </span>
                      </div>
                      <div className="text-xs text-gray-500 mb-2">{skill.category}</div>
                      <div className="flex gap-4 text-xs text-gray-600 mt-3 pt-3 border-t border-gray-100">
                        {skill.yearsExperience && (
                          <div>
                            <span className="font-semibold text-gray-900">{skill.yearsExperience}</span> years
                          </div>
                        )}
                        {skill.projectsUsed && (
                          <div>
                            <span className="font-semibold text-gray-900">{skill.projectsUsed}</span> projects
                          </div>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Education & Achievements */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 grid md:grid-cols-2 gap-8"
        >
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Education</h3>
            <div className="space-y-3">
              <div>
                <div className="font-semibold text-gray-900">St. Cloud State University</div>
                <div className="text-blue-600 font-medium">B.S. Information Systems & Finance</div>
                <div className="text-sm text-gray-600 mt-1">Expected Graduation: 2024</div>
                <div className="inline-block mt-2 px-4 py-2 bg-emerald-100 border border-emerald-200 text-emerald-800 rounded-lg font-bold text-sm">
                  GPA: 3.8/4.0
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-purple-50 to-pink-50 border border-purple-200 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Key Achievements</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <span className="text-emerald-600 mt-1">✓</span>
                <span className="text-gray-700">Led digital system redesign, reducing conflicts by 40%</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-emerald-600 mt-1">✓</span>
                <span className="text-gray-700">Built automation tools, reducing manual effort by 30%</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-emerald-600 mt-1">✓</span>
                <span className="text-gray-700">Mentored 50+ students with 1.2 letter-grade improvement</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-emerald-600 mt-1">✓</span>
                <span className="text-gray-700">Developed learning tools, improving comprehension by 35%</span>
              </li>
            </ul>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
