
import React from 'react';
import { Semester } from '../types';

interface CGPAModeProps {
  semesters: Semester[];
  updateManual: (id: string, credits: number, gpa: number) => void;
}

const CGPAMode: React.FC<CGPAModeProps> = ({ semesters, updateManual }) => {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      // Find the parent container that holds all semester item cards
      const container = e.currentTarget.closest('.space-y-3');
      if (container) {
        // Query all number inputs within this container
        const allInputs = Array.from(container.querySelectorAll('input[type="number"]')) as HTMLInputElement[];
        const nextInput = allInputs[index + 1];
        
        if (nextInput) {
          nextInput.focus();
          // Select text on focus for easier overwriting
          nextInput.select();
        } else {
          // If it's the last input, just blur
          e.currentTarget.blur();
        }
      }
    }
  };

  return (
    <div className="pb-4">
      {/* Main Container Card */}
      <div className="bg-white dark:bg-slate-800 rounded-3xl p-4 sm:p-6 shadow-sm border border-slate-100 dark:border-slate-700">
        <h3 className="text-lg font-bold text-[#104e5b] dark:text-slate-100 mb-6 flex items-center gap-2">
          Semester GPA Entry
        </h3>
        
        <div className="space-y-3">
          {semesters.map((s, index) => {
            const courseCredits = s.courses?.reduce((acc, c) => acc + c.credits, 0) || 0;
            const displayCredits = courseCredits > 0 ? courseCredits : (s.manualCredits || 0);

            return (
              <div 
                key={s.id} 
                className="flex items-center justify-between p-4 sm:p-5 rounded-2xl bg-[#f8fafc] dark:bg-slate-900/50 border border-slate-50 dark:border-slate-800 transition-all hover:shadow-md hover:border-slate-200 dark:hover:border-slate-700"
              >
                {/* Left Side: Semester & Credit Info */}
                <div className="flex flex-col">
                  <span className="text-sm sm:text-base font-bold text-slate-700 dark:text-slate-200">
                    Semester {s.label}
                  </span>
                  <div className="flex items-center gap-1 text-[10px] sm:text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wide">
                    <span>{displayCredits.toFixed(2)}</span>
                    <span>Credits</span>
                  </div>
                </div>

                {/* Right Side: Slim GPA Input Pill */}
                <div className="flex items-center">
                  <div className="flex items-center bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2 sm:py-2.5 transition-all focus-within:border-[#0d8181] shadow-sm">
                    <input
                      type="number"
                      step="0.001"
                      min="0"
                      max="4.00"
                      placeholder="0.000"
                      value={s.manualGPA || ''}
                      onKeyDown={(e) => handleKeyDown(e, index)}
                      onChange={(e) => updateManual(s.id, displayCredits, parseFloat(e.target.value) || 0)}
                      className="w-12 sm:w-16 bg-transparent border-none p-0 text-right text-sm sm:text-base font-black text-slate-700 dark:text-slate-200 focus:ring-0 outline-none placeholder:text-slate-300 dark:placeholder:text-slate-600 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CGPAMode;
