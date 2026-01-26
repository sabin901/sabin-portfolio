import { motion } from 'framer-motion';

interface Experience {
  role: string;
  company: string;
  period: string;
  achievements: string[];
  icon: string;
}

const experiences: Experience[] = [
  {
    role: 'Library Operations Supervisor',
    company: 'St. Cloud State University Library',
    period: 'Jul 2023 - Present',
    icon: '💼',
    achievements: [
      'Led digital scheduling system redesign, reducing staff scheduling conflicts by 40%',
      'Built Python- and Excel-based automation tools, reducing manual effort by 30%',
      'Partnered with IT stakeholders to integrate new digital systems',
      'Supervised, trained, and evaluated 8+ student employees',
    ],
  },
  {
    role: 'Academic Success Mentor / Private Tutor',
    company: 'St. Cloud State University Tutoring Services',
    period: 'May 2022 - Present',
    icon: '👨‍🏫',
    achievements: [
      'Developed interactive learning tools using Python and Java, improving student comprehension by ~35%',
      'Mentored 50+ students in computer science, quantitative methods, and financial analysis',
      'Achieved an average 1.2 letter-grade improvement for mentees',
    ],
  },
  {
    role: 'Donor Ambassador',
    company: 'American Red Cross',
    period: 'Jun 2021 - Dec 2021',
    icon: '❤️',
    achievements: [
      'Supported data-driven digital outreach campaigns, increasing local blood drive participation by 25%',
      'Contributed UX feedback during a pilot donor management system rollout',
      'Applied basic analytics to refine outreach strategies, increasing campaign ROI by 20%',
    ],
  },
];

export const ExperienceTimeline = () => {
  return (
    <div className="relative">
      {/* Timeline Line */}
      <div className="absolute left-8 top-0 bottom-0 w-1 bg-gradient-to-b from-[#58a6ff] via-[#3fb950] to-[#79c0ff]"></div>

      <div className="space-y-12">
        {experiences.map((exp, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.2 }}
            className="relative pl-20"
          >
            {/* Timeline Dot */}
            <div className="absolute left-6 w-5 h-5 bg-[#3fb950] rounded-full border-4 border-[#0d1117] shadow-lg"></div>

            {/* Content Card */}
            <div className="bg-gradient-to-br from-[#161b22] to-[#0d1117] border-2 border-[#30363d] rounded-xl p-8 hover:border-[#58a6ff] transition-all shadow-xl">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-start gap-4">
                  <div className="text-4xl">{exp.icon}</div>
                  <div>
                    <h3 className="text-2xl font-bold text-[#c9d1d9] mb-1">{exp.role}</h3>
                    <div className="text-[#58a6ff] text-lg font-semibold">{exp.company}</div>
                  </div>
                </div>
                <div className="text-[#8b949e] text-sm font-mono bg-[#0d1117] px-3 py-1 rounded-lg border border-[#30363d]">
                  {exp.period}
                </div>
              </div>

              <ul className="space-y-2 mt-6">
                {exp.achievements.map((achievement, i) => (
                  <li key={i} className="flex items-start gap-3 text-[#c9d1d9]">
                    <span className="text-[#3fb950] mt-1">✓</span>
                    <span>{achievement}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
