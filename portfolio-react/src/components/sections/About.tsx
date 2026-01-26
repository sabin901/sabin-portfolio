import { motion } from 'framer-motion';

export const About = () => {
  return (
    <section id="about" className="py-20 bg-white dark:bg-gray-900 transition-colors duration-300">
      <div className="w-11/12 md:w-12/12 lg:w-9/12 mx-auto lg:ml-80 max-w-4xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            About Me
          </h2>
        </motion.div>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="prose prose-lg dark:prose-invert max-w-none"
        >
          <p className="text-xl text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
            I love building systems that make processes intuitive. I started programming in high school, and since then I've built tools for classmates and professors that solved real problems.
          </p>

          <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
            Currently studying <strong className="text-gray-900 dark:text-white">Information Systems + Finance</strong> at St. Cloud State University, combining technical skills with business acumen. I'm passionate about using data to drive decisions and building tools that help people work more efficiently.
          </p>

          <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-8">
            Outside of tech, I enjoy reading, hiking, and continuous learning. I believe the best solutions come from understanding both the technical and human sides of problems.
          </p>

          {/* Quick Stats */}
          <div className="grid grid-cols-3 gap-6 mt-12 pt-12 border-t border-gray-200 dark:border-gray-700">
            {[
              { label: 'Years Experience', value: '3+' },
              { label: 'Projects', value: '8+' },
              { label: 'Students Mentored', value: '50+' },
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-3xl font-bold text-gray-900 dark:text-white mb-1">{stat.value}</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
