
import React from 'react';
import { Semester } from '../types';

interface CGPAModeProps {
  semesters: Semester[];
  updateManual: (id: string, credits: number, gpa: number) => void;
}

const CGPAMode: React.FC<CGPAModeProps> = ({ semesters, updateManual }) => {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 dark:bg-slate-900/50 text-slate-500 dark:text-slate-400 uppercase text-[10px] tracking-widest font-bold">
              <th className="px-6 py-4">Semester</th>
              <th className="px-6 py-4">Total Credits</th>
              <th className="px-6 py-4">Semester GPA</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
            {semesters.map((s) => (
              <tr key={s.id} className="hover:bg-slate-50 dark:hover:bg-slate-900/30 transition-colors">
                <td className="px-6 py-4">
                  <span className="font-bold text-slate-700 dark:text-slate-200">{s.label}</span>
                </td>
                <td className="px-6 py-4">
                  <input
                    type="number"
                    step="0.1"
                    min="0"
                    placeholder="0.0"
                    value={s.manualCredits || ''}
                    onChange={(e) => updateManual(s.id, parseFloat(e.target.value) || 0, s.manualGPA || 0)}
                    className="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2 text-sm font-bold text-slate-700 dark:text-slate-200 outline-none focus:ring-2 ring-teal-500/50"
                  />
                </td>
                <td className="px-6 py-4">
                   <input
                    type="number"
                    step="0.01"
                    min="0"
                    max="4.00"
                    placeholder="0.00"
                    value={s.manualGPA || ''}
                    onChange={(e) => updateManual(s.id, s.manualCredits || 0, parseFloat(e.target.value) || 0)}
                    className="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2 text-sm font-bold text-slate-700 dark:text-slate-200 outline-none focus:ring-2 ring-teal-500/50"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CGPAMode;
