import { motion } from 'framer-motion';
import { useState } from 'react';

interface CodeBlockProps {
  code: string;
  language: string;
  title?: string;
  showLineNumbers?: boolean;
  className?: string;
}

export const CodeBlock = ({ code, language, title, showLineNumbers = true, className = '' }: CodeBlockProps) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const lines = code.split('\n');

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={`bg-gray-800 border border-gray-700 rounded-lg overflow-hidden hover:border-green-400 transition-all ${className}`}
    >
      {/* Terminal Header */}
      <div className="bg-gray-900 px-4 py-2 flex items-center justify-between border-b border-gray-700">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <div className="w-2 h-2 rounded-full bg-red-500"></div>
            <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
            <div className="w-2 h-2 rounded-full bg-green-500"></div>
          </div>
          <span className="text-gray-400 text-xs font-mono">{title || language}</span>
        </div>
        <button
          onClick={handleCopy}
          className="text-gray-400 hover:text-green-400 text-xs font-mono transition-colors flex items-center gap-1"
        >
          {copied ? (
            <>
              <span>✓</span>
              <span>Copied</span>
            </>
          ) : (
            <>
              <span>$</span>
              <span>copy</span>
            </>
          )}
        </button>
      </div>

      {/* Code Content */}
      <div className="p-4 overflow-x-auto bg-gray-900">
        <pre className="text-xs font-mono text-gray-300">
          <code>
            {showLineNumbers ? (
              <div className="flex">
                <div className="text-gray-600 mr-4 select-none">
                  {lines.map((_, i) => (
                    <div key={i}>{i + 1}</div>
                  ))}
                </div>
                <div className="flex-1">
                  {lines.map((line, i) => (
                    <div key={i} className="hover:bg-gray-800/50 px-2 rounded">
                      {line || '\u00A0'}
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div>
                {lines.map((line, i) => (
                  <div key={i}>{line || '\u00A0'}</div>
                ))}
              </div>
            )}
          </code>
        </pre>
      </div>
    </motion.div>
  );
};
