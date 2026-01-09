
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="mt-6 sm:mt-10 py-5 sm:py-8 border-t border-slate-200 dark:border-slate-800">
      <div className="flex flex-row items-center justify-between gap-4">
        {/* Left Side: Developer Info */}
        <div className="text-left">
          <p className="text-slate-600 dark:text-slate-300 text-xs sm:text-sm font-medium leading-tight">
            Developed by{' '}
            <span className="font-bold text-[#7c5dfa] dark:text-[#a29bfe]">
              Introverted Sunax
            </span>
          </p>
          <p className="text-[9px] sm:text-[11px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest mt-1">
            GSTU • EEE
          </p>
        </div>

        {/* Right Side: Message Me Button */}
        <a
          href="https://www.linkedin.com/in/introvertedsunax/"
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center gap-2.5 px-4 py-2 sm:px-5 sm:py-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-full shadow-sm hover:shadow-md hover:border-slate-300 dark:hover:border-slate-600 transition-all duration-300"
        >
          <div className="flex items-center justify-center w-4 h-4 text-slate-400 group-hover:text-[#0d8181] group-hover:scale-110 transition-all duration-300">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2.5" 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              className="w-full h-full"
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
