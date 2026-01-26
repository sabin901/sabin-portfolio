import { motion } from 'framer-motion';

export const ResumeWindow = () => {
  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = '/images/resume-example.pdf';
    link.download = 'Sabin_Raut_Resume.pdf';
    link.click();
  };

  return (
    <div className="h-full overflow-auto bg-white dark:bg-gray-800">
      <div className="max-w-4xl mx-auto p-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {/* Header */}
          <div className="mb-8">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-3">
              Resume
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Download my resume or view it online
            </p>
          </div>

          {/* Download Options */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-4 mb-12"
          >
            <button
              onClick={handleDownload}
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-semibold transition-all shadow-lg hover:shadow-xl"
              style={{
                boxShadow: '0 4px 12px rgba(37, 99, 235, 0.4)',
              }}
            >
              Download PDF Resume
            </button>
            <a
              href="https://linkedin.com/in/sabin-raut"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white dark:bg-gray-700 border-2 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white px-8 py-4 rounded-lg font-semibold hover:bg-gray-50 dark:hover:bg-gray-600 transition-all text-center"
            >
              View LinkedIn Profile
            </a>
          </motion.div>

          {/* Resume Preview Sections */}
          <div className="space-y-8">
            {/* Education */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-gray-50 dark:bg-gray-700 rounded-xl p-6"
            >
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <span>🎓</span>
                Education
              </h3>
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-1 text-lg">
                  St. Cloud State University
                </h4>
                <p className="text-gray-600 dark:text-gray-400 mb-2">
                  B.S. Information Systems & Finance • Expected 2024
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                  Relevant Coursework: Database Management, Financial Modeling, Data Analytics, Business Intelligence, Systems Integration, Corporate Finance
                </p>
                <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                  GPA: 3.8/4.0
                </p>
              </div>
            </motion.div>

            {/* Experience */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                <span>💼</span>
                Professional Experience
              </h3>
              <div className="space-y-6">
                {[
                  {
                    title: 'Library Operations Supervisor',
                    company: 'St. Cloud State University Library',
                    period: 'Jul 2023 – Present',
                    highlights: [
                      'Led digital scheduling system redesign, reducing staff scheduling conflicts by 40%',
                      'Built Python- and Excel-based automation tools, reducing manual effort by 30%',
                      'Partnered with IT stakeholders to integrate new digital systems',
                      'Supervised, trained, and evaluated 8+ student employees',
                    ],
                  },
                  {
                    title: 'Academic Success Mentor / Private Tutor',
                    company: 'St. Cloud State University Tutoring Services',
                    period: 'May 2022 – Present',
                    highlights: [
                      'Developed interactive learning tools using Python and Java, improving student comprehension by ~35%',
                      'Mentored 50+ students in computer science, quantitative methods, and financial analysis',
                      'Achieved an average 1.2 letter-grade improvement for mentees',
                    ],
                  },
                  {
                    title: 'Donor Ambassador',
                    company: 'American Red Cross',
                    period: 'Jun 2021 – Dec 2021',
                    highlights: [
                      'Supported data-driven digital outreach campaigns, increasing local blood drive participation by 25%',
                      'Contributed UX feedback during a pilot donor management system rollout',
                      'Applied basic analytics to refine outreach strategies, increasing campaign ROI by 20%',
                    ],
                  },
                ].map((exp, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                    className="bg-gray-50 dark:bg-gray-700 rounded-xl p-6 border-l-4 border-blue-500"
                  >
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-1 text-lg">{exp.title}</h4>
                    <p className="text-gray-600 dark:text-gray-400 mb-3">{exp.company} • {exp.period}</p>
                    <ul className="list-disc list-inside space-y-1 text-sm text-gray-700 dark:text-gray-300">
                      {exp.highlights.map((highlight, i) => (
                        <li key={i}>{highlight}</li>
                      ))}
                    </ul>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
