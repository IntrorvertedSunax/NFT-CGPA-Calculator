
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="mt-12 py-8 border-t border-slate-200 dark:border-slate-800 text-center">
      <p className="text-slate-500 dark:text-slate-400 text-sm flex items-center justify-center gap-2">
        Developed by <span className="font-bold text-teal-600 dark:text-teal-400">Introverted Sunax</span>
        <a 
          href="https://linkedin.com" 
          target="_blank" 
          rel="noopener noreferrer"
          className="p-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-400 hover:text-blue-600 transition-colors"
        >
          <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
            <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
          </svg>
        </a>
      </p>
      <p className="text-[10px] text-slate-400 mt-2 uppercase tracking-tighter">
        © 2024 Jashore University of Science and Technology
      </p>
    </footer>
  );
};

export default Footer;
