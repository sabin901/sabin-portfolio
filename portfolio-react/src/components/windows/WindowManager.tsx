import { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';
import { HomeWindow } from '../sections/windows/HomeWindow';
import { ProjectsWindow } from '../sections/windows/ProjectsWindow';
import { AboutWindow } from '../sections/windows/AboutWindow';
import { SkillsWindow } from '../sections/windows/SkillsWindow';
import { ContactWindow } from '../sections/windows/ContactWindow';
import { ResumeWindow } from '../sections/windows/ResumeWindow';
import { MacWindow } from '../macos/Window';

interface WindowState {
  id: string;
  title: string;
  icon: string;
  isMinimized: boolean;
  isMaximized: boolean;
  isFocused: boolean;
  position: { x: number; y: number };
  size: { width: number; height: number };
}

interface WindowManagerContextType {
  windows: WindowState[];
  openWindow: (windowId: string) => void;
  closeWindow: (windowId: string) => void;
  minimizeWindow: (windowId: string) => void;
  maximizeWindow: (windowId: string) => void;
  focusWindow: (windowId: string) => void;
  updateWindowPosition: (windowId: string, position: { x: number; y: number }) => void;
  updateWindowSize: (windowId: string, size: { width: number; height: number }) => void;
}

const WindowManagerContext = createContext<WindowManagerContextType | undefined>(undefined);

export const useWindowManager = () => {
  const context = useContext(WindowManagerContext);
  if (!context) {
    throw new Error('useWindowManager must be used within WindowManagerProvider');
  }
  return context;
};

const windowConfigs: Record<string, { title: string; icon: string; defaultSize: { width: number; height: number } }> = {
  home: { title: 'Home', icon: '🏠', defaultSize: { width: 1400, height: 950 } },
  projects: { title: 'Projects', icon: '📁', defaultSize: { width: 1600, height: 1000 } },
  about: { title: 'About Me', icon: '📄', defaultSize: { width: 1400, height: 950 } },
  skills: { title: 'Skills & Technologies', icon: '🛠️', defaultSize: { width: 1500, height: 950 } },
  contact: { title: 'Contact', icon: '✉️', defaultSize: { width: 1300, height: 850 } },
  resume: { title: 'Resume', icon: '📋', defaultSize: { width: 1200, height: 1000 } },
};

export const WindowManagerProvider = ({ children }: { children: ReactNode }) => {
  const [windows, setWindows] = useState<WindowState[]>([]);

  const openWindow = (windowId: string) => {
    setWindows((prev) => {
      // Check if window already exists
      if (prev.find((w) => w.id === windowId)) {
        return prev.map((w) =>
          w.id === windowId ? { ...w, isMinimized: false, isFocused: true } : { ...w, isFocused: false }
        );
      }

      // Create new window
      const config = windowConfigs[windowId];
      if (!config) return prev;

      // Calculate precise centered position
      const viewportWidth = typeof window !== 'undefined' ? window.innerWidth : 1920;
      const viewportHeight = typeof window !== 'undefined' ? window.innerHeight : 1080;
      const menuBarHeight = 28;
      const dockHeight = 80;
      const padding = 50; // Padding from edges
      
      // Ensure window fits within viewport
      const maxWidth = Math.min(config.defaultSize.width, viewportWidth - padding * 2);
      const maxHeight = Math.min(config.defaultSize.height, viewportHeight - menuBarHeight - dockHeight - padding * 2);
      
      // Calculate precise center position
      const availableHeight = viewportHeight - menuBarHeight - dockHeight - padding * 2;
      
      const centeredX = Math.max(padding, (viewportWidth - maxWidth) / 2);
      const centeredY = Math.max(menuBarHeight + padding, menuBarHeight + (availableHeight - maxHeight) / 2);

      const newWindow: WindowState = {
        id: windowId,
        title: config.title,
        icon: config.icon,
        isMinimized: false,
        isMaximized: false,
        isFocused: true,
        position: {
          x: Math.round(centeredX),
          y: Math.round(centeredY),
        },
        size: {
          width: Math.round(maxWidth),
          height: Math.round(maxHeight),
        },
      };

      return [...prev.map((w) => ({ ...w, isFocused: false })), newWindow];
    });
  };

  const closeWindow = (windowId: string) => {
    setWindows((prev) => prev.filter((w) => w.id !== windowId));
  };

  const minimizeWindow = (windowId: string) => {
    setWindows((prev) =>
      prev.map((w) => (w.id === windowId ? { ...w, isMinimized: true } : w))
    );
  };

  const maximizeWindow = (windowId: string) => {
    setWindows((prev) =>
      prev.map((w) => {
        if (w.id !== windowId) return w;
        
        if (w.isMaximized) {
          // Restore to default size and centered position
          const viewportWidth = typeof window !== 'undefined' ? window.innerWidth : 1920;
          const viewportHeight = typeof window !== 'undefined' ? window.innerHeight : 1080;
          const menuBarHeight = 28;
          const dockHeight = 80;
          const padding = 50;
          const config = windowConfigs[windowId];
          
          const maxWidth = Math.min(config.defaultSize.width, viewportWidth - padding * 2);
          const maxHeight = Math.min(config.defaultSize.height, viewportHeight - menuBarHeight - dockHeight - padding * 2);
          const availableHeight = viewportHeight - menuBarHeight - dockHeight - padding * 2;
          
          const centeredX = Math.max(padding, (viewportWidth - maxWidth) / 2);
          const centeredY = Math.max(menuBarHeight + padding, menuBarHeight + (availableHeight - maxHeight) / 2);
          
          return {
            ...w,
            isMaximized: false,
            size: {
              width: Math.round(maxWidth),
              height: Math.round(maxHeight),
            },
            position: {
              x: Math.round(centeredX),
              y: Math.round(centeredY),
            },
          };
        } else {
          // Maximize
          return {
            ...w,
            isMaximized: true,
            position: { x: 0, y: 0 },
          };
        }
      })
    );
  };

  const focusWindow = (windowId: string) => {
    setWindows((prev) =>
      prev.map((w) => ({
        ...w,
        isFocused: w.id === windowId,
        isMinimized: w.id === windowId ? false : w.isMinimized,
      }))
    );
  };

  const updateWindowPosition = (windowId: string, position: { x: number; y: number }) => {
    setWindows((prev) =>
      prev.map((w) => (w.id === windowId ? { ...w, position } : w))
    );
  };

  const updateWindowSize = (windowId: string, size: { width: number; height: number }) => {
    setWindows((prev) =>
      prev.map((w) => (w.id === windowId ? { ...w, size } : w))
    );
  };

  const renderWindowContent = (windowId: string) => {
    switch (windowId) {
      case 'home':
        return <HomeWindow />;
      case 'projects':
        return <ProjectsWindow />;
      case 'about':
        return <AboutWindow />;
      case 'skills':
        return <SkillsWindow />;
      case 'contact':
        return <ContactWindow />;
      case 'resume':
        return <ResumeWindow />;
      default:
        return null;
    }
  };

  return (
    <WindowManagerContext.Provider
      value={{
        windows,
        openWindow,
        closeWindow,
        minimizeWindow,
        maximizeWindow,
        focusWindow,
        updateWindowPosition,
        updateWindowSize,
      }}
    >
      {children}
      {windows.map((window) => (
        <MacWindow key={window.id} window={window}>
          {renderWindowContent(window.id)}
        </MacWindow>
      ))}
    </WindowManagerContext.Provider>
  );
};
