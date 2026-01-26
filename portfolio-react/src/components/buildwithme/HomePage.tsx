import { motion } from 'framer-motion';
import { useState } from 'react';

interface HomePageProps {
  onExplore: () => void;
}

export const HomePage = ({ onExplore }: HomePageProps) => {
  const [hovered, setHovered] = useState(false);

  // HSL color interpolation helper
  const interpolateHSL = (start: number[], end: number[], progress: number): string => {
    const h = start[0] + (end[0] - start[0]) * progress;
    const s = start[1] + (end[1] - start[1]) * progress;
    const l = start[2] + (end[2] - start[2]) * progress;
    return `hsl(${h}, ${s}%, ${l}%)`;
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-black">
      {/* Minimalist Layout Container */}
      <div className="absolute inset-0 p-8 md:p-12 lg:p-16">
        {/* Top Left - Professional Label */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="absolute top-8 md:top-12 lg:top-16 left-8 md:left-12 lg:left-16"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight">
            SR.
          </h2>
          <p className="text-xs md:text-sm text-gray-400 font-light mt-2 tracking-widest uppercase">
            Professional Portfolio
          </p>
        </motion.div>

        {/* Bottom Left - Category */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="absolute bottom-8 md:bottom-12 lg:bottom-16 left-8 md:left-12 lg:left-16"
        >
          <p className="text-sm md:text-base text-gray-300 font-medium tracking-widest uppercase">
            IS
          </p>
        </motion.div>

        {/* Middle Right - Name and Info */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="absolute top-1/2 right-8 md:right-12 lg:right-16 transform -translate-y-1/2 text-right"
        >
          <div className="space-y-4">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-light text-white tracking-[0.2em] leading-tight">
              SABIN<br />RAUT
            </h1>
            <p className="text-sm md:text-base text-gray-400 font-light mt-6">
              2021-2024
            </p>
          </div>
        </motion.div>

        {/* Beautiful Pi Visualization - Elegant & Mesmerizing */}
        <div className="absolute inset-0 pointer-events-none flex items-center justify-center z-0">
          <svg
            className="w-full h-full max-w-5xl max-h-5xl"
            viewBox="0 0 1000 1000"
            style={{ shapeRendering: 'geometricPrecision' }}
          >
            <defs>
              {/* Beautiful radial gradients */}
              <radialGradient id="centerGlow" cx="50%" cy="50%">
                <stop offset="0%" stopColor="#ea580c" stopOpacity="1" />
                <stop offset="100%" stopColor="#ea580c" stopOpacity="0" />
              </radialGradient>
              <radialGradient id="innerGradient" cx="50%" cy="50%">
                <stop offset="0%" stopColor="#ea580c" stopOpacity="0.9" />
                <stop offset="50%" stopColor="#f59e0b" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#fbbf24" stopOpacity="0.7" />
              </radialGradient>
              <radialGradient id="middleGradient" cx="50%" cy="50%">
                <stop offset="0%" stopColor="#a3e635" stopOpacity="0.8" />
                <stop offset="50%" stopColor="#10b981" stopOpacity="0.7" />
                <stop offset="100%" stopColor="#22d3ee" stopOpacity="0.6" />
              </radialGradient>
              <radialGradient id="outerGradient" cx="50%" cy="50%">
                <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.7" />
                <stop offset="50%" stopColor="#3b82f6" stopOpacity="0.6" />
                <stop offset="100%" stopColor="#6366f1" stopOpacity="0.5" />
              </radialGradient>
            </defs>
            
            {/* Glowing Center Point */}
            <motion.circle
              cx="500"
              cy="500"
              r="10"
              fill="url(#centerGlow)"
              animate={{ 
                scale: [1, 1.15, 1],
                opacity: [0.9, 1, 0.9]
              }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            
            {/* Beautiful Continuous Spiral - Demonstrates Pi's Irrationality */}
            <motion.path
              d={(() => {
                let path = "M 500 500";
                let x = 500;
                let y = 500;
                let angle = 0;
                let radius = 10;
                const pi = Math.PI;
                const piDigits = [3, 1, 4, 1, 5, 9, 2, 6, 5, 3, 5, 8, 9, 7, 9, 3, 2, 3, 8, 4, 6, 2, 6, 4, 3, 3, 8, 3, 2, 7, 9, 5, 0, 2, 8, 8, 4, 1, 9, 7];
                
                for (let i = 0; i < 600; i++) {
                  const piValue = piDigits[i % piDigits.length];
                  radius += 0.8;
                  // Irrational pattern using Pi digits
                  angle += (2 * pi) / (6 + piValue * 0.2);
                  x = 500 + radius * Math.cos(angle);
                  y = 500 + radius * Math.sin(angle);
                  path += ` L ${x} ${y}`;
                }
                return path;
              })()}
              fill="none"
              stroke="url(#piSpiralGradient)"
              strokeWidth="3"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: [0, 1] }}
              transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
            />
            
            <defs>
              <linearGradient id="piSpiralGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#ea580c" />
                <stop offset="20%" stopColor="#f59e0b" />
                <stop offset="40%" stopColor="#fbbf24" />
                <stop offset="60%" stopColor="#a3e635" />
                <stop offset="80%" stopColor="#10b981" />
                <stop offset="100%" stopColor="#3b82f6" />
              </linearGradient>
            </defs>
            
            {/* Elegant Inner Band - Smooth radiating lines */}
            {Array.from({ length: 600 }).map((_, i) => {
              const angle = (i * 360) / 600;
              const rad = (angle * Math.PI) / 180;
              const piDigits = [3, 1, 4, 1, 5, 9, 2, 6, 5, 3, 5, 8, 9];
              const piValue = piDigits[i % piDigits.length];
              const piOffset = Math.PI * piValue / 10;
              const adjustedAngle = angle + Math.sin(piOffset) * 0.5;
              const adjustedRad = (adjustedAngle * Math.PI) / 180;
              
              const startX = 500 + 10 * Math.cos(rad);
              const startY = 500 + 10 * Math.sin(rad);
              const endX = 500 + 180 * Math.cos(adjustedRad);
              const endY = 500 + 180 * Math.sin(adjustedRad);
              
              const distance = Math.sqrt((endX - 500) ** 2 + (endY - 500) ** 2);
              const colorProgress = Math.min(1, (distance - 10) / 170);
              const startHSL = [20, 90, 55];
              const endHSL = [50, 95, 65];
              const color = interpolateHSL(startHSL, endHSL, colorProgress);
              
              return (
                <motion.line
                  key={`inner-${i}`}
                  x1={startX}
                  y1={startY}
                  x2={endX}
                  y2={endY}
                  stroke={color}
                  strokeWidth="0.6"
                  strokeLinecap="round"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ 
                    pathLength: [0, 1],
                    opacity: [0, 0.95, 0.9]
                  }}
                  transition={{ 
                    delay: 0.1 + (i % 120) * 0.002,
                    duration: 0.6,
                    repeat: Infinity,
                    repeatDelay: 0.1,
                    ease: "easeOut"
                  }}
                />
              );
            })}
            
            {/* Elegant Boundary Circle */}
            <motion.circle
              cx="500"
              cy="500"
              r="180"
              fill="none"
              stroke="#fbbf24"
              strokeWidth="2.5"
              opacity="0.9"
              animate={{ 
                pathLength: [0, 1],
                opacity: [0.85, 0.95, 0.85]
              }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />
            
            {/* Beautiful Middle Band */}
            {Array.from({ length: 900 }).map((_, i) => {
              const startAngle = (i * 360) / 900;
              const startRad = (startAngle * Math.PI) / 180;
              
              const piDigits = [3, 1, 4, 1, 5, 9, 2, 6, 5, 3, 5, 8, 9, 7, 9];
              const piValue = piDigits[i % piDigits.length];
              const piMultiplier = Math.PI * piValue / 10;
              const variation = Math.sin(piMultiplier) * 30 + Math.cos(piMultiplier * 1.5) * 12;
              const endAngle = (startAngle + variation + (i % 6) * 8) % 360;
              const endRad = (endAngle * Math.PI) / 180;
              
              const startX = 500 + 180 * Math.cos(startRad);
              const startY = 500 + 180 * Math.sin(startRad);
              const endX = 500 + 350 * Math.cos(endRad);
              const endY = 500 + 350 * Math.sin(endRad);
              
              const progress = i / 900;
              const startHSL = [70, 85, 65];
              const endHSL = [180, 75, 60];
              const color = interpolateHSL(startHSL, endHSL, progress);
              
              return (
                <motion.line
                  key={`middle-${i}`}
                  x1={startX}
                  y1={startY}
                  x2={endX}
                  y2={endY}
                  stroke={color}
                  strokeWidth="0.5"
                  strokeLinecap="round"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ 
                    pathLength: [0, 1],
                    opacity: [0, 0.85, 0.8]
                  }}
                  transition={{ 
                    delay: 0.2 + (i % 180) * 0.001,
                    duration: 0.7,
                    repeat: Infinity,
                    repeatDelay: 0.08,
                    ease: "easeOut"
                  }}
                />
              );
            })}
            
            {/* Middle Boundary */}
            <motion.circle
              cx="500"
              cy="500"
              r="350"
              fill="none"
              stroke="#22d3ee"
              strokeWidth="2"
              opacity="0.75"
              animate={{ 
                pathLength: [0, 1],
                opacity: [0.65, 0.8, 0.65]
              }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
            />
            
            {/* Beautiful Outer Band */}
            {Array.from({ length: 1200 }).map((_, i) => {
              const startAngle = (i * 360) / 1200;
              const startRad = (startAngle * Math.PI) / 180;
              
              const piDigits = [3, 1, 4, 1, 5, 9, 2, 6, 5, 3, 5, 8, 9, 7, 9, 3, 2, 3, 8, 4];
              const piValue1 = piDigits[i % piDigits.length];
              const piValue2 = piDigits[(i * 3) % piDigits.length];
              const piPattern1 = Math.PI * piValue1 / 10;
              const piPattern2 = Math.PI * piValue2 / 8;
              const variation = Math.cos(piPattern1) * 25 + Math.sin(piPattern2) * 15 + (i % 8) * 5;
              const endAngle = (startAngle + variation + (i % 4) * 10) % 360;
              const endRad = (endAngle * Math.PI) / 180;
              
              const startX = 500 + 350 * Math.cos(startRad);
              const startY = 500 + 350 * Math.sin(startRad);
              const endX = 500 + 480 * Math.cos(endRad);
              const endY = 500 + 480 * Math.sin(endRad);
              
              const progress = i / 1200;
              const startHSL = [190, 85, 65];
              const endHSL = [220, 75, 45];
              const color = interpolateHSL(startHSL, endHSL, progress);
              
              return (
                <motion.line
                  key={`outer-${i}`}
                  x1={startX}
                  y1={startY}
                  x2={endX}
                  y2={endY}
                  stroke={color}
                  strokeWidth="0.45"
                  strokeLinecap="round"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ 
                    pathLength: [0, 1],
                    opacity: [0, 0.8, 0.75]
                  }}
                  transition={{ 
                    delay: 0.3 + (i % 240) * 0.0008,
                    duration: 0.9,
                    repeat: Infinity,
                    repeatDelay: 0.05,
                    ease: "easeOut"
                  }}
                />
              );
            })}
            
            {/* Outer Edge */}
            <motion.circle
              cx="500"
              cy="500"
              r="480"
              fill="none"
              stroke="#3b82f6"
              strokeWidth="1.5"
              opacity="0.6"
              animate={{ 
                pathLength: [0, 1],
                opacity: [0.5, 0.65, 0.5]
              }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            />
          </svg>
        </div>

        {/* CTA Buttons - Moved to top right for better visibility */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="absolute top-8 md:top-12 lg:top-16 right-8 md:right-12 lg:right-16 z-30"
        >
          <div className="space-y-4">
            <motion.button
              onMouseEnter={() => setHovered(true)}
              onMouseLeave={() => setHovered(false)}
              onClick={onExplore}
              className="px-6 py-3 bg-gray-900 text-white text-sm font-medium tracking-wider uppercase hover:bg-gray-800 transition-all duration-300 border border-gray-900 shadow-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="flex items-center gap-2">
                Explore Work
                <motion.span
                  animate={{ x: hovered ? 5 : 0 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  →
                </motion.span>
              </span>
            </motion.button>
            
            <motion.a
              href="/images/resume-example.pdf"
              download
              className="block px-6 py-2 text-xs text-gray-900 hover:text-gray-700 transition-colors duration-300 tracking-widest uppercase bg-white/90 backdrop-blur-sm border border-gray-300 text-center"
              whileHover={{ y: -2 }}
            >
              Download Resume
            </motion.a>
          </div>
        </motion.div>

        {/* Subtle Stats - Bottom Right */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="absolute bottom-8 md:bottom-12 lg:bottom-16 right-8 md:right-12 lg:right-16 text-right"
        >
          <div className="space-y-2 text-xs md:text-sm text-gray-400 font-light">
            <div>3+ Years</div>
            <div>8+ Projects</div>
            <div>50+ Mentored</div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
