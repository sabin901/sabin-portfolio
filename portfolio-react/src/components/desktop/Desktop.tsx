import type { ReactNode } from 'react';
import { DesktopIcon } from './DesktopIcon';
import { Taskbar } from '../taskbar/Taskbar';

interface DesktopProps {
  children?: ReactNode;
}

export const Desktop = ({ children }: DesktopProps) => {
  const desktopIcons = [
    { id: 'home', label: 'Home', icon: '🏠', windowId: 'home' },
    { id: 'projects', label: 'Projects', icon: '📁', windowId: 'projects' },
    { id: 'about', label: 'About', icon: '📄', windowId: 'about' },
    { id: 'skills', label: 'Skills', icon: '🛠️', windowId: 'skills' },
    { id: 'contact', label: 'Contact', icon: '✉️', windowId: 'contact' },
  ];

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 overflow-hidden select-none">
      {/* Desktop Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="desktop-grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#desktop-grid)" className="text-gray-900 dark:text-gray-100" />
        </svg>
      </div>

      {/* Desktop Icons */}
      <div className="absolute top-8 left-8 grid grid-cols-1 gap-8 z-10">
        {desktopIcons.map((icon) => (
          <DesktopIcon
            key={icon.id}
            id={icon.id}
            label={icon.label}
            icon={icon.icon}
            windowId={icon.windowId}
          />
        ))}
      </div>

      {/* Taskbar */}
      <Taskbar />

      {/* Children (for any overlay content) */}
      {children}
    </div>
  );
};
