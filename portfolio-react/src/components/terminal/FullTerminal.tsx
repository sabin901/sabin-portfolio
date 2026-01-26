import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTypewriter } from '../../hooks/useTypewriter';

interface CommandHistory {
  command: string;
  output: string;
  timestamp: Date;
}

const commands: Record<string, (args: string[]) => string> = {
  help: () => `╔═══════════════════════════════════════════════════════════╗
║                    AVAILABLE COMMANDS                      ║
╠═══════════════════════════════════════════════════════════╣
║                                                             ║
║  help              Show this help message                  ║
║  whoami            Display professional profile            ║
║  ls [dir]          List files/sections                     ║
║  cat <file>        View file content                       ║
║  resume            Download resume PDF                     ║
║  contact           Show contact information                ║
║  github            Open GitHub profile                     ║
║  linkedin          Open LinkedIn profile                   ║
║  clear             Clear terminal                          ║
║                                                             ║
║  Examples:                                                 ║
║    $ cat resume.tsx                                        ║
║    $ ls projects/                                          ║
║    $ resume                                                ║
║                                                             ║
╚═══════════════════════════════════════════════════════════╝`,

  whoami: () => `╔═══════════════════════════════════════════════════════════╗
║              SABIN RAUT - PROFESSIONAL PROFILE              ║
╠═══════════════════════════════════════════════════════════╣
║                                                             ║
║  Name:        Sabin Raut                                   ║
║  Title:       Software Developer & Data Engineer           ║
║  Education:   B.S. Information Systems & Finance          ║
║  University:  St. Cloud State University                   ║
║  GPA:         3.8/4.0                                       ║
║  Status:      Available for hire | Open to relocate        ║
║                                                             ║
║  Experience:  3+ years                                     ║
║  Projects:    8+ completed                                  ║
║  Mentored:    50+ students                                  ║
║                                                             ║
║  Core Skills: Python, SQL, React, TypeScript, AWS,         ║
║               Financial Modeling, Data Analytics            ║
║                                                             ║
║  Philosophy:  Building tools that save time and reduce     ║
║               errors. Focus on measurable impact.           ║
║                                                             ║
╚═══════════════════════════════════════════════════════════╝`,

  ls: (args) => {
    const dir = args[0] || '';
    if (dir === 'projects' || dir === 'projects/') {
      return `📁 projects/
  ├── 📄 application-manager.tsx      (C# | .NET | SQL)
  ├── 📄 neural-muse-dashboard.tsx   (React | TypeScript)
  ├── 📄 scsu-event-recommender.tsx   (Python | ML)
  ├── 📄 financial-data-pipeline.tsx  (Python | Pandas | SQL)
  ├── 📄 bajam-ecommerce.tsx          (Full-Stack)
  ├── 📄 agoriu-dashboard.tsx         (React | Data Viz)
  ├── 📄 yac-analytics.tsx            (Python | Analytics)
  └── 📄 portfolio-website.tsx        (React | TypeScript)

Use 'cat <filename>' to view project details`;
    }
    return `📁 portfolio/
  ├── 📄 home.tsx          Main landing page
  ├── 📄 about.md          About me & background
  ├── 📄 resume.tsx        Professional resume
  ├── 📄 projects.json     All projects
  ├── 📄 skills.tsx        Technical skills
  └── 📄 contact.tsx       Contact information

Use 'cat <filename>' to view content`;
  },

  cat: (args) => {
    const file = args[0];
    if (!file) return 'Usage: cat <filename>\nExample: cat resume.tsx';
    
    const fileMap: Record<string, string> = {
      'resume.tsx': `╔═══════════════════════════════════════════════════════════╗
║                      RESUME.TSX                           ║
╠═══════════════════════════════════════════════════════════╣
║                                                             ║
║  export const Resume = {                                   ║
║    name: "Sabin Raut",                                      ║
║    title: "Software Developer & Data Engineer",            ║
║    education: "B.S. Information Systems & Finance",        ║
║    university: "St. Cloud State University",               ║
║    gpa: "3.8/4.0",                                          ║
║    experience: [                                            ║
║      {                                                       ║
║        role: "Library Operations Supervisor",               ║
║        company: "St. Cloud State University",               ║
║        duration: "Jul 2023 - Present",                      ║
║        achievements: [                                       ║
║          "Led digital scheduling system redesign",          ║
║          "Reduced conflicts by 40%",                        ║
║          "Built automation tools reducing effort by 30%"     ║
║        ]                                                     ║
║      }                                                       ║
║    ]                                                         ║
║  }                                                           ║
║                                                             ║
║  Type 'resume' to download PDF                              ║
║                                                             ║
╚═══════════════════════════════════════════════════════════╝`,
      'about.md': `╔═══════════════════════════════════════════════════════════╗
║                      ABOUT.MD                              ║
╠═══════════════════════════════════════════════════════════╣
║                                                             ║
║  # About Sabin Raut                                         ║
║                                                             ║
║  Hybrid Information Systems & Finance professional with    ║
║  3+ years of experience designing and implementing          ║
║  data-driven systems, analytics solutions, and workflow   ║
║  automations.                                               ║
║                                                             ║
║  ## Philosophy                                              ║
║  Building tools that save time and reduce errors.          ║
║  Focus on measurable impact and continuous learning.        ║
║                                                             ║
║  ## Interests                                               ║
║  - Exploring new technologies                               ║
║  - Reading non-fiction                                      ║
║  - Hiking and chess                                         ║
║                                                             ║
╚═══════════════════════════════════════════════════════════╝`,
      'projects.json': `╔═══════════════════════════════════════════════════════════╗
║                    PROJECTS.JSON                           ║
╠═══════════════════════════════════════════════════════════╣
║                                                             ║
║  {                                                          ║
║    "projects": [                                            ║
║      {                                                      ║
║        "name": "Application Manager",                       ║
║        "tech": ["C#", ".NET", "SQL"],                      ║
║        "impact": "40% reduction in conflicts"               ║
║      },                                                     ║
║      {                                                      ║
║        "name": "Neural Muse Dashboard",                     ║
║        "tech": ["React", "TypeScript"],                    ║
║        "impact": "Real-time analytics"                      ║
║      }                                                      ║
║    ]                                                        ║
║  }                                                          ║
║                                                             ║
║  Type 'ls projects/' to see all projects                   ║
║                                                             ║
╚═══════════════════════════════════════════════════════════╝`,
      'skills.tsx': `╔═══════════════════════════════════════════════════════════╗
║                      SKILLS.TSX                            ║
╠═══════════════════════════════════════════════════════════╣
║                                                             ║
║  export const Skills = {                                   ║
║    technical: [                                             ║
║      "Python", "SQL", "React", "TypeScript",               ║
║      "C#", "Java", "AWS", "FastAPI"                         ║
║    ],                                                       ║
║    finance: [                                               ║
║      "Financial Modeling", "Forecasting",                   ║
║      "Risk Analysis", "Excel"                               ║
║    ],                                                       ║
║    professional: [                                          ║
║      "Cross-functional Collaboration",                      ║
║      "Mentorship", "Process Optimization"                  ║
║    ]                                                        ║
║  }                                                          ║
║                                                             ║
╚═══════════════════════════════════════════════════════════╝`,
      'contact.tsx': `╔═══════════════════════════════════════════════════════════╗
║                    CONTACT.TSX                             ║
╠═══════════════════════════════════════════════════════════╣
║                                                             ║
║  export const Contact = {                                  ║
║    email: "sabinraut343@gmail.com",                         ║
║    linkedin: "linkedin.com/in/sabin-raut",                  ║
║    github: "github.com/sabin901",                           ║
║    location: "St. Cloud, MN",                               ║
║    status: "Available for hire",                           ║
║    responseTime: "Within 24 hours"                          ║
║  }                                                          ║
║                                                             ║
║  Type 'contact' for full contact information               ║
║                                                             ║
╚═══════════════════════════════════════════════════════════╝`,
    };

    return fileMap[file] || `❌ File not found: ${file}\nType 'ls' to see available files.`;
  },

  resume: () => {
    window.open('/images/resume-example.pdf', '_blank');
    return `📥 Opening resume PDF in new tab...\nIf download doesn't start, check your browser settings.`;
  },

  contact: () => `╔═══════════════════════════════════════════════════════════╗
║                    CONTACT INFORMATION                      ║
╠═══════════════════════════════════════════════════════════╣
║                                                             ║
║  📧 Email:    sabinraut343@gmail.com                       ║
║  💼 LinkedIn: linkedin.com/in/sabin-raut                   ║
║  🐙 GitHub:   github.com/sabin901                          ║
║  📍 Location: St. Cloud, MN (Open to relocate)             ║
║                                                             ║
║  Status:     ✅ Available for hire                         ║
║  Response:   Within 24 hours                               ║
║                                                             ║
║  Use 'github' or 'linkedin' to open profiles               ║
║                                                             ║
╚═══════════════════════════════════════════════════════════╝`,

  github: () => {
    window.open('https://github.com/sabin901', '_blank');
    return '🌐 Opening GitHub profile in new tab...';
  },

  linkedin: () => {
    window.open('https://linkedin.com/in/sabin-raut', '_blank');
    return '🌐 Opening LinkedIn profile in new tab...';
  },

  clear: () => '',
};

