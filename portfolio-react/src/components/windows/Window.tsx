import { useState, useRef, useEffect } from 'react';
import type { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { useWindowManager } from './WindowManager';

interface WindowProps {
  window: {
    id: string;
    title: string;
    icon: string;
    isMinimized: boolean;
    isMaximized: boolean;
    isFocused: boolean;
    position: { x: number; y: number };
    size: { width: number; height: number };
  };
  children: ReactNode;
}

export const Window = ({ window, children }: WindowProps) => {
  const { closeWindow, minimizeWindow, maximizeWindow, focusWindow, updateWindowPosition } = useWindowManager();
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const windowRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget || (e.target as HTMLElement).closest('.window-title-bar')) {
      setIsDragging(true);
      const rect = windowRef.current?.getBoundingClientRect();
      if (rect) {
        setDragOffset({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        });
      }
      focusWindow(window.id);
    }
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging && !window.isMaximized) {
        updateWindowPosition(window.id, {
          x: e.clientX - dragOffset.x,
          y: e.clientY - dragOffset.y,
        });
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      globalThis.window.addEventListener('mousemove', handleMouseMove);
      globalThis.window.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      globalThis.window.removeEventListener('mousemove', handleMouseMove);
      globalThis.window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, dragOffset, window.isMaximized, window.id, updateWindowPosition]);

  if (window.isMinimized) return null;

  return (
    <motion.div
      ref={windowRef}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{
        opacity: 1,
        scale: 1,
        x: window.isMaximized ? 0 : window.position.x,
        y: window.isMaximized ? 0 : window.position.y,
        width: window.isMaximized ? '100%' : window.size.width,
        height: window.isMaximized ? 'calc(100vh - 48px)' : window.size.height,
      }}
      exit={{ opacity: 0, scale: 0.9 }}
      className={`fixed z-40 ${window.isFocused ? 'z-50' : 'z-40'}`}
      style={{
        left: window.isMaximized ? 0 : window.position.x,
        top: window.isMaximized ? 0 : window.position.y,
        width: window.isMaximized ? '100%' : `${window.size.width}px`,
        height: window.isMaximized ? 'calc(100vh - 48px)' : `${window.size.height}px`,
      }}
      onMouseDown={handleMouseDown}
      onClick={() => focusWindow(window.id)}
    >
      <div
        className={`bg-white dark:bg-gray-800 rounded-lg shadow-2xl border-2 ${
          window.isFocused
            ? 'border-blue-500 dark:border-blue-400'
            : 'border-gray-300 dark:border-gray-600'
        } flex flex-col h-full overflow-hidden`}
      >
        {/* Title Bar */}
        <div className="window-title-bar bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 px-4 py-2 flex items-center justify-between cursor-move border-b border-gray-300 dark:border-gray-600">
          <div className="flex items-center gap-2">
            <span className="text-lg">{window.icon}</span>
            <span className="font-semibold text-gray-900 dark:text-white text-sm">{window.title}</span>
          </div>
          <div className="flex items-center gap-1">
            <button
              onClick={(e) => {
                e.stopPropagation();
                minimizeWindow(window.id);
              }}
              className="w-6 h-6 flex items-center justify-center hover:bg-gray-300 dark:hover:bg-gray-600 rounded transition-colors"
              aria-label="Minimize"
            >
              <span className="text-xs">─</span>
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                maximizeWindow(window.id);
              }}
              className="w-6 h-6 flex items-center justify-center hover:bg-gray-300 dark:hover:bg-gray-600 rounded transition-colors"
              aria-label="Maximize"
            >
              <span className="text-xs">□</span>
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                closeWindow(window.id);
              }}
              className="w-6 h-6 flex items-center justify-center hover:bg-red-500 hover:text-white rounded transition-colors"
              aria-label="Close"
            >
              <span className="text-xs">×</span>
            </button>
          </div>
        </div>

        {/* Window Content */}
        <div className="flex-1 overflow-auto bg-white dark:bg-gray-800 p-6">
          {children}
        </div>
      </div>
    </motion.div>
  );
};
