import React from 'react';
import { LogoSVG } from '../constants';

interface HeaderProps {
  darkMode: boolean;
  toggleDarkMode: () => void;
}

const Header: React.FC<HeaderProps> = ({ darkMode, toggleDarkMode }) => {
  return (
    <header className="sticky top-0 z-50 w-full bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-b border-slate-200/50 dark:border-slate-800/50 shadow-sm transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 h-20 flex items-center justify-between">
        <div className="flex items-center gap-4 group">
          <div className="transition-transform duration-500 group-hover:scale-110">
            <LogoSVG />
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] font-black text-[#0d8181] dark:text-teal-500 tracking-[0.25em] uppercase opacity-80">
              DEPARTMENT OF
            </span>
            <h1 className="text-sm sm:text-xl font-bold flex flex-wrap gap-x-1 items-baseline tracking-tight">
              <span className="text-slate-800 dark:text-white">Nutrition and Food Technology,</span>
              <span className="text-[#0d8181] dark:text-teal-400">JUST</span>
            </h1>
          </div>
        </div>
        
        <button
          onClick={toggleDarkMode}
          className="p-3 rounded-2xl bg-slate-100/50 dark:bg-slate-800/50 text-slate-500 dark:text-slate-400 hover:text-[#0d8181] dark:hover:text-teal-400 hover:bg-white dark:hover:bg-slate-800 border border-transparent hover:border-slate-200 dark:hover:border-slate-700 transition-all duration-300 active:scale-90 shadow-sm"
          aria-label="Toggle Theme"
        >
          {darkMode ? (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m12.728 0l-.707-.707M6.343 6.343l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          ) : (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
            </svg>
          )}
        </button>
      </div>
    </header>
  );
};

export default Header;