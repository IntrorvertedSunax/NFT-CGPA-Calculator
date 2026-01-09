
import React from 'react';

interface ScorecardProps {
  score: string;
  offered: number;
  secured: number;
  label: string;
  offeredLabel: string;
  securedLabel: string;
}

const Scorecard: React.FC<ScorecardProps> = ({ 
  score, 
  offered, 
  secured, 
  label, 
  offeredLabel, 
  securedLabel 
}) => {
  return (
    <div className="relative overflow-hidden rounded-[2.5rem] bg-[#0d8181] p-6 sm:p-10 text-white shadow-xl shadow-teal-900/20 transition-all">
      <div className="relative z-10 flex flex-col items-center">
        {/* Top Section: Result Label & Big Score */}
        <div className="mb-6 text-center">
          <span className="block text-white/70 text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em] mb-1">
            {label}
          </span>
          <h2 className="text-6xl sm:text-8xl font-bold tracking-tight leading-none">
            {score}
          </h2>
        </div>
        
        {/* Bottom Section: Compact Glass Tiles */}
        <div className="grid grid-cols-2 gap-4 w-full max-w-md mx-auto">
          {/* Tile 1 (Offered / Total Credits) */}
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-4 flex flex-col items-center justify-center border border-white/10 shadow-lg">
            <div className="flex items-center gap-2 mb-1 opacity-90">
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
              <span className="text-[10px] text-white uppercase font-bold tracking-tight whitespace-nowrap">
                {offeredLabel}
              </span>
            </div>
            <span className="text-2xl sm:text-3xl font-black leading-none">
              {Math.round(offered)}
            </span>
          </div>

          {/* Tile 2 (Secured / Total Semesters) */}
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-4 flex flex-col items-center justify-center border border-white/10 shadow-lg">
            <div className="flex items-center gap-2 mb-1 opacity-90">
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-[10px] text-white uppercase font-bold tracking-tight whitespace-nowrap">
                {securedLabel}
              </span>
            </div>
            <span className="text-2xl sm:text-3xl font-black leading-none">
              {Math.round(secured)}
            </span>
          </div>
        </div>
      </div>
      
      {/* Subtle background glow for extra depth */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-white/5 rounded-full blur-[80px] pointer-events-none" />
    </div>
  );
};

export default Scorecard;
