import { motion } from 'framer-motion';

export const Resume = () => {
  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = '/images/resume-example.pdf';
    link.download = 'Sabin_Raut_Resume.pdf';
    link.click();
  };

  return (
    <section id="resume" className="py-20 bg-white dark:bg-gray-900 transition-colors duration-300">
      <div className="w-11/12 md:w-12/12 lg:w-9/12 mx-auto lg:ml-80 max-w-4xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Resume
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Download my resume or view it online
          </p>
        </motion.div>
        
        {/* Download Options */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="flex flex-col sm:flex-row gap-4 mb-12"
        >
          <button
            onClick={handleDownload}
            className="bg-gray-900 dark:bg-white text-white dark:text-gray-900 px-8 py-4 rounded-lg font-semibold hover:bg-gray-800 dark:hover:bg-gray-100 transition-all shadow-lg"
          >
            Download PDF Resume
          </button>
          <a
            href="https://linkedin.com/in/sabin-raut"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white dark:bg-gray-800 border-2 border-gray-900 dark:border-gray-700 text-gray-900 dark:text-white px-8 py-4 rounded-lg font-semibold hover:bg-gray-50 dark:hover:bg-gray-700 transition-all text-center"
          >
            View LinkedIn Profile
          </a>
        </motion.div>
      </div>
    </section>
  );
};
