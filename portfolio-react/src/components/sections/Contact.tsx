import { motion } from 'framer-motion';
import { ContactForm } from '../forms/ContactForm';

export const Contact = () => {
  return (
    <section id="contact" className="py-20 bg-white dark:bg-gray-900 transition-colors duration-300">
      <div className="w-11/12 md:w-12/12 lg:w-9/12 mx-auto lg:ml-80 max-w-4xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Let's Build Something Great
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Have a project in mind or want to discuss opportunities? Get in touch.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div>
              <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-4">
                Contact
              </h3>
              <div className="space-y-3">
                <a
                  href="mailto:sabinraut343@gmail.com"
                  className="block text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
                >
                  sabinraut343@gmail.com
                </a>
                <a
                  href="https://linkedin.com/in/sabin-raut"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
                >
                  LinkedIn
                </a>
                <a
                  href="https://github.com/sabin901"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
                >
                  GitHub
                </a>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-4">
                Location
              </h3>
              <p className="text-gray-700 dark:text-gray-300">
                St. Cloud, MN<br />
                Open to relocate
              </p>
            </div>
          </motion.div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
};
