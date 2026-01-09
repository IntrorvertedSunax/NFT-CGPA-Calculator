import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="w-full mt-12 bg-slate-100/50 dark:bg-slate-950/30 border-t border-slate-200 dark:border-slate-800/60 backdrop-blur-sm">
      <div className="max-w-4xl mx-auto h-24 flex items-center justify-between px-6 sm:px-8">
        {/* Left Side: Developer Info */}
        <div className="flex flex-col items-start">
          <p className="text-slate-500 dark:text-slate-400 text-xs sm:text-sm font-medium flex items-center gap-1.5">
            Developed by{' '}
            <span className="font-bold text-[#0d8181] dark:text-teal-400 transition-colors hover:text-teal-600 dark:hover:text-teal-300 cursor-default">
              Introverted Sunax
            </span>
          </p>
          <div className="flex items-center gap-2 mt-1">
            <span className="w-1.5 h-1.5 rounded-full bg-teal-500/40 dark:bg-teal-400/20"></span>
            <p className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em]">
              EEE GSTU
            </p>
          </div>
        </div>

        {/* Right Side: Message Me Button */}
        <a
          href="https://www.linkedin.com/in/hossain-sumon/"
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center gap-2.5 px-5 py-2.5 bg-white dark:bg-slate-900 hover:bg-[#0d8181] dark:hover:bg-teal-600 border border-slate-200 dark:border-slate-800 rounded-2xl transition-all duration-300 active:scale-95 shadow-sm hover:shadow-teal-500/20"
          aria-label="Message the developer on LinkedIn"
        >
          <div className="flex items-center justify-center w-4 h-4 text-slate-500 group-hover:text-white transition-colors duration-300">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2.5" 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              className="w-full h-full transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300"
            >
              <line x1="22" y1="2" x2="11" y2="13"></line>
              <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
            </svg>
          </div>
          <span className="text-xs sm:text-sm font-bold text-slate-700 dark:text-slate-200 group-hover:text-white transition-colors">
            Message Me
          </span>
        </a>
      </div>
    </footer>
  );
};

export default Footer;