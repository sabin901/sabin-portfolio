import { useState, useRef, useEffect } from 'react';
import type { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { useWindowManager } from '../windows/WindowManager';

interface MacWindowProps {
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

export const MacWindow = ({ window, children }: MacWindowProps) => {
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
        // Constrain window to viewport with precise boundaries
        const viewportWidth = globalThis.window.innerWidth;
        const viewportHeight = globalThis.window.innerHeight;
        const menuBarHeight = 28;
        const dockHeight = 80;
        const padding = 0; // Allow dragging to edges
        
        const minX = padding;
        const maxX = viewportWidth - window.size.width - padding;
        const minY = menuBarHeight + padding;
        const maxY = viewportHeight - window.size.height - dockHeight - padding;
        
        const newX = Math.max(minX, Math.min(Math.round(e.clientX - dragOffset.x), maxX));
        const newY = Math.max(minY, Math.min(Math.round(e.clientY - dragOffset.y), maxY));
        
        updateWindowPosition(window.id, {
          x: newX,
          y: newY,
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
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{
        opacity: 1,
        scale: 1,
      }}
      exit={{ opacity: 0, scale: 0.95 }}
      className={`fixed z-40 ${window.isFocused ? 'z-50' : 'z-40'}`}
      style={{
        left: window.isMaximized ? 0 : `${window.position.x}px`,
        top: window.isMaximized ? '28px' : `${window.position.y}px`,
        width: window.isMaximized ? '100%' : `${window.size.width}px`,
        height: window.isMaximized ? 'calc(100vh - 80px)' : `${window.size.height}px`,
        maxWidth: window.isMaximized ? 'none' : 'calc(100vw - 50px)',
        maxHeight: window.isMaximized ? 'none' : 'calc(100vh - 108px)',
      }}
      onMouseDown={handleMouseDown}
      onClick={() => focusWindow(window.id)}
    >
      <div
        className={`bg-white dark:bg-gray-800 rounded-t-xl shadow-2xl border flex flex-col h-full overflow-hidden ${
          window.isFocused
            ? 'border-gray-300 dark:border-gray-600'
            : 'border-gray-200 dark:border-gray-700'
        }`}
        style={{
          boxShadow: window.isFocused
            ? '0 20px 60px rgba(0, 0, 0, 0.2), 0 0 0 1px rgba(0, 0, 0, 0.05)'
            : '0 10px 40px rgba(0, 0, 0, 0.15), 0 0 0 1px rgba(0, 0, 0, 0.05)',
        }}
      >
        {/* Title Bar - macOS Style */}
        <div className="window-title-bar bg-gray-50 dark:bg-gray-900 px-4 py-2.5 flex items-center justify-between cursor-move border-b border-gray-200 dark:border-gray-700 rounded-t-xl">
          {/* Traffic Lights */}
          <div className="flex items-center gap-2">
            <button
              onClick={(e) => {
                e.stopPropagation();
                closeWindow(window.id);
              }}
              className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-600 transition-colors flex items-center justify-center group"
              aria-label="Close"
            >
              <span className="text-[8px] text-red-900 opacity-0 group-hover:opacity-100 transition-opacity">×</span>
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                minimizeWindow(window.id);
              }}
              className="w-3 h-3 rounded-full bg-yellow-500 hover:bg-yellow-600 transition-colors flex items-center justify-center group"
              aria-label="Minimize"
            >
              <span className="text-[8px] text-yellow-900 opacity-0 group-hover:opacity-100 transition-opacity">−</span>
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                maximizeWindow(window.id);
              }}
              className="w-3 h-3 rounded-full bg-green-500 hover:bg-green-600 transition-colors flex items-center justify-center group"
              aria-label="Maximize"
            >
              <span className="text-[8px] text-green-900 opacity-0 group-hover:opacity-100 transition-opacity">+</span>
            </button>
          </div>

          {/* Title - macOS Finder Style */}
          <div className="flex items-center gap-2 flex-1 justify-center">
            <span className="text-base">{window.icon}</span>
            <span className="font-medium text-sm text-gray-700 dark:text-gray-300">{window.title}</span>
          </div>

          {/* Spacer */}
          <div className="w-16" />
        </div>

        {/* Toolbar - macOS Finder Style */}
        <div className="bg-gray-50 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 px-4 py-2 flex items-center gap-4">
          <div className="flex items-center gap-2">
            <button className="px-3 py-1 text-xs font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 rounded transition-colors">
              ← Back
            </button>
            <button className="px-3 py-1 text-xs font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 rounded transition-colors">
              Forward →
            </button>
          </div>
          <div className="flex-1 flex items-center gap-2 px-4">
            <span className="text-xs text-gray-500 dark:text-gray-400">View:</span>
            <button className="px-2 py-1 text-xs font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 rounded transition-colors">
              Icons
            </button>
            <button className="px-2 py-1 text-xs font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 rounded transition-colors">
              List
            </button>
          </div>
        </div>

        {/* Window Content - Full Height */}
        <div className="flex-1 overflow-auto bg-white dark:bg-gray-800">
          {children}
        </div>
      </div>
    </motion.div>
  );
};
