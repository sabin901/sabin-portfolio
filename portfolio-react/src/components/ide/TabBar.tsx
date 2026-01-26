import { motion } from 'framer-motion';
import type { File } from './IDELayout';

interface TabBarProps {
  files: File[];
  activeFileId: string | null;
  onSelectFile: (fileId: string) => void;
  onCloseFile: (fileId: string) => void;
}

export const TabBar = ({ files, activeFileId, onSelectFile, onCloseFile }: TabBarProps) => {
  return (
    <div className="h-9 bg-[#2d2d30] border-b border-[#3e3e42] flex items-end overflow-x-auto">
      {files.map((file) => {
        const isActive = file.id === activeFileId;
        return (
          <motion.div
            key={file.id}
            onClick={() => onSelectFile(file.id)}
            className={`flex items-center gap-2 px-4 py-1 cursor-pointer border-t-2 transition-colors group ${
              isActive
                ? 'bg-[#1e1e1e] border-[#007acc] text-[#cccccc]'
                : 'bg-[#2d2d30] border-transparent text-[#858585] hover:bg-[#37373d]'
            }`}
            whileHover={{ backgroundColor: isActive ? '#1e1e1e' : '#37373d' }}
          >
            <span className="text-xs">{file.name.endsWith('.tsx') ? '📘' : file.name.endsWith('.json') ? '📋' : '📝'}</span>
            <span className="text-sm font-mono whitespace-nowrap">{file.name}</span>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onCloseFile(file.id);
              }}
              className="ml-2 p-0.5 hover:bg-[#3e3e42] rounded opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <svg className="w-3 h-3 text-[#858585]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </motion.div>
        );
      })}
    </div>
  );
};
