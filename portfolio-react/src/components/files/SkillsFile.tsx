import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

const code = `// skills.tsx
export interface Skill {
  name: string;
  category: 'technical' | 'finance' | 'professional';
  proficiency: 'Expert' | 'Advanced' | 'Intermediate' | 'Learning';
  yearsExperience: number;
  projectsUsed: number;
}

export const technicalSkills: Skill[] = [
  { name: "Python", category: "technical", proficiency: "Expert", yearsExperience: 4, projectsUsed: 8 },
  { name: "SQL", category: "technical", proficiency: "Expert", yearsExperience: 5, projectsUsed: 10 },
  { name: "JavaScript", category: "technical", proficiency: "Advanced", yearsExperience: 3, projectsUsed: 6 },
  { name: "TypeScript", category: "technical", proficiency: "Advanced", yearsExperience: 2, projectsUsed: 4 },
  { name: "React", category: "technical", proficiency: "Advanced", yearsExperience: 2, projectsUsed: 4 },
  { name: "C#", category: "technical", proficiency: "Intermediate", yearsExperience: 3, projectsUsed: 3 },
  { name: "Java", category: "technical", proficiency: "Intermediate", yearsExperience: 2, projectsUsed: 2 },
  { name: "FastAPI", category: "technical", proficiency: "Advanced", yearsExperience: 1, projectsUsed: 2 },
  { name: "AWS", category: "technical", proficiency: "Intermediate", yearsExperience: 1, projectsUsed: 1 },
  { name: "Docker", category: "technical", proficiency: "Intermediate", yearsExperience: 1, projectsUsed: 1 },
  { name: "Git", category: "technical", proficiency: "Expert", yearsExperience: 5, projectsUsed: 10 },
  { name: "Pandas", category: "technical", proficiency: "Expert", yearsExperience: 4, projectsUsed: 7 },
  { name: "NumPy", category: "technical", proficiency: "Advanced", yearsExperience: 3, projectsUsed: 5 },
  { name: "Tableau", category: "technical", proficiency: "Intermediate", yearsExperience: 2, projectsUsed: 3 },
];

export const financeSkills: Skill[] = [
  { name: "Financial Modeling", category: "finance", proficiency: "Expert", yearsExperience: 4, projectsUsed: 5 },
  { name: "Forecasting", category: "finance", proficiency: "Advanced", yearsExperience: 3, projectsUsed: 4 },
  { name: "Risk Analysis", category: "finance", proficiency: "Advanced", yearsExperience: 3, projectsUsed: 3 },
  { name: "KPI Development", category: "finance", proficiency: "Advanced", yearsExperience: 3, projectsUsed: 4 },
  { name: "Budgeting", category: "finance", proficiency: "Advanced", yearsExperience: 4, projectsUsed: 3 },
  { name: "Excel", category: "finance", proficiency: "Expert", yearsExperience: 5, projectsUsed: 8 },
];

export const professionalSkills: Skill[] = [
  { name: "Cross-functional Collaboration", category: "professional", proficiency: "Expert", yearsExperience: 5, projectsUsed: 10 },
  { name: "Technical Communication", category: "professional", proficiency: "Advanced", yearsExperience: 4, projectsUsed: 8 },
  { name: "Mentorship", category: "professional", proficiency: "Advanced", yearsExperience: 2, projectsUsed: 5 },
  { name: "Process Optimization", category: "professional", proficiency: "Advanced", yearsExperience: 3, projectsUsed: 4 },
  { name: "Data-driven Decision-making", category: "professional", proficiency: "Expert", yearsExperience: 4, projectsUsed: 7 },
];

export const getAllSkills = (): Skill[] => {
  return [...technicalSkills, ...financeSkills, ...professionalSkills];
};

export const getSkillsByCategory = (category: Skill['category']): Skill[] => {
  return getAllSkills().filter(skill => skill.category === category);
};

export const getSkillsByProficiency = (proficiency: Skill['proficiency']): Skill[] => {
  return getAllSkills().filter(skill => skill.proficiency === proficiency);
};`;

export const SkillsFile = () => {
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
