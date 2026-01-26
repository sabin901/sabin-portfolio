import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Principle {
  id: string;
  statement: string;
  explanation: string;
  icon: string;
  color: string;
}

const principles: Principle[] = [
  {
    id: 'first-solution',
    icon: '🔍',
    statement: "I don't trust the first solution.",
    explanation: "The first idea is usually obvious. The second or third iteration is where real insight lives. I always ask: 'What if we did the opposite?' or 'What's the simplest version of this?'",
    color: 'from-red-500 to-orange-500'
  },
  {
    id: 'explanation',
    icon: '✨',
    statement: "If something needs explanation, I redesign it.",
    explanation: "Good design is self-explanatory. If I find myself writing long documentation or adding tooltips everywhere, that's a sign the interface needs work. Clarity beats cleverness.",
    color: 'from-blue-500 to-cyan-500'
  },
  {
    id: 'ai-judgment',
    icon: '🤝',
    statement: "AI is fast. Judgment is rare.",
    explanation: "AI can generate code, write copy, and create designs in seconds. But it can't make judgment calls about what matters, what to prioritize, or what feels right. That's where human thinking becomes irreplaceable.",
    color: 'from-purple-500 to-pink-500'
  },
  {
    id: 'messy-start',
    icon: '🎨',
    statement: "I start messy, then make it calm.",
    explanation: "First drafts are supposed to be chaotic. I get everything out, then systematically simplify. It's easier to remove than to add, and clarity comes from subtraction.",
    color: 'from-emerald-500 to-teal-500'
  },
  {
    id: 'user-value',
    icon: '💡',
    statement: "Every feature should answer: 'Why would someone care?'",
    explanation: "Not every idea needs to be built. Before adding anything, I ask if it solves a real problem or if it's just 'nice to have.' Real value comes from solving actual pain points, not from feature lists.",
    color: 'from-amber-500 to-yellow-500'
  }
];

export const HowIThink = () => {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-white py-20 px-6">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-4 tracking-tight">
            How I Think
          </h2>
          <p className="text-xl text-gray-600 font-light max-w-2xl mx-auto leading-relaxed">
            Five principles that guide how I approach problems and build solutions.
          </p>
        </motion.div>

        {/* Principles */}
        <div className="space-y-4">
          {principles.map((principle, index) => (
            <motion.div
              key={principle.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.01 }}
              className="bg-gray-50 border-2 border-transparent rounded-xl overflow-hidden hover:border-gray-900 transition-all hover:shadow-lg"
            >
              <button
                onClick={() => setExpandedId(expandedId === principle.id ? null : principle.id)}
                className="w-full text-left p-6 md:p-8 hover:bg-white transition-colors flex items-center justify-between group"
              >
                <div className="flex items-center gap-4 flex-1">
                  <div className="text-4xl">{principle.icon}</div>
                  <span className="text-2xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                    {principle.statement}
                  </span>
                </div>
                <motion.span
                  animate={{ rotate: expandedId === principle.id ? 180 : 0 }}
                  className="text-gray-400 text-2xl flex-shrink-0 ml-4"
                >
                  ↓
                </motion.span>
              </button>

              <AnimatePresence>
                {expandedId === principle.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 md:px-8 pb-6 md:pb-8 pt-0 border-t border-gray-200 bg-white">
                      <div className={`h-1 w-full bg-gradient-to-r ${principle.color} rounded-full mb-4`}></div>
                      <p className="text-gray-700 font-light leading-relaxed text-lg">
                        {principle.explanation}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};
