import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="mt-8 border-t border-slate-200/60 dark:border-slate-800/60">
      <div className="max-w-7xl mx-auto h-20 flex items-center justify-between px-4 sm:px-8">
        {/* Left Side: Developer Info */}
        <div className="flex flex-col items-start">
          <p className="text-slate-500 dark:text-slate-400 text-xs sm:text-sm font-medium">
            Developed by{' '}
            <span className="font-bold text-[#0d8181] dark:text-teal-400">
              Introverted Sunax
            </span>
          </p>
          <div className="flex items-center gap-2 mt-0.5">
            <span className="w-1 h-1 rounded-full bg-slate-300 dark:bg-slate-700 hidden sm:block"></span>
            <p className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-[0.15em]">
              EEE GSTU
            </p>
          </div>
        </div>

        {/* Right Side: Message Me Button */}
        <a
          href="https://www.linkedin.com/in/hossain-sumon/"
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center gap-2 sm:gap-3 px-4 sm:px-6 py-2 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800/50 dark:hover:bg-slate-800 border border-transparent hover:border-slate-200 dark:hover:border-slate-700 rounded-xl sm:rounded-2xl transition-all duration-300 active:scale-95"
          aria-label="Message the developer on LinkedIn"
        >
          <div className="flex items-center justify-center w-4 h-4 sm:w-5 sm:h-5 text-slate-500 group-hover:text-[#0d8181] dark:group-hover:text-teal-400 transition-colors duration-300">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              className="w-full h-full transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300"
            >
              <line x1="22" y1="2" x2="11" y2="13"></line>
              <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
            </svg>
          </div>
          <span className="text-xs sm:text-sm font-bold text-slate-700 dark:text-slate-200">
            Message Me
          </span>
        </a>
      </div>
    </footer>
  );
};

export default Footer;