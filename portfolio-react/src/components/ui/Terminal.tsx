import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface TerminalProps {
  initialCommands?: string[];
  onCommand?: (command: string) => string | Promise<string>;
  className?: string;
}

const defaultCommands: Record<string, string> = {
  'help': 'Available commands:\n  help - Show this help message\n  about - Learn about Sabin\n  skills - View technical skills\n  projects - List projects\n  contact - Get contact info\n  clear - Clear terminal',
  'about': 'Hybrid Information Systems & Finance professional with 3+ years of experience designing and implementing data-driven systems.',
  'skills': 'Technical: Python, SQL, React, TypeScript, C#, Java, AWS\nFinance: Financial Modeling, Forecasting, Risk Analysis, KPI Development',
  'projects': '1. Application Manager - C#/.NET Business System\n2. Neural Muse Dashboard - React/TypeScript Analytics\n3. SCSU Event Recommender - C# Recommendation Engine\n4. Financial Data Pipeline - Python ETL\nView all: https://github.com/sabin901',
  'contact': 'Email: sabinraut343@gmail.com\nLinkedIn: linkedin.com/in/sabin-raut\nGitHub: github.com/sabin901',
  'clear': '',
};

export const Terminal = ({ initialCommands = [], onCommand, className = '' }: TerminalProps) => {
  const [history, setHistory] = useState<Array<{ command: string; output: string; timestamp: Date }>>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (initialCommands.length > 0) {
      initialCommands.forEach((cmd, index) => {
        setTimeout(() => {
          handleCommand(cmd);
        }, index * 1000);
      });
    }
  }, []);

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [history]);

  const handleCommand = async (cmd: string) => {
    if (!cmd.trim()) return;

    setIsTyping(true);
    const command = cmd.trim().toLowerCase();
    let output = '';

    if (onCommand) {
      output = await onCommand(command);
    } else {
      output = defaultCommands[command] || `Command not found: ${command}. Type 'help' for available commands.`;
    }

    setHistory(prev => [...prev, {
      command: cmd,
      output,
      timestamp: new Date(),
    }]);
    setIsTyping(false);
    setInput('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleCommand(input);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowUp' && history.length > 0) {
      const lastCommand = history[history.length - 1].command;
      setInput(lastCommand);
    }
  };

  return (
    <div className={`bg-gray-900 border border-gray-700 rounded-lg overflow-hidden shadow-2xl ${className}`}>
      {/* Terminal Header */}
      <div className="bg-gray-800 px-4 py-3 flex items-center justify-between border-b border-gray-700">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
          </div>
          <span className="text-gray-400 text-xs font-mono">terminal</span>
        </div>
        <div className="text-gray-500 text-xs font-mono">
          sabin@portfolio:~$
        </div>
      </div>

      {/* Terminal Content */}
      <div
        ref={terminalRef}
        className="p-4 h-64 overflow-y-auto font-mono text-sm bg-gray-900"
        style={{ scrollbarWidth: 'thin' }}
      >
        <div className="text-green-400 mb-2">
          Welcome to Sabin Raut's Portfolio Terminal
        </div>
        <div className="text-gray-500 mb-4 text-xs">
          Type 'help' to see available commands
        </div>

        <AnimatePresence>
          {history.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="mb-3"
            >
              <div className="flex items-start gap-2 mb-1">
                <span className="text-green-400">$</span>
                <span className="text-gray-300">{item.command}</span>
              </div>
              {item.output && (
                <div className="text-gray-400 ml-4 whitespace-pre-wrap text-xs">
                  {item.output}
                </div>
              )}
            </motion.div>
          ))}
        </AnimatePresence>

        {isTyping && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center gap-2 text-gray-500"
          >
            <span className="animate-pulse">⏳</span>
            <span>Processing...</span>
          </motion.div>
        )}

        {/* Input Line */}
        <form onSubmit={handleSubmit} className="flex items-center gap-2 mt-2">
          <span className="text-green-400">$</span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 bg-transparent text-gray-300 outline-none font-mono text-sm"
            placeholder="Type a command..."
            autoFocus
          />
          <motion.span
            className="w-2 h-4 bg-green-400 inline-block"
            animate={{ opacity: [1, 0] }}
            transition={{ duration: 0.8, repeat: Infinity }}
          />
        </form>
      </div>
    </div>
  );
};
