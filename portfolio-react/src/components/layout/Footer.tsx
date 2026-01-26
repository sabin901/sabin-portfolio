export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 text-gray-700 dark:text-gray-300 py-12 transition-colors duration-300">
      <div className="w-11/12 md:w-12/12 lg:w-9/12 mx-auto lg:ml-80">
        <div className="text-center">
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
            Let's build something great together.
          </p>
          <div className="flex justify-center gap-6 mb-6">
            <a
              href="mailto:sabinraut343@gmail.com"
              className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
              aria-label="Email"
            >
              Email
            </a>
            <a
              href="https://linkedin.com/in/sabin-raut"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
              aria-label="LinkedIn"
            >
              LinkedIn
            </a>
            <a
              href="https://github.com/sabin901"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
              aria-label="GitHub"
            >
              GitHub
            </a>
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-500">
            &copy; {currentYear} Sabin Raut. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};
