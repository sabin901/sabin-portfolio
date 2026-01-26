import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

const code = `// home.tsx
import { PersonalInfo, Skills, Availability } from './types';

export const Home = () => {
  const personalInfo: PersonalInfo = {
    name: "Sabin Raut",
    title: "Information Systems + Finance Professional",
    role: "Software Developer",
    location: "St. Cloud State University",
    degree: "Dual Degree: IS + Finance"
  };

  const skills: Skills = {
    technical: ["Python", "SQL", "React", "TypeScript", "AWS"],
    finance: ["Financial Modeling", "Data Analytics", "Risk Analysis"]
  };

  const availability: Availability = {
    status: "Available for hire",
    relocation: "Open to relocate",
    responseTime: "Within 24 hours"
  };

  return (
    <div className="portfolio-home">
      <h1>{personalInfo.name}</h1>
      <p>{personalInfo.title}</p>
      <p>Building data-driven systems and analytics solutions</p>
      <p>Combining technical execution with financial expertise</p>
      
      <section className="skills">
        <h2>Core Skills</h2>
        <ul>
          {skills.technical.map(skill => (
            <li key={skill}>{skill}</li>
          ))}
        </ul>
      </section>

      <section className="availability">
        <p>✓ {availability.status}</p>
        <p>✓ {availability.relocation}</p>
        <p>✓ Response {availability.responseTime}</p>
      </section>
    </div>
  );
};`;

export const HomeFile = () => {
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
