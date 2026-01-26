import { motion } from 'framer-motion';

const codeExamples = [
  {
    title: "SQL Database Design",
    description: "Efficient schema design with proper relationships",
    language: "sql",
    code: `-- Application Manager Database Schema
CREATE TABLE Applications (
    id INT PRIMARY KEY AUTO_INCREMENT,
    company_name VARCHAR(255) NOT NULL,
    position_title VARCHAR(255) NOT NULL,
    application_date DATE NOT NULL,
    status ENUM('Applied', 'Interview', 'Offer', 'Rejected'),
    deadline DATE,
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_status ON Applications(status);
CREATE INDEX idx_deadline ON Applications(deadline);`,
  },
  {
    title: "Python Data Analysis",
    description: "Financial data processing and analysis",
    language: "python",
    code: `import pandas as pd
import numpy as np

def analyze_financial_data(df):
    """Analyze financial metrics and generate insights"""
    # Calculate key financial ratios
    df['profit_margin'] = df['net_income'] / df['revenue']
    df['roi'] = (df['revenue'] - df['cost']) / df['cost']
    
    # Identify trends
    df['revenue_growth'] = df['revenue'].pct_change()
    
    return df.describe(), df[df['profit_margin'] > 0.15]`,
  },
  {
    title: "React Component",
    description: "Reusable, type-safe React components",
    language: "typescript",
    code: `interface ProjectCardProps {
  project: Project;
  onViewCaseStudy: (id: string) => void;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ 
  project, 
  onViewCaseStudy 
}) => {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="bg-white dark:bg-gray-800 rounded-lg p-6"
    >
      <h3>{project.title}</h3>
      <button onClick={() => onViewCaseStudy(project.id)}>
        View Case Study
      </button>
    </motion.div>
  );
};`,
  },
];

export const CodeShowcase = () => {
  return (
    <section className="py-20 bg-white dark:bg-gray-900 transition-colors duration-300 border-t border-gray-200 dark:border-gray-800">
      <div className="w-11/12 md:w-12/12 lg:w-9/12 mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-3">
            Code Quality Showcase
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Clean, efficient, and maintainable code examples
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {codeExamples.map((example, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden hover:border-gray-300 dark:hover:border-gray-600 transition-all"
            >
              <div className="bg-gray-100 dark:bg-gray-700 px-4 py-3 border-b border-gray-200 dark:border-gray-600">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-gray-600 dark:text-gray-400">{example.language}</span>
                  <div className="flex gap-1.5">
                    <div className="w-2 h-2 rounded-full bg-gray-400"></div>
                    <div className="w-2 h-2 rounded-full bg-gray-400"></div>
                    <div className="w-2 h-2 rounded-full bg-gray-400"></div>
                  </div>
                </div>
              </div>
              
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">{example.title}</h3>
                <p className="text-xs text-gray-600 dark:text-gray-400 mb-3">{example.description}</p>
                <pre className="text-xs text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-900 p-3 rounded overflow-x-auto font-mono border border-gray-200 dark:border-gray-700">
                  <code>{example.code}</code>
                </pre>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-12 text-center"
        >
          <a
            href="https://github.com/sabin901"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-gray-900 dark:bg-white text-white dark:text-gray-900 px-6 py-3 rounded-lg font-medium hover:bg-gray-800 dark:hover:bg-gray-100 transition-all"
          >
            View GitHub Profile
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  );
};
