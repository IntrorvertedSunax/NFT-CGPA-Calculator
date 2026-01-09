
import React from 'react';
import { Mode } from '../types';

interface ModeSwitcherProps {
  mode: Mode;
  setMode: (mode: Mode) => void;
}

const ModeSwitcher: React.FC<ModeSwitcherProps> = ({ mode, setMode }) => {
  return (
    <div className="flex justify-center my-8">
      <div className="inline-flex p-1.5 bg-[#e8edf4] dark:bg-slate-800 rounded-2xl">
        <button
          onClick={() => setMode(Mode.GPA)}
          className={`flex items-center gap-2 px-8 py-2.5 rounded-xl text-sm font-bold transition-all duration-300 ${
            mode === Mode.GPA
              ? 'bg-white dark:bg-slate-700 text-[#0d8181] shadow-sm'
              : 'text-slate-500 dark:text-slate-400'
          }`}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7" />
          </svg>
          GPA MODE
        </button>
        <button
          onClick={() => setMode(Mode.CGPA)}
          className={`flex items-center gap-2 px-8 py-2.5 rounded-xl text-sm font-bold transition-all duration-300 ${
            mode === Mode.CGPA
              ? 'bg-white dark:bg-slate-700 text-[#0d8181] shadow-sm'
              : 'text-slate-500 dark:text-slate-400'
          }`}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 002-2h-2a2 2 0 00-2 2" />
          </svg>
          CGPA MODE
        </button>
      </div>
    </div>
  );
};

export default ModeSwitcher;
