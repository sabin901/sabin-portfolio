import { motion } from 'framer-motion';
import type { File } from './IDELayout';

interface SidebarProps {
  collapsed: boolean;
  onToggle: () => void;
  onOpenFile: (file: File) => void;
}

const fileStructure = [
  {
    name: 'portfolio',
    type: 'folder',
    children: [
      { name: 'home.tsx', type: 'file', id: 'home', path: 'portfolio/home.tsx' },
      { name: 'about.md', type: 'file', id: 'about', path: 'portfolio/about.md' },
      { name: 'resume.tsx', type: 'file', id: 'resume', path: 'portfolio/resume.tsx' },
      { name: 'projects.json', type: 'file', id: 'projects', path: 'portfolio/projects.json' },
      { name: 'skills.tsx', type: 'file', id: 'skills', path: 'portfolio/skills.tsx' },
      { name: 'contact.tsx', type: 'file', id: 'contact', path: 'portfolio/contact.tsx' },
    ]
  }
];

export const Sidebar = ({ collapsed, onToggle, onOpenFile }: SidebarProps) => {
  if (collapsed) {
    return (
      <div className="w-12 bg-[#252526] border-r border-[#3e3e42] flex flex-col items-center py-2">
        <button
          onClick={onToggle}
          className="p-2 hover:bg-[#3e3e42] rounded cursor-pointer"
          title="Expand sidebar"
        >
          <svg className="w-5 h-5 text-[#cccccc]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ width: 0 }}
      animate={{ width: 250 }}
      exit={{ width: 0 }}
      className="bg-[#252526] border-r border-[#3e3e42] flex flex-col overflow-hidden"
    >
      {/* Sidebar Header */}
      <div className="h-10 bg-[#2d2d30] border-b border-[#3e3e42] flex items-center justify-between px-3">
        <span className="text-xs font-semibold text-[#cccccc] uppercase">Explorer</span>
        <button
          onClick={onToggle}
          className="p-1 hover:bg-[#3e3e42] rounded cursor-pointer"
          title="Collapse sidebar"
        >
          <svg className="w-4 h-4 text-[#cccccc]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
      </div>

      {/* File Tree */}
      <div className="flex-1 overflow-y-auto py-2">
        {fileStructure.map((folder) => (
          <div key={folder.name} className="px-2">
            {/* Folder */}
            <div className="flex items-center gap-1 py-1 px-1 hover:bg-[#2a2d2e] rounded cursor-pointer">
              <svg className="w-4 h-4 text-[#858585]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
              </svg>
              <span className="text-sm text-[#cccccc] font-medium">{folder.name}</span>
            </div>

            {/* Files */}
            <div className="ml-4">
              {folder.children.map((file) => {
                const getFileIcon = (name: string) => {
                  if (name.endsWith('.tsx')) return '📘';
                  if (name.endsWith('.json')) return '📋';
                  if (name.endsWith('.md')) return '📝';
                  return '📄';
                };

                return (
                  <div
                    key={file.id}
                    onClick={() => onOpenFile({
                      id: file.id,
                      name: file.name,
                      type: file.name.endsWith('.tsx') ? 'tsx' : file.name.endsWith('.json') ? 'json' : 'md',
                      content: null,
                      path: file.path
                    })}
                    className="flex items-center gap-2 py-1 px-2 hover:bg-[#2a2d2e] rounded cursor-pointer group"
                  >
                    <span className="text-xs">{getFileIcon(file.name)}</span>
                    <span className="text-sm text-[#cccccc] group-hover:text-white transition-colors">
                      {file.name}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
};
