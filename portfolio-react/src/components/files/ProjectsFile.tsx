import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { projects } from '../../data/projects';

const generateProjectsJSON = () => {
  return JSON.stringify({
    portfolio: {
      projects: projects.map(p => ({
        id: p.id,
        title: p.title,
        category: p.category,
        problem: p.problem,
        technologies: p.technologies,
        results: p.results,
        links: p.links
      }))
    }
  }, null, 2);
};

export const ProjectsFile = () => {
  return (
    <SyntaxHighlighter
      language="json"
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
      {generateProjectsJSON()}
    </SyntaxHighlighter>
  );
};
