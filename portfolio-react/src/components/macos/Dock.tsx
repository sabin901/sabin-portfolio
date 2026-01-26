import { useState } from 'react';
import { motion } from 'framer-motion';
import { useWindowManager } from '../windows/WindowManager';

export const Dock = () => {
  const { openWindow, windows, focusWindow } = useWindowManager();
  const [hoveredIcon, setHoveredIcon] = useState<string | null>(null);

  const dockItems = [
    { id: 'home', label: 'Home', icon: '🏠', windowId: 'home' },
    { id: 'projects', label: 'Projects', icon: '📁', windowId: 'projects' },
    { id: 'about', label: 'About', icon: '📄', windowId: 'about' },
    { id: 'skills', label: 'Skills', icon: '🛠️', windowId: 'skills' },
    { id: 'contact', label: 'Contact', icon: '✉️', windowId: 'contact' },
    { id: 'resume', label: 'Resume', icon: '📋', windowId: 'resume' },
  ];

  const isWindowOpen = (windowId: string) => {
    return windows.some((w) => w.id === windowId && !w.isMinimized);
  };

  const handleClick = (windowId: string) => {
    const window = windows.find((w) => w.id === windowId);
    if (window && !window.isMinimized) {
      focusWindow(windowId);
      return;
    }
    openWindow(windowId);
  };

  // Calculate magnification for each icon based on distance from hovered icon
  const getIconScale = (itemId: string) => {
    if (!hoveredIcon) {
      return isWindowOpen(dockItems.find(i => i.id === itemId)!.windowId) ? 1.1 : 1;
    }

    const hoveredIndex = dockItems.findIndex(i => i.id === hoveredIcon);
    const currentIndex = dockItems.findIndex(i => i.id === itemId);
    const distance = Math.abs(currentIndex - hoveredIndex);

    if (distance === 0) {
      return 1.5; // Hovered icon
    } else if (distance === 1) {
      return 1.25; // Adjacent icons
    } else if (distance === 2) {
      return 1.1; // Two away
    } else {
      return 1; // Far away
    }
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[90] flex justify-center">
      {/* macOS Dock - Authentic Style */}
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="relative"
        style={{
          height: '54px',
          paddingBottom: '3px',
        }}
      >
        {/* Dock Background - Real macOS Style (Less Shiny) */}
        <div
          className="relative"
          style={{
            height: '100%',
            background: `
              linear-gradient(to bottom,
                rgba(255, 255, 255, 0.3) 0%,
                rgba(255, 255, 255, 0.25) 25%,
                rgba(240, 240, 240, 0.2) 50%,
                rgba(220, 220, 220, 0.15) 75%,
                rgba(200, 200, 200, 0.1) 100%
              )
            `,
            backdropFilter: 'blur(12px) saturate(130%)',
            WebkitBackdropFilter: 'blur(12px) saturate(130%)',
            borderRadius: '8px 8px 0 0',
            borderTop: '1px solid rgba(255, 255, 255, 0.4)',
            borderLeft: '1px solid rgba(255, 255, 255, 0.2)',
            borderRight: '1px solid rgba(255, 255, 255, 0.2)',
            boxShadow: `
              0 -2px 8px rgba(0, 0, 0, 0.25),
              inset 0 1px 0 rgba(255, 255, 255, 0.5),
              inset 0 -1px 0 rgba(0, 0, 0, 0.15)
            `,
          }}
        >
          {/* Subtle Top Reflection */}
          <div
            className="absolute top-0 left-0 right-0 h-0.5"
            style={{
              background: 'linear-gradient(to right, transparent, rgba(255, 255, 255, 0.4), transparent)',
              borderRadius: '8px 8px 0 0',
            }}
          />

          {/* Icons Container */}
          <div 
            className="relative flex items-end justify-center gap-1 px-3"
            style={{
              height: '100%',
              paddingTop: '5px',
              paddingBottom: '6px',
            }}
          >
            {dockItems.map((item) => {
              const isOpen = isWindowOpen(item.windowId);
              const isHovered = hoveredIcon === item.id;
              const scale = getIconScale(item.id);

              return (
                <motion.button
                  key={item.id}
                  onClick={() => handleClick(item.windowId)}
                  onMouseEnter={() => setHoveredIcon(item.id)}
                  onMouseLeave={() => setHoveredIcon(null)}
                  className="relative flex flex-col items-center justify-end"
                  whileTap={{ scale: 0.9 }}
                  style={{
                    transformOrigin: 'center bottom',
                  }}
                >
                  {/* Icon Container */}
                  <motion.div
                    animate={{ 
                      scale,
                      y: isHovered ? -10 : 0,
                    }}
                    transition={{ 
                      type: 'spring', 
                      stiffness: 300, 
                      damping: 20,
                    }}
                    className={`relative flex items-center justify-center rounded-xl transition-all duration-200 ${
                      isOpen
                        ? 'bg-white/15'
                        : 'bg-transparent'
                    }`}
                    style={{
                      width: '52px',
                      height: '52px',
                      filter: isHovered 
                        ? 'drop-shadow(0 6px 12px rgba(0, 0, 0, 0.3))' 
                        : 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.15))',
                    }}
                  >
                    {/* Icon */}
                    <span 
                      className="text-4xl select-none pointer-events-none"
                      style={{
                        display: 'block',
                        transform: isHovered ? 'scale(1.05)' : 'scale(1)',
                        transition: 'transform 0.2s ease-out',
                      }}
                    >
                      {item.icon}
                    </span>
                  </motion.div>

                  {/* Indicator dot for open windows - macOS style */}
                  {isOpen && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="w-1 h-1 bg-white rounded-full mt-1"
                      style={{
                        boxShadow: '0 0 3px rgba(255, 255, 255, 0.6)',
                      }}
                    />
                  )}

                  {/* Tooltip */}
                  {isHovered && (
                    <motion.div
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="absolute bottom-full mb-2 px-2 py-1 bg-gray-900/90 backdrop-blur-sm text-white rounded text-xs whitespace-nowrap shadow-lg"
                      style={{
                        fontSize: '11px',
                        fontWeight: '500',
                      }}
                    >
                      {item.label}
                      <div 
                        className="absolute top-full left-1/2 transform -translate-x-1/2"
                        style={{
                          width: 0,
                          height: 0,
                          borderLeft: '3px solid transparent',
                          borderRight: '3px solid transparent',
                          borderTop: '3px solid rgba(17, 24, 39, 0.9)',
                        }}
                      />
                    </motion.div>
                  )}
                </motion.button>
              );
            })}
          </div>
        </div>

        {/* Subtle Bottom Shadow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse 150% 100% at center bottom, rgba(0, 0, 0, 0.2) 0%, transparent 50%)',
            transform: 'translateY(4px)',
            zIndex: -1,
            borderRadius: '8px 8px 0 0',
          }}
        />
      </motion.div>
    </div>
  );
};
