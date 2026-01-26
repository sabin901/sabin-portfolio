import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { File } from './IDELayout';

interface QuickOpenProps {
  files: File[];
  onSelectFile: (file: File) => void;
  onClose: () => void;
}

const availableFiles: Omit<File, 'content'>[] = [
  { id: 'home', name: 'home.tsx', type: 'tsx', path: 'portfolio/home.tsx' },
  { id: 'about', name: 'about.md', type: 'md', path: 'portfolio/about.md' },
  { id: 'resume', name: 'resume.tsx', type: 'tsx', path: 'portfolio/resume.tsx' },
  { id: 'projects', name: 'projects.json', type: 'json', path: 'portfolio/projects.json' },
  { id: 'skills', name: 'skills.tsx', type: 'tsx', path: 'portfolio/skills.tsx' },
  { id: 'contact', name: 'contact.tsx', type: 'tsx', path: 'portfolio/contact.tsx' },
];

export const QuickOpen = ({ files, onSelectFile, onClose }: QuickOpenProps) => {
  const [search, setSearch] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const filteredFiles = availableFiles.filter(file =>
    file.name.toLowerCase().includes(search.toLowerCase()) ||
    file.path.toLowerCase().includes(search.toLowerCase())
  );

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      onClose();
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex(prev => Math.min(prev + 1, filteredFiles.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(prev => Math.max(prev - 1, 0));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (filteredFiles[selectedIndex]) {
        onSelectFile(filteredFiles[selectedIndex] as File);
        onClose();
      }
    }
  };

  return (
    <AnimatePresence>
      <div
        className="fixed inset-0 bg-black/50 z-[10000] flex items-start justify-center pt-32"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: -20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: -20 }}
          onClick={(e) => e.stopPropagation()}
          className="bg-[#252526] border border-[#3e3e42] rounded-lg shadow-2xl w-full max-w-2xl overflow-hidden"
        >
          {/* Header */}
          <div className="px-4 py-3 border-b border-[#3e3e42]">
            <div className="flex items-center gap-2 text-[#858585] text-xs font-mono">
              <span>⌘P</span>
              <span>Quick Open</span>
            </div>
          </div>

          {/* Search Input */}
          <div className="px-4 py-3 border-b border-[#3e3e42]">
            <input
              ref={inputRef}
              type="text"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setSelectedIndex(0);
              }}
              onKeyDown={handleKeyDown}
              placeholder="Type to search files..."
              className="w-full bg-[#1e1e1e] border border-[#3e3e42] rounded px-3 py-2 text-[#cccccc] font-mono text-sm focus:outline-none focus:border-[#007acc]"
            />
          </div>

          {/* File List */}
          <div className="max-h-96 overflow-y-auto">
            {filteredFiles.length === 0 ? (
              <div className="px-4 py-8 text-center text-[#858585] font-mono text-sm">
                No files found
              </div>
            ) : (
              filteredFiles.map((file, index) => (
                <div
                  key={file.id}
                  onClick={() => {
                    onSelectFile(file as File);
                    onClose();
                  }}
                  className={`px-4 py-2 cursor-pointer flex items-center gap-3 ${
                    index === selectedIndex
                      ? 'bg-[#094771]'
                      : 'hover:bg-[#2a2d2e]'
                  }`}
                  onMouseEnter={() => setSelectedIndex(index)}
                >
                  <span className="text-lg">
                    {file.type === 'tsx' ? '📘' : file.type === 'json' ? '📋' : '📝'}
                  </span>
                  <div className="flex-1">
                    <div className="text-[#cccccc] font-mono text-sm">{file.name}</div>
                    <div className="text-[#858585] font-mono text-xs">{file.path}</div>
                  </div>
                  {files.find(f => f.id === file.id) && (
                    <span className="text-[#858585] text-xs">●</span>
                  )}
                </div>
              ))
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
