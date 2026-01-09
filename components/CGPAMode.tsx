import React, { useState } from 'react';
import { Semester } from '../types';

interface CGPAModeProps {
  semesters: Semester[];
  updateManual: (id: string, credits: number, gpa: number) => void;
  resetAllManual: () => void;
}

const CGPAMode: React.FC<CGPAModeProps> = ({ semesters, updateManual, resetAllManual }) => {
  const [showModal, setShowModal] = useState(false);

  const confirmResetAll = () => {
    resetAllManual();
    setShowModal(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const container = e.currentTarget.closest('.space-y-3');
      if (container) {
        const allInputs = Array.from(container.querySelectorAll('input[type="number"]')) as HTMLInputElement[];
        const nextInput = allInputs[index + 1];
        
        if (nextInput) {
          nextInput.focus();
          nextInput.select();
        } else {
          e.currentTarget.blur();
        }
      }
    }
  };

  return (
    <div className="pb-4">
      {/* Reset Confirmation Modal */}
      {showModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div 
            className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
            onClick={() => setShowModal(false)}
          />
          <div className="relative bg-white dark:bg-slate-800 rounded-[2rem] p-8 shadow-2xl max-w-sm w-full border border-slate-100 dark:border-slate-700 animate-in zoom-in-95 slide-in-from-bottom-4 duration-300">
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-rose-50 dark:bg-rose-900/20 rounded-2xl flex items-center justify-center mb-4 text-rose-500">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-2">Reset All Data?</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 mb-8 leading-relaxed">
                This will clear GPA entries for <span className="font-bold text-slate-700 dark:text-slate-200">all semesters</span>. This action cannot be undone.
              </p>
              
              <div className="grid grid-cols-2 gap-3 w-full">
                <button
                  onClick={() => setShowModal(false)}
                  className="py-3.5 rounded-2xl font-bold text-sm bg-slate-100 hover:bg-slate-200 dark:bg-slate-700 dark:hover:bg-slate-600 text-slate-600 dark:text-slate-300 transition-all"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmResetAll}
                  className="py-3.5 rounded-2xl font-bold text-sm bg-rose-500 hover:bg-rose-600 text-white shadow-lg shadow-rose-500/20 transition-all active:scale-95"
                >
                  Confirm Reset
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

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

                {/* Right Side: GPA Input */}
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

        {/* Reset All Button at the bottom */}
        <div className="mt-8 flex justify-center">
          <button
            onClick={() => setShowModal(true)}
            className="group flex items-center gap-3 px-12 py-4 rounded-2xl font-bold text-sm bg-rose-500 hover:bg-rose-600 text-white shadow-xl shadow-rose-500/30 dark:bg-rose-600 dark:hover:bg-rose-500 transition-all duration-300 active:scale-95"
          >
            <div className="transition-transform duration-300 group-hover:rotate-12">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </div>
            Reset All
          </button>
        </div>
      </div>
    </div>
  );
};

export default CGPAMode;