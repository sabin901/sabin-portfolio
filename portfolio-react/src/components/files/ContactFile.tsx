import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

const code = `// contact.tsx
export interface ContactInfo {
  email: string;
  linkedin: string;
  github: string;
  availability: {
    status: string;
    responseTime: string;
    relocation: string;
  };
}

export const contactInfo: ContactInfo = {
  email: "sabinraut343@gmail.com",
  linkedin: "linkedin.com/in/sabin-raut",
  github: "github.com/sabin901",
  availability: {
    status: "Available for interviews",
    responseTime: "Response within 24 hours",
    relocation: "Open to relocation"
  }
};

export const ContactForm = () => {
  const handleSubmit = async (formData: {
    name: string;
    email: string;
    subject: string;
    message: string;
  }) => {
    // Send email via Formspree or EmailJS
    const response = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...formData,
        to: contactInfo.email
      })
    });
    
    return response.ok;
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Form implementation */}
    </form>
  );
};

// Quick contact methods
export const quickContact = {
  email: () => window.location.href = \`mailto:\${contactInfo.email}\`,
  linkedin: () => window.open(\`https://\${contactInfo.linkedin}\`, '_blank'),
  github: () => window.open(\`https://\${contactInfo.github}\`, '_blank')
};`;

export const ContactFile = () => {
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
