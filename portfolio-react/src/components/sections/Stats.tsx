import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface Stat {
  value: string;
  label: string;
}

const stats: Stat[] = [
  { value: '50+', label: 'Students Mentored' },
  { value: '40%', label: 'Efficiency Improvement' },
  { value: '8+', label: 'Projects Completed' },
  { value: '3+', label: 'Years Experience' },
];

export const Stats = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const element = document.getElementById('stats-section');
    if (element) {
      observer.observe(element);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section id="stats-section" className="py-12 bg-gray-900 dark:bg-gray-900 border-t border-gray-800">
      <div className="w-11/12 md:w-12/12 lg:w-9/12 mx-auto">
        <div className="font-mono text-green-400 text-sm mb-4 text-center">
          $ cat stats.txt
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-gray-800 border border-gray-700 rounded-lg p-6 text-center font-mono"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={isVisible ? { scale: 1 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 + 0.2, type: 'spring' }}
                className="text-3xl md:text-4xl font-bold text-green-400 mb-1"
              >
                {stat.value}
              </motion.div>
              <div className="text-xs text-gray-400">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
