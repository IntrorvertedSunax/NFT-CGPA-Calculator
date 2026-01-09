
import React, { useMemo, useState } from 'react';
import { createPortal } from 'react-dom';
import { Semester, Grade, Mode } from '../types';
import { GRADE_POINTS } from '../constants';

interface DownloadPDFProps {
  mode: Mode;
  activeSemester?: Semester;
  semesters: Semester[];
  stats: {
    score: string;
    offered: number;
    secured: number;
  };
}

const DownloadPDF: React.FC<DownloadPDFProps> = ({ mode, activeSemester, semesters, stats }) => {
  const [isPreparing, setIsPreparing] = useState(false);

  const handleDownload = () => {
    setIsPreparing(true);
    // Short delay to ensure any state updates or portal renders are flushed
    setTimeout(() => {
      window.print();
      setIsPreparing(false);
    }, 100);
  };

  // Determine if the button should be active (at least one grade selected)
  const isActive = useMemo(() => {
    if (mode === Mode.GPA) {
      return activeSemester?.courses.some(c => c.grade !== '') || false;
    } else {
      return semesters.some(s => (s.manualCredits || 0) > 0 && (s.manualGPA || 0) > 0);
    }
  }, [mode, activeSemester, semesters]);

  const getReportSummary = () => {
    if (mode === Mode.GPA && activeSemester) {
      const attemptedCourses = activeSemester.courses.filter(c => c.grade !== '');
      const creditAttempted = attemptedCourses.reduce((acc, c) => acc + c.credits, 0);
      const pointsSecured = attemptedCourses.reduce((acc, c) => acc + (GRADE_POINTS[c.grade] * c.credits), 0);
      
      return {
        offered: activeSemester.courses.reduce((acc, c) => acc + c.credits, 0).toFixed(2),
        attempted: creditAttempted.toFixed(2),
        secured: stats.secured.toFixed(2),
        points: pointsSecured.toFixed(2),
        score: stats.score
      };
    }
    return null;
  };

  const summary = getReportSummary();

  // The Print Template Component
  const PrintTemplate = (
    <div id="print-report-root" className="fixed inset-0 bg-white z-[9999] hidden print:block text-black font-sans p-0 m-0">
      <style>{`
        @media screen {
          #print-report-root { display: none !important; }
        }
        @media print {
          /* Hide everything except our portal root */
          body > *:not(#print-report-root) { display: none !important; }
          #root { display: none !important; }
          
          #print-report-root { 
            display: block !important; 
            position: relative !important;
            width: 100% !important;
            height: auto !important;
            background: white !important;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }

          @page {
            margin: 1.5cm;
            size: A4;
          }

          .print-header { text-align: center; margin-bottom: 3rem; }
          .print-title { font-size: 2.5rem; font-weight: 800; color: #1e293b; margin-bottom: 0.5rem; }
          .print-subtitle { font-size: 1.25rem; color: #64748b; }
          
          .report-meta { margin-bottom: 2rem; border-bottom: 2px solid #f1f5f9; padding-bottom: 1rem; }
          .report-meta h2 { font-size: 1.5rem; font-weight: 700; color: #334155; }

          table { width: 100%; border-collapse: collapse; margin-bottom: 3rem; }
          th { background-color: #4a3aff !important; color: white !important; font-weight: 700; padding: 0.75rem 1rem; text-align: left; }
          td { padding: 0.75rem 1rem; border-bottom: 1px solid #f1f5f9; color: #475569; font-size: 0.875rem; }
          
          .summary-card {
            display: flex;
            justify-content: space-between;
            align-items: center;
            background-color: #f0f4ff !important;
            border-radius: 2rem;
            padding: 2.5rem;
            margin-left: auto;
            width: fit-content;
            min-width: 450px;
          }
          
          .summary-stats { display: flex; flex-direction: column; gap: 0.5rem; }
          .summary-row { display: flex; justify-content: space-between; gap: 3rem; font-weight: 700; color: #475569; }
          .summary-row span:last-child { color: #1e293b; }

          .score-display { text-align: right; display: flex; flex-direction: column; }
          .score-label { font-size: 1.25rem; font-weight: 900; color: #64748b; letter-spacing: 0.1em; text-transform: uppercase; }
          .score-value { font-size: 5rem; font-weight: 900; color: #4a3aff !important; line-height: 1; }

          .print-footer {
            position: fixed;
            bottom: 1rem;
            left: 0;
            right: 0;
            border-top: 1px solid #f1f5f9;
            padding-top: 0.5rem;
            display: flex;
            justify-content: space-between;
            font-size: 0.75rem;
            color: #94a3b8;
            font-weight: 700;
            text-transform: uppercase;
          }
        }
      `}</style>
      
      <div className="print-content p-8">
        <div className="print-header">
          <h1 className="print-title">GPA Report</h1>
          <p className="print-subtitle">Department of Nutrition and Food Technology</p>
        </div>

        <div className="report-meta">
          <h2>
            {mode === Mode.GPA ? `Semester: ${activeSemester?.label}` : 'CGPA Summary Report'}
          </h2>
        </div>

        <table>
          <thead>
            <tr>
              <th>Course Code</th>
              <th>Course Name</th>
              <th>Credits</th>
              <th>Grade</th>
              <th>Points</th>
            </tr>
          </thead>
          <tbody>
            {mode === Mode.GPA && activeSemester?.courses.map((course) => (
              <tr key={course.id}>
                <td style={{ fontWeight: 600 }}>{course.code}</td>
                <td>{course.title}</td>
                <td>{course.credits}</td>
                <td style={{ fontWeight: 800 }}>{course.grade || 'N/A'}</td>
                <td>
                  {course.grade ? (GRADE_POINTS[course.grade] * course.credits).toFixed(2) : 'N/A'}
                </td>
              </tr>
            ))}
            {mode === Mode.CGPA && semesters.filter(s => s.manualCredits && s.manualCredits > 0).map((s) => (
              <tr key={s.id}>
                <td style={{ fontWeight: 800 }}>Semester {s.label}</td>
                <td style={{ fontStyle: 'italic', color: '#94a3b8' }}>Manual Record</td>
                <td>{s.manualCredits}</td>
                <td style={{ fontWeight: 800 }}>{s.manualGPA?.toFixed(2)}</td>
                <td>{(s.manualCredits * (s.manualGPA || 0)).toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="summary-card">
          <div className="summary-stats">
            {summary ? (
              <>
                <div className="summary-row">
                  <span>Credit Offered:</span>
                  <span>{summary.offered}</span>
                </div>
                <div className="summary-row">
                  <span>Credit Attempted:</span>
                  <span>{summary.attempted}</span>
                </div>
                <div className="summary-row">
                  <span>Credit Secured:</span>
                  <span>{summary.secured}</span>
                </div>
                <div className="summary-row">
                  <span>Points Secured:</span>
                  <span>{summary.points}</span>
                </div>
              </>
            ) : (
              <>
                <div className="summary-row">
                  <span>Total Credits:</span>
                  <span>{stats.offered.toFixed(2)}</span>
                </div>
                <div className="summary-row">
                  <span>Semesters Counted:</span>
                  <span>{stats.secured}</span>
                </div>
              </>
            )}
          </div>

          <div className="score-display">
            <span className="score-label">{mode}</span>
            <span className="score-value">{stats.score}</span>
          </div>
        </div>

        <div className="print-footer">
          <span>Generated by Interactive GPA & CGPA Calculator</span>
          <span>Page 1 of 1</span>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <div className="mt-8 mb-4 flex flex-col items-center gap-2">
        <button
          onClick={handleDownload}
          disabled={!isActive || isPreparing}
          className={`flex items-center gap-3 px-8 py-3.5 font-bold text-sm rounded-2xl shadow-lg transition-all duration-300 active:scale-95 group ${
            isActive && !isPreparing
              ? 'bg-[#0d8181] hover:bg-[#0a6c6c] text-white shadow-teal-900/10 cursor-pointer' 
              : 'bg-slate-200 dark:bg-slate-800 text-slate-400 dark:text-slate-600 shadow-none cursor-not-allowed grayscale opacity-60'
          }`}
        >
          {isPreparing ? (
            <div className="flex items-center gap-3">
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Preparing...
            </div>
          ) : (
            <>
              <svg className={`w-5 h-5 transition-transform ${isActive ? 'group-hover:-translate-y-0.5' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10" />
              </svg>
              Download PDF
            </>
          )}
        </button>
      </div>

      {/* Render the print template into the body using a Portal */}
      {isActive && createPortal(PrintTemplate, document.body)}
    </>
  );
};

export default DownloadPDF;
