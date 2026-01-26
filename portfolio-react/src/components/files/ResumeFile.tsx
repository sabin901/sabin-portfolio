import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

const code = `// resume.tsx
export interface Resume {
  personalInfo: {
    name: string;
    title: string;
    email: string;
    location: string;
    linkedin: string;
    github: string;
  };
  education: {
    degree: string;
    institution: string;
    year: string;
    coursework: string[];
  };
  experience: Experience[];
  skills: {
    technical: string[];
    finance: string[];
    professional: string[];
  };
}

interface Experience {
  title: string;
  company: string;
  period: string;
  achievements: string[];
  impact: Record<string, string>;
}

export const resume: Resume = {
  personalInfo: {
    name: "Sabin Raut",
    title: "Information Systems + Finance Professional",
    email: "sabinraut343@gmail.com",
    location: "St. Cloud, MN",
    linkedin: "linkedin.com/in/sabin-raut",
    github: "github.com/sabin901"
  },
  
  education: {
    degree: "Bachelor of Science - Dual Degree",
    institution: "St. Cloud State University",
    year: "2024",
    coursework: [
      "Database Management",
      "Financial Modeling",
      "Data Analytics",
      "Business Intelligence",
      "Systems Integration",
      "Corporate Finance"
    ]
  },
  
  experience: [
    {
      title: "Library Operations Supervisor",
      company: "St. Cloud State University Library",
      period: "Jul 2023 – Present",
      achievements: [
        "Led digital scheduling system redesign",
        "Built Python/Excel automation tools",
        "Partnered with IT for system integration",
        "Supervised 8+ student employees"
      ],
      impact: {
        "Conflict Reduction": "40%",
        "Manual Effort Reduction": "30%",
        "Team Size": "8+ employees"
      }
    },
    {
      title: "Academic Success Mentor",
      company: "St. Cloud State University",
      period: "May 2022 – Present",
      achievements: [
        "Developed interactive learning tools",
        "Mentored 50+ students in STEM courses",
        "Created personalized study plans"
      ],
      impact: {
        "Comprehension Improvement": "~35%",
        "Students Mentored": "50+",
        "Grade Improvement": "1.2 letter-grade average"
      }
    }
  ],
  
  skills: {
    technical: [
      "Python", "SQL", "JavaScript", "TypeScript",
      "React", "C#", "Java", "FastAPI", ".NET",
      "AWS", "Docker", "Git", "Jenkins"
    ],
    finance: [
      "Financial Modeling", "Forecasting",
      "Risk Analysis", "KPI Development",
      "Budgeting", "Excel", "SQL Analytics"
    ],
    professional: [
      "Cross-functional Collaboration",
      "Technical Communication",
      "Mentorship", "Process Optimization",
      "Data-driven Decision-making"
    ]
  }
};`;

export const ResumeFile = () => {
  return (
    <SyntaxHighlighter
      language="typescript"
      style={vscDarkPlus}
      customStyle={{
        margin: 0,
        padding: '1rem',
        background: '#1e1e1e',
        fontSize: '14px',
        lineHeight: '1.6'
      }}
      showLineNumbers
    >
      {code}
    </SyntaxHighlighter>
  );
};
