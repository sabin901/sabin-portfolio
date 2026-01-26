import { useState, useEffect, useRef } from 'react';
import type { File } from './IDELayout';

interface TerminalProps {
  height: number;
  onHeightChange: (height: number) => void;
  onOpenFile: (file: File) => void;
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
║  open <file>       Open file in editor                     ║
║  resume            Download resume PDF                     ║
║  contact           Show contact information                ║
║  github            Open GitHub profile                     ║
║  linkedin          Open LinkedIn profile                   ║
║  clear             Clear terminal                          ║
║                                                             ║
║  Examples:                                                 ║
║    $ cat resume.tsx                                        ║
║    $ ls projects/                                          ║
║    $ open about.md                                         ║
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
║               errors. Focus on measurable impact.          ║
║                                                             ║
╚═══════════════════════════════════════════════════════════╝

Type 'help' for commands | 'ls' to explore | 'cat resume.tsx' to view resume`,

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

Use 'cat <filename>' or 'open <filename>' to view`;
  },

  cat: (args) => {
    const file = args[0];
    if (!file) return 'Usage: cat <filename>\nExample: cat resume.tsx';
    
    const fileMap: Record<string, string> = {
      'resume.tsx': '📄 Opening resume.tsx in editor...\nUse "open resume.tsx" to view full content.',
      'about.md': '📄 Opening about.md in editor...\nUse "open about.md" to view full content.',
      'projects.json': '📄 Opening projects.json in editor...\nUse "open projects.json" to view all projects.',
      'skills.tsx': '📄 Opening skills.tsx in editor...\nUse "open skills.tsx" to view skills.',
      'home.tsx': '📄 Opening home.tsx in editor...\nUse "open home.tsx" to view home.',
      'contact.tsx': '📄 Opening contact.tsx in editor...\nUse "open contact.tsx" or "contact" for contact info.',
    };

    return fileMap[file] || `❌ File not found: ${file}\nType 'ls' to see available files.`;
  },

  open: (args) => {
    const file = args[0];
    if (!file) return 'Usage: open <filename>\nExample: open resume.tsx';
    return `📂 Opening ${file} in editor...`;
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

  cd: (args) => {
    const dir = args[0] || '~';
    return `📂 Changed directory to ${dir}`;
  },

  clear: () => '',
};

export const Terminal = ({ height, onHeightChange, onOpenFile }: TerminalProps) => {
  const [history, setHistory] = useState<Array<{ command: string; output: string }>>([
    { command: 'help', output: commands.help([]) }
  ]);
  const [input, setInput] = useState('');
  const [historyIndex, setHistoryIndex] = useState(-1);
  const terminalRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [, setIsResizing] = useState(false);

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [history]);

  const handleCommand = (cmd: string) => {
    if (!cmd.trim()) return;

    const parts = cmd.trim().split(' ');
    const command = parts[0].toLowerCase();
    const args = parts.slice(1);

    let output = '';

    if (commands[command]) {
      output = commands[command](args);
      
      // Handle file opening
      if (command === 'open' || command === 'cat') {
        const file = args[0];
        if (file) {
          const fileMap: Record<string, File> = {
            'resume.tsx': { id: 'resume', name: 'resume.tsx', type: 'tsx', content: null, path: 'portfolio/resume.tsx' },
            'about.md': { id: 'about', name: 'about.md', type: 'md', content: null, path: 'portfolio/about.md' },
            'projects.json': { id: 'projects', name: 'projects.json', type: 'json', content: null, path: 'portfolio/projects.json' },
            'skills.tsx': { id: 'skills', name: 'skills.tsx', type: 'tsx', content: null, path: 'portfolio/skills.tsx' },
            'home.tsx': { id: 'home', name: 'home.tsx', type: 'tsx', content: null, path: 'portfolio/home.tsx' },
            'contact.tsx': { id: 'contact', name: 'contact.tsx', type: 'tsx', content: null, path: 'portfolio/contact.tsx' },
          };
          const fileToOpen = fileMap[file];
          if (fileToOpen) {
            setTimeout(() => onOpenFile(fileToOpen), 100);
          }
        }
      }
    } else {
      output = `Command not found: ${command}. Type 'help' for available commands.`;
    }

    setHistory([...history, { command: cmd, output }]);
    setInput('');
    setHistoryIndex(-1);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleCommand(input);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      const prevIndex = historyIndex === -1 ? history.length - 1 : historyIndex - 1;
      if (prevIndex >= 0) {
        setHistoryIndex(prevIndex);
        setInput(history[prevIndex].command);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex < history.length - 1) {
        const nextIndex = historyIndex + 1;
        setHistoryIndex(nextIndex);
        setInput(history[nextIndex]?.command || '');
      } else {
        setHistoryIndex(-1);
        setInput('');
      }
    } else if (e.key === 'Tab') {
      e.preventDefault();
      // Tab completion could go here
    }
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsResizing(true);
    const startY = e.clientY;
    const startHeight = height;

    const handleMouseMove = (e: MouseEvent) => {
      const newHeight = startHeight - (e.clientY - startY);
      onHeightChange(Math.max(150, Math.min(600, newHeight)));
    };

    const handleMouseUp = () => {
      setIsResizing(false);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  return (
    <div className="bg-[#1e1e1e] border-t border-[#3e3e42] flex flex-col" style={{ height: `${height}px` }}>
      {/* Terminal Header */}
      <div className="h-7 bg-[#2d2d30] border-b border-[#3e3e42] flex items-center justify-between px-3">
        <div className="flex items-center gap-2">
          <span className="text-xs text-[#858585] font-mono">Terminal</span>
        </div>
        <div className="text-xs text-[#858585] font-mono">sabin@portfolio:~$</div>
      </div>

      {/* Terminal Content */}
      <div
        ref={terminalRef}
        className="flex-1 overflow-y-auto p-4 font-mono text-sm text-[#cccccc]"
        onClick={() => inputRef.current?.focus()}
      >
        {history.map((item, index) => (
          <div key={index} className="mb-2">
            <div className="text-green-400 mb-1">
              <span className="text-[#569cd6]">sabin@portfolio</span>:<span className="text-[#4ec9b0]">~</span>$ {item.command}
            </div>
            {item.output && (
              <div className="text-[#cccccc] whitespace-pre-wrap ml-4">{item.output}</div>
            )}
          </div>
        ))}
        <div className="flex items-center">
          <span className="text-green-400">
            <span className="text-[#569cd6]">sabin@portfolio</span>:<span className="text-[#4ec9b0]">~</span>$
          </span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 bg-transparent border-none outline-none text-[#cccccc] ml-2 font-mono"
            autoFocus
          />
          <span className="animate-blink text-green-400">|</span>
        </div>
      </div>

      {/* Resize Handle */}
      <div
        onMouseDown={handleMouseDown}
        className="h-1 bg-[#3e3e42] cursor-ns-resize hover:bg-[#007acc] transition-colors"
      />
    </div>
  );
};
