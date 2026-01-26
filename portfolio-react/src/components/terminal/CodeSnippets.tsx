import { motion } from 'framer-motion';
import { useState } from 'react';

interface CodeSnippet {
  title: string;
  language: string;
  code: string;
  description: string;
}

const codeSnippets: CodeSnippet[] = [
  {
    title: 'Data Pipeline Automation',
    language: 'python',
    description: 'Automated financial data processing with error handling',
    code: `def process_financial_data(file_path):
    """
    Process financial data with validation and error handling
    """
    try:
        df = pd.read_excel(file_path)
        
        # Data validation
        df = df.dropna(subset=['amount', 'date'])
        df['amount'] = pd.to_numeric(df['amount'], errors='coerce')
        
        # Calculate metrics
        total = df['amount'].sum()
        avg = df['amount'].mean()
        
        # Generate report
        report = {
            'total': total,
            'average': avg,
            'records': len(df)
        }
        
        return report
    except Exception as e:
        logger.error(f"Error processing data: {e}")
        return None`,
  },
  {
    title: 'React Component with TypeScript',
    language: 'typescript',
    description: 'Reusable component with proper typing',
    code: `interface ProjectCardProps {
  title: string;
  description: string;
  technologies: string[];
  onView: () => void;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
  title,
  description,
  technologies,
  onView,
}) => {
  return (
    <div className="project-card">
      <h3>{title}</h3>
      <p>{description}</p>
      <div className="tech-stack">
        {technologies.map(tech => (
          <span key={tech}>{tech}</span>
        ))}
      </div>
      <button onClick={onView}>View Details</button>
    </div>
  );
};`,
  },
  {
    title: 'SQL Query Optimization',
    language: 'sql',
    description: 'Optimized query with proper indexing',
    code: `-- Optimized query for job application tracking
SELECT 
    a.id,
    a.company_name,
    a.position,
    a.status,
    a.applied_date,
    COUNT(i.id) as interview_count
FROM applications a
LEFT JOIN interviews i ON a.id = i.application_id
WHERE a.user_id = ?
    AND a.status IN ('applied', 'interview', 'offer')
GROUP BY a.id
ORDER BY a.applied_date DESC
LIMIT 50;`,
  },
];

export const CodeSnippets = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [copied, setCopied] = useState(false);

  const copyToClipboard = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Tabs */}
      <div className="flex gap-2 border-b border-[#30363d]">
        {codeSnippets.map((snippet, index) => (
          <button
            key={index}
            onClick={() => setSelectedIndex(index)}
            className={`px-6 py-3 font-semibold transition-all ${
              selectedIndex === index
                ? 'text-[#58a6ff] border-b-2 border-[#58a6ff]'
                : 'text-[#8b949e] hover:text-[#c9d1d9]'
            }`}
          >
            {snippet.title}
          </button>
        ))}
      </div>

      {/* Code Display */}
      <motion.div
        key={selectedIndex}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-[#0d1117] border-2 border-[#30363d] rounded-xl overflow-hidden"
      >
        {/* Code Header */}
        <div className="bg-[#161b22] border-b border-[#30363d] px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-[#ff5f56]"></div>
              <div className="w-3 h-3 rounded-full bg-[#ffbd2e]"></div>
              <div className="w-3 h-3 rounded-full bg-[#27c93f]"></div>
            </div>
            <span className="text-[#8b949e] text-sm font-mono">{codeSnippets[selectedIndex].language}</span>
          </div>
          <button
            onClick={() => copyToClipboard(codeSnippets[selectedIndex].code)}
            className="px-4 py-2 bg-[#238636] hover:bg-[#2ea043] text-white rounded-lg text-sm font-semibold transition-colors"
          >
            {copied ? '✓ Copied!' : 'Copy'}
          </button>
        </div>

        {/* Code Content */}
        <div className="p-6">
          <p className="text-[#8b949e] mb-4 text-sm">{codeSnippets[selectedIndex].description}</p>
          <pre className="text-[#c9d1d9] font-mono text-sm overflow-x-auto">
            <code>{codeSnippets[selectedIndex].code}</code>
          </pre>
        </div>
      </motion.div>
    </div>
  );
};
