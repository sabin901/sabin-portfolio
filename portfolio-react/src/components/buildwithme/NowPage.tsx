import { motion } from 'framer-motion';

export const NowPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-20 px-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-4 tracking-tight">
            Now
          </h2>
          <p className="text-xl text-gray-600 font-light max-w-2xl mx-auto leading-relaxed">
            What I'm exploring, what I stopped doing, and what I'm curious about.
          </p>
          <p className="text-sm text-gray-500 font-light mt-4">
            Updated monthly
          </p>
        </motion.div>

        {/* Content */}
        <div className="space-y-8">
          {/* Currently Exploring */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white border-2 border-transparent rounded-xl p-8 md:p-12 hover:border-gray-900 transition-all hover:shadow-xl"
          >
            <div className="flex items-center gap-3 mb-6">
              <span className="text-4xl">🌱</span>
              <h3 className="text-2xl font-bold text-gray-900">Currently Exploring</h3>
            </div>
            <ul className="space-y-4 text-gray-700 font-light">
              <li className="flex items-start gap-3">
                <span className="text-emerald-600 mt-1 text-xl">→</span>
                <span className="leading-relaxed text-lg">Building better ways to collaborate with AI — not replacing thinking, but augmenting it</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-emerald-600 mt-1 text-xl">→</span>
                <span className="leading-relaxed text-lg">Exploring how to make complex data systems feel simple and approachable</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-emerald-600 mt-1 text-xl">→</span>
                <span className="leading-relaxed text-lg">Learning more about financial modeling and how it intersects with data engineering</span>
              </li>
            </ul>
          </motion.div>

          {/* Stopped Doing */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="bg-white border-2 border-transparent rounded-xl p-8 md:p-12 hover:border-gray-900 transition-all hover:shadow-xl"
          >
            <div className="flex items-center gap-3 mb-6">
              <span className="text-4xl">✋</span>
              <h3 className="text-2xl font-bold text-gray-900">Stopped Doing</h3>
            </div>
            <ul className="space-y-4 text-gray-700 font-light">
              <li className="flex items-start gap-3">
                <span className="text-red-600 mt-1 text-xl">→</span>
                <span className="leading-relaxed text-lg">Trying to learn every new framework that comes out — focusing on depth over breadth</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-red-600 mt-1 text-xl">→</span>
                <span className="leading-relaxed text-lg">Building features \"just in case\" — now I only build what solves real problems</span>
              </li>
            </ul>
          </motion.div>

          {/* Open Question */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="bg-white border-2 border-transparent rounded-xl p-8 md:p-12 hover:border-gray-900 transition-all hover:shadow-xl"
          >
            <div className="flex items-center gap-3 mb-6">
              <span className="text-4xl">❓</span>
              <h3 className="text-2xl font-bold text-gray-900">Open Question</h3>
            </div>
            <p className="text-gray-700 font-light text-lg leading-relaxed">
              How do we make AI collaboration feel more like pair programming and less like prompt engineering? 
              I'm curious about building tools that help people think better, not just generate faster.
            </p>
          </motion.div>

          {/* Contact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="text-center pt-8 border-t border-gray-200"
          >
            <p className="text-gray-600 font-light mb-6 text-lg">
              Want to build something together?
            </p>
            <motion.a
              href="mailto:sabinraut343@gmail.com"
              className="inline-block px-8 py-4 bg-gray-900 text-white rounded-xl hover:bg-gray-800 transition-colors font-semibold hover:scale-105 shadow-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Get in touch
            </motion.a>
          </motion.div>
        </div>
      </div>
    </div>
  );
};