export const FullTerminal = () => {
  const [history, setHistory] = useState<CommandHistory[]>([]);
  const [input, setInput] = useState('');
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [isTyping, setIsTyping] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);

  const welcomeText = useTypewriter(
    [
      'Welcome to Sabin Raut\'s Portfolio Terminal',
      'Type "help" to see available commands',
      'Type "whoami" to learn about me',
      'Type "ls" to explore sections',
    ],
    50
  );

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [history]);

  const handleCommand = async (cmd: string) => {
    if (!cmd.trim()) return;

    setIsTyping(true);
    await new Promise(resolve => setTimeout(resolve, 100));

    const parts = cmd.trim().split(' ');
    const command = parts[0].toLowerCase();
    const args = parts.slice(1);

    let output = '';
    if (commands[command]) {
      output = commands[command](args);
    } else {
      output = `❌ Command not found: ${command}\nType 'help' for available commands.`;
    }

    setHistory(prev => [...prev, {
      command: cmd,
      output,
      timestamp: new Date(),
    }]);

    setIsTyping(false);
    setInput('');
    setHistoryIndex(-1);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleCommand(input);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (history.length > 0) {
        const newIndex = historyIndex === -1 
          ? history.length - 1 
          : Math.max(0, historyIndex - 1);
        setHistoryIndex(newIndex);
        setInput(history[newIndex].command);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex >= 0) {
        const newIndex = historyIndex + 1;
        if (newIndex >= history.length) {
          setHistoryIndex(-1);
          setInput('');
        } else {
          setHistoryIndex(newIndex);
          setInput(history[newIndex].command);
        }
      }
    } else if (e.key === 'Tab') {
      e.preventDefault();
      const matches = Object.keys(commands).filter(cmd => 
        cmd.startsWith(input.toLowerCase())
      );
      if (matches.length === 1) {
        setInput(matches[0] + ' ');
      }
    }
  };

  return (
    <div className="h-screen w-screen bg-[#0d1117] text-[#c9d1d9] font-mono overflow-hidden flex flex-col">
      {/* Terminal Header */}
      <div className="bg-[#161b22] border-b border-[#30363d] px-4 py-2 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-[#ff5f56]"></div>
            <div className="w-3 h-3 rounded-full bg-[#ffbd2e]"></div>
            <div className="w-3 h-3 rounded-full bg-[#27c93f]"></div>
          </div>
          <span className="text-xs text-[#8b949e]">Terminal — sabin@portfolio</span>
        </div>
        <div className="text-xs text-[#8b949e]">
          Portfolio Terminal v1.0
        </div>
      </div>

      {/* Terminal Content */}
      <div
        ref={terminalRef}
        className="flex-1 overflow-y-auto p-6 text-sm"
        style={{ scrollbarWidth: 'thin' }}
        onClick={() => inputRef.current?.focus()}
      >
        {/* Welcome Message */}
        {history.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mb-6"
          >
            <div className="text-[#58a6ff] mb-4 text-lg font-bold">
              {welcomeText}
              <span className="animate-pulse text-[#3fb950]">|</span>
            </div>
            <div className="text-[#8b949e] text-xs mb-2">
              ──────────────────────────────────────────────────────────────
            </div>
          </motion.div>
        )}

        {/* Command History */}
        <AnimatePresence>
          {history.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="mb-4"
            >
              {/* Command */}
              <div className="flex items-start gap-2 mb-1">
                <span className="text-[#3fb950] font-bold">$</span>
                <span className="text-[#c9d1d9]">{item.command}</span>
              </div>
              
              {/* Output */}
              {item.output && (
                <div className="text-[#8b949e] ml-4 whitespace-pre-wrap leading-relaxed">
                  {item.output}
                </div>
              )}
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Typing Indicator */}
        {isTyping && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center gap-2 text-[#8b949e]"
          >
            <span className="animate-pulse">⏳</span>
            <span>Processing...</span>
          </motion.div>
        )}

        {/* Input Line */}
        <form onSubmit={handleSubmit} className="flex items-center gap-2 mt-4">
          <span className="text-[#3fb950] font-bold">
            <span className="text-[#58a6ff]">sabin@portfolio</span>
            <span className="text-[#8b949e]">:</span>
            <span className="text-[#79c0ff]">~</span>
            <span className="text-[#8b949e]">$</span>
          </span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 bg-transparent border-none outline-none text-[#c9d1d9] font-mono"
            autoFocus
            autoComplete="off"
            spellCheck={false}
          />
          <span className="animate-pulse text-[#3fb950]">|</span>
        </form>
      </div>
    </div>
  );
};
