import { useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { DesktopIcon } from './DesktopIcon';
import { SolarSystem } from './SolarSystem';

interface DesktopProps {
  children?: ReactNode;
}

export const Desktop = ({ children }: DesktopProps) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const desktopIcons = [
    { id: 'home', label: 'Home', icon: '🏠', windowId: 'home' },
    { id: 'projects', label: 'Projects', icon: '📁', windowId: 'projects' },
    { id: 'about', label: 'About', icon: '📄', windowId: 'about' },
    { id: 'skills', label: 'Skills', icon: '🛠️', windowId: 'skills' },
    { id: 'contact', label: 'Contact', icon: '✉️', windowId: 'contact' },
  ];

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Generate more stars
  const generateStars = () => {
    const stars = [];
    for (let i = 0; i < 150; i++) {
      const x = Math.random() * 100;
      const y = Math.random() * 100;
      const size = Math.random() * 2 + 0.5;
      stars.push(`radial-gradient(${size}px ${size}px at ${x}% ${y}%, rgba(255,255,255,${Math.random() * 0.8 + 0.2}), transparent)`);
    }
    return stars.join(', ');
  };

  return (
    <div className="fixed inset-0 overflow-hidden select-none">
      {/* Enhanced Space/Galaxy Wallpaper Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-950 via-indigo-950 via-blue-950 to-black">
        {/* Animated Stars Layer */}
        <motion.div
          className="absolute inset-0"
          style={{
            backgroundImage: generateStars(),
            backgroundSize: '100% 100%',
          }}
          animate={{
            opacity: [0.6, 1, 0.6],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />

        {/* Parallax Nebula/Galaxy Effects */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            className="absolute top-1/4 right-1/4 w-[600px] h-[600px] bg-purple-500 rounded-full blur-[120px] opacity-50"
            animate={{
              x: [0, 50, 0],
              y: [0, 30, 0],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            style={{
              transform: `translate(${mousePosition.x * 0.02}px, ${mousePosition.y * 0.02}px)`,
            }}
          />
          <motion.div
            className="absolute bottom-1/4 left-1/4 w-[500px] h-[500px] bg-pink-500 rounded-full blur-[100px] opacity-50"
            animate={{
              x: [0, -40, 0],
              y: [0, -20, 0],
              scale: [1, 1.15, 1],
            }}
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            style={{
              transform: `translate(${-mousePosition.x * 0.015}px, ${-mousePosition.y * 0.015}px)`,
            }}
          />
          <motion.div
            className="absolute top-1/2 left-1/2 w-[700px] h-[700px] bg-blue-500 rounded-full blur-[140px] opacity-40 transform -translate-x-1/2 -translate-y-1/2"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
          <motion.div
            className="absolute top-3/4 right-1/3 w-[400px] h-[400px] bg-cyan-500 rounded-full blur-[90px] opacity-35"
            animate={{
              x: [0, 30, 0],
              y: [0, -40, 0],
            }}
            transition={{
              duration: 18,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        </div>

        {/* Animated Light Streaks */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            className="absolute top-0 right-1/4 w-1 h-full bg-gradient-to-b from-transparent via-white to-transparent transform rotate-12 blur-sm"
            animate={{
              opacity: [0.2, 0.5, 0.2],
              x: [0, 20, 0],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
          <motion.div
            className="absolute top-0 right-1/3 w-1 h-full bg-gradient-to-b from-transparent via-purple-300 to-transparent transform rotate-6 blur-sm"
            animate={{
              opacity: [0.2, 0.4, 0.2],
              x: [0, -15, 0],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
          <motion.div
            className="absolute top-0 left-1/3 w-1 h-full bg-gradient-to-b from-transparent via-cyan-300 to-transparent transform -rotate-12 blur-sm"
            animate={{
              opacity: [0.15, 0.35, 0.15],
              x: [0, 25, 0],
            }}
            transition={{
              duration: 12,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        </div>

        {/* Floating Particles */}
        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-white rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -100, 0],
                opacity: [0, 1, 0],
                scale: [0, 1, 0],
              }}
              transition={{
                duration: Math.random() * 10 + 10,
                repeat: Infinity,
                delay: Math.random() * 5,
                ease: 'easeInOut',
              }}
            />
          ))}
        </div>

        {/* Grid Overlay for Depth */}
        <div className="absolute inset-0 opacity-5">
          <div
            className="w-full h-full"
            style={{
              backgroundImage: `
                linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
              `,
              backgroundSize: '50px 50px',
            }}
          />
        </div>

        {/* Radial Gradient Overlay for Depth */}
        <div
          className="absolute inset-0"
          style={{
            background: `radial-gradient(ellipse at center, transparent 0%, rgba(0,0,0,0.3) 100%)`,
          }}
        />

        {/* Solar System Animation */}
        <SolarSystem />
      </div>

      {/* Desktop Icons */}
      <div className="absolute top-20 left-16 grid grid-cols-1 gap-8 z-10">
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

      {/* Children (for any overlay content) */}
      {children}
    </div>
  );
};
