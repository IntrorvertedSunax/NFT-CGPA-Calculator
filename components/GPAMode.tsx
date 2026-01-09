import React, { useState } from 'react';
import { Semester, Grade } from '../types';
import { GRADE_POINTS } from '../constants';

interface GPAModeProps {
  semesters: Semester[];
  activeId: string;
  setActiveId: (id: string) => void;
  updateGrade: (semId: string, courseId: string, grade: Grade) => void;
  resetGrades: (semId: string) => void;
}

const GPAMode: React.FC<GPAModeProps> = ({ semesters, activeId, setActiveId, updateGrade, resetGrades }) => {
  const activeSemester = semesters.find(s => s.id === activeId);
  const grades: Grade[] = ['A+', 'A', 'A-', 'B+', 'B', 'B-', 'C+', 'C', 'D', 'F'];
  const [showModal, setShowModal] = useState(false);

  const confirmReset = () => {
    resetGrades(activeId);
    setShowModal(false);
  };

  return (
    <div className="space-y-6">
      {/* Confirmation Modal */}
      {showModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div 
            className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
            onClick={() => setShowModal(false)}
          />
          <div className="relative bg-white dark:bg-slate-800 rounded-[2rem] p-8 shadow-2xl max-sm w-full border border-slate-100 dark:border-slate-700 animate-in zoom-in-95 slide-in-from-bottom-4 duration-300">
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-rose-50 dark:bg-rose-900/20 rounded-2xl flex items-center justify-center mb-4 text-rose-500">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-2">Reset Grades?</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 mb-8 leading-relaxed">
                This will clear all grade selections for Semester <span className="font-bold text-slate-700 dark:text-slate-200">{activeSemester?.label}</span>. This action cannot be undone.
              </p>
              
              <div className="grid grid-cols-2 gap-3 w-full">
                <button
                  onClick={() => setShowModal(false)}
                  className="py-3.5 rounded-2xl font-bold text-sm bg-slate-100 hover:bg-slate-200 dark:bg-slate-700 dark:hover:bg-slate-600 text-slate-600 dark:text-slate-300 transition-all"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmReset}
                  className="py-3.5 rounded-2xl font-bold text-sm bg-rose-500 hover:bg-rose-600 text-white shadow-lg shadow-rose-500/20 transition-all active:scale-95"
                >
                  Confirm Reset
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Unified Container for Semester Selection & Course List */}
      <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-100 dark:border-slate-700 flex flex-col">
        {/* Header Section */}
        <div className="flex items-center gap-3 mb-6">
          <svg className="w-6 h-6 text-[#0d8181]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
          </svg>
          <h3 className="text-lg font-bold text-[#104e5b] dark:text-slate-100">Semester & Courses</h3>
        </div>

        {/* Semester Selection Grid */}
        <div className="grid grid-cols-4 gap-3 sm:gap-4 mb-8">
          {semesters.map((s) => (
            <button
              key={s.id}
              onClick={() => setActiveId(s.id)}
              className={`py-3.5 sm:py-4 rounded-xl font-bold text-xs sm:text-sm transition-all duration-200 border-2 ${
                activeId === s.id
                  ? 'bg-[#f0f9f9] border-[#0d8181] text-[#0d8181] shadow-sm'
                  : 'bg-[#f1f5f9] border-transparent text-slate-600 hover:bg-[#e2e8f0] dark:bg-slate-700/50 dark:text-slate-400 dark:hover:bg-slate-700'
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>

        {/* Divider */}
        <div className="h-px w-full bg-slate-100 dark:bg-slate-700 mb-8" />
        
        {/* Content Area */}
        {!activeId ? (
          /* Placeholder when no semester is selected */
          <div className="flex-grow flex flex-col items-center justify-center text-center p-12 py-16">
            <h4 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-2">Select a Semester</h4>
            <p className="text-slate-500 dark:text-slate-400 max-w-[240px] leading-relaxed">
              Pick a semester from the grid above to start entering your grades.
            </p>
          </div>
        ) : activeSemester && activeSemester.courses.length > 0 ? (
          /* Course List when a semester is selected */
          <>
            <div className="space-y-4 flex-grow">
              {activeSemester.courses.map((course) => (
                <div 
                  key={course.id}
                  className="flex items-start sm:items-center justify-between gap-4 p-5 rounded-2xl bg-[#f8fafc] dark:bg-slate-900/50 border border-slate-50 dark:border-slate-800 transition-all hover:shadow-md"
                >
                  <div className="flex-grow min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <span className="px-2 py-0.5 rounded-md bg-slate-200 dark:bg-slate-700 text-[9px] sm:text-[10px] font-black text-slate-600 dark:text-slate-300 whitespace-nowrap">
                        {course.code}
                      </span>
                      <span className="text-[10px] sm:text-[11px] font-black text-[#0d8181] dark:text-teal-400 uppercase tracking-tighter whitespace-nowrap">
                        {course.credits.toFixed(1)} Credits
                      </span>
                    </div>
                    <h4 className="text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-200 break-words leading-tight">
                      {course.title}
                    </h4>
                  </div>

                  <div className="flex-shrink-0 relative">
                    <select
                      value={course.grade}
                      onChange={(e) => updateGrade(activeId, course.id, e.target.value as Grade)}
                      className="w-28 sm:w-40 bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2.5 text-xs sm:text-sm font-bold text-slate-700 dark:text-slate-200 outline-none focus:border-[#0d8181] transition-all cursor-pointer appearance-none"
                    >
                      <option value="">N/A</option>
                      {grades.map(g => (
                        <option key={g} value={g}>
                          {g} {g === 'F' ? '(Retake)' : `(${GRADE_POINTS[g].toFixed(2)})`}
                        </option>
                      ))}
                    </select>
                    <div className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                       <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                       </svg>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Reset Button (Prominent and normal style) */}
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
                Reset
              </button>
            </div>
          </>
        ) : (
          /* Fallback when a semester is selected but has no courses */
          <div className="flex-grow flex flex-col items-center justify-center text-center p-12">
            <div className="w-16 h-16 bg-slate-50 dark:bg-slate-900 rounded-2xl flex items-center justify-center mb-4 text-slate-300 dark:text-slate-700">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <p className="text-slate-500 dark:text-slate-400 font-medium">No course info available for semester {activeId}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default GPAMode;