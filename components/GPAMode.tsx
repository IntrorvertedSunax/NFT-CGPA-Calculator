
import React from 'react';
import { Semester, Grade } from '../types';

interface GPAModeProps {
  semesters: Semester[];
  activeId: string;
  setActiveId: (id: string) => void;
  updateGrade: (semId: string, courseId: string, grade: Grade) => void;
}

const GPAMode: React.FC<GPAModeProps> = ({ semesters, activeId, setActiveId, updateGrade }) => {
  const activeSemester = semesters.find(s => s.id === activeId);
  const grades: Grade[] = ['A+', 'A', 'A-', 'B+', 'B', 'B-', 'C+', 'C', 'D', 'F'];

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-100 dark:border-slate-700">
        <div className="flex items-center gap-3 mb-6">
          <svg className="w-6 h-6 text-[#0d8181]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
          </svg>
          <h3 className="text-lg font-bold text-[#104e5b] dark:text-slate-100">Select Semester</h3>
        </div>

        <div className="grid grid-cols-4 gap-4">
          {semesters.map((s) => (
            <button
              key={s.id}
              onClick={() => setActiveId(s.id)}
              className={`py-4 rounded-xl font-bold text-sm transition-all duration-200 border-2 ${
                activeId === s.id
                  ? 'bg-[#f0f9f9] border-[#0d8181] text-[#0d8181] shadow-sm'
                  : 'bg-[#f1f5f9] border-transparent text-slate-600 hover:bg-[#e2e8f0] dark:bg-slate-700/50 dark:text-slate-400 dark:hover:bg-slate-700'
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-100 dark:border-slate-700 min-h-[300px] flex flex-col">
        <h3 className="text-lg font-bold text-[#104e5b] dark:text-slate-100 mb-8 flex items-center gap-2">
          Course Grade List
        </h3>
        
        {activeSemester && activeSemester.courses.length > 0 ? (
          <div className="space-y-4">
            {activeSemester.courses.map((course) => (
              <div 
                key={course.id}
                className="flex items-start sm:items-center justify-between gap-4 p-5 rounded-2xl bg-[#f8fafc] dark:bg-slate-900/50 border border-slate-50 dark:border-slate-800 transition-all hover:shadow-md"
              >
                {/* Course Details - Now on Left */}
                <div className="flex-grow min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <span className="px-2 py-0.5 rounded-md bg-teal-100 dark:bg-teal-900/40 text-[9px] sm:text-[10px] font-black text-teal-700 dark:text-teal-400 whitespace-nowrap">
                      {course.code}
                    </span>
                    <span className="text-[9px] sm:text-[10px] font-bold text-slate-400 uppercase tracking-tighter">
                      {course.credits} Credits
                    </span>
                  </div>
                  <h4 className="text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-200 break-words leading-tight">
                    {course.title}
                  </h4>
                </div>

                {/* Grade Dropdown - Now on Right */}
                <div className="flex-shrink-0 relative">
                  <select
                    value={course.grade}
                    onChange={(e) => updateGrade(activeId, course.id, e.target.value as Grade)}
                    className="w-24 sm:w-32 bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2.5 text-xs sm:text-sm font-bold text-slate-700 dark:text-slate-200 outline-none focus:border-[#0d8181] transition-all cursor-pointer appearance-none"
                  >
                    <option value="">N/A</option>
                    {grades.map(g => (
                      <option key={g} value={g}>{g}</option>
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
        ) : (
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
