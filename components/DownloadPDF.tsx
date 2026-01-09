
import React, { useMemo, useState } from 'react';
import { Semester, Mode } from '../types';
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

// Global declaration for html2pdf loaded via script tag
declare var html2pdf: any;

const DownloadPDF: React.FC<DownloadPDFProps> = ({ mode, activeSemester, semesters, stats }) => {
  const [isDownloading, setIsDownloading] = useState(false);
  
  const handleDownload = async () => {
    if (isDownloading) return;
    setIsDownloading(true);

    const fileName = mode === Mode.GPA 
      ? `GPA_Report_Semester_${activeSemester?.label || 'Result'}.pdf`
      : 'CGPA_Summary_Report.pdf';

    // Get the template element
    const sourceElement = document.getElementById('pdf-template-container');
    if (!sourceElement) {
      setIsDownloading(false);
      return;
    }

    // Create a clone to work with
    const element = sourceElement.cloneNode(true) as HTMLElement;
    element.style.display = 'block';
    element.style.position = 'fixed';
    element.style.left = '-10000px';
    element.style.top = '0';
    element.style.width = '800px';
    element.style.opacity = '1';
    element.style.visibility = 'visible';
    element.style.zIndex = '-1';
    
    // Append to body temporarily so html2canvas can "see" it properly
    document.body.appendChild(element);

    const opt = {
      margin: 0,
      filename: fileName,
      image: { type: 'jpeg', quality: 1.0 },
      html2canvas: { 
        scale: 2, 
        useCORS: true, 
        logging: false,
        backgroundColor: '#ffffff',
        width: 800,
        height: element.offsetHeight || 1120, // Approx A4 height if zero
        windowWidth: 800,
        y: 0,
        x: 0
      },
      jsPDF: { unit: 'px', format: [800, element.offsetHeight || 1120], orientation: 'portrait' }
    };

    try {
      // Give browser a moment to render the newly appended element
      await new Promise(resolve => setTimeout(resolve, 300));
      await html2pdf().from(element).set(opt).save();
    } catch (err) {
      console.error('PDF generation error:', err);
    } finally {
      // Cleanup
      if (element.parentNode) {
        document.body.removeChild(element);
      }
      setIsDownloading(false);
    }
  };

  const isActive = useMemo(() => {
    if (mode === Mode.GPA) {
      return activeSemester?.courses.some(c => c.grade !== '') || false;
    } else {
      return semesters.some(s => (s.manualCredits || 0) > 0 && (s.manualGPA || 0) > 0);
    }
  }, [mode, activeSemester, semesters]);

  const summary = useMemo(() => {
    if (mode === Mode.GPA && activeSemester) {
      const attemptedCourses = activeSemester.courses.filter(c => c.grade !== '');
      const creditAttempted = attemptedCourses.reduce((acc, c) => acc + c.credits, 0);
      const pointsSecured = attemptedCourses.reduce((acc, c) => acc + (GRADE_POINTS[c.grade] * c.credits), 0);
      
      return {
        offered: activeSemester.courses.reduce((acc, c) => acc + c.credits, 0).toFixed(2),
        attempted: creditAttempted.toFixed(2),
        secured: stats.secured.toFixed(2),
        points: pointsSecured.toFixed(2),
      };
    }
    return null;
  }, [mode, activeSemester, stats.secured]);

  return (
    <>
      <div className="mt-8 mb-4 flex justify-center">
        <button
          onClick={handleDownload}
          disabled={!isActive || isDownloading}
          className={`flex items-center gap-3 px-10 py-4 font-bold text-sm rounded-2xl shadow-lg transition-all duration-300 active:scale-95 group ${
            isActive && !isDownloading
              ? 'bg-[#0d8181] hover:bg-[#0a6c6c] text-white shadow-teal-900/10 cursor-pointer' 
              : 'bg-slate-200 dark:bg-slate-800 text-slate-400 dark:text-slate-600 shadow-none cursor-not-allowed grayscale opacity-60'
          }`}
        >
          {isDownloading ? (
            <div className="flex items-center gap-2">
              <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Downloading...
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

      {/* 
          Template used for PDF generation. 
          It is kept in the DOM as a hidden "source" element.
          During download, we clone it and ensure it's rendered by the browser.
      */}
      <div 
        id="pdf-template-container"
        style={{ 
          display: 'none', 
          width: '800px', 
          background: 'white',
          color: 'black',
        }}
      >
        <div style={{ padding: '60px', fontFamily: 'Inter, sans-serif', width: '800px', boxSizing: 'border-box' }}>
          {/* Header */}
          <div style={{ textAlign: 'center', marginBottom: '50px' }}>
            <h1 style={{ fontSize: '48px', fontWeight: 500, color: '#1e293b', marginBottom: '10px', marginTop: 0 }}>GPA Report</h1>
            <p style={{ fontSize: '20px', color: '#64748b', marginTop: 0 }}>Department of Nutrition and Food Technology</p>
          </div>

          {/* Semester Title */}
          <div style={{ marginBottom: '32px', borderLeft: '4px solid #cbd5e1', paddingLeft: '16px' }}>
            <h2 style={{ fontSize: '28px', fontWeight: 400, color: '#1e293b', margin: 0 }}>
              {mode === Mode.GPA ? `Semester: ${activeSemester?.label}` : 'CGPA Summary Report'}
            </h2>
          </div>

          {/* Results Table */}
          <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
            <thead>
              <tr style={{ backgroundColor: '#4a3aff', color: 'white' }}>
                <th style={{ padding: '16px', textAlign: 'left', fontWeight: 'bold', fontSize: '14px', color: 'white' }}>Course Code</th>
                <th style={{ padding: '16px', textAlign: 'left', fontWeight: 'bold', fontSize: '14px', color: 'white' }}>Course Name</th>
                <th style={{ padding: '16px', textAlign: 'center', fontWeight: 'bold', fontSize: '14px', color: 'white' }}>Credits</th>
                <th style={{ padding: '16px', textAlign: 'center', fontWeight: 'bold', fontSize: '14px', color: 'white' }}>Grade</th>
                <th style={{ padding: '16px', textAlign: 'center', fontWeight: 'bold', fontSize: '14px', color: 'white' }}>Points</th>
              </tr>
            </thead>
            <tbody>
              {mode === Mode.GPA && activeSemester?.courses.map((course) => (
                <tr key={course.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                  <td style={{ padding: '16px', color: '#64748b', fontSize: '13px' }}>{course.code}</td>
                  <td style={{ padding: '16px', color: '#475569', fontSize: '13px' }}>{course.title}</td>
                  <td style={{ padding: '16px', textAlign: 'center', color: '#475569', fontSize: '13px' }}>{course.credits}</td>
                  <td style={{ padding: '16px', textAlign: 'center', fontWeight: 'bold', color: '#1e293b', fontSize: '13px' }}>{course.grade || 'N/A'}</td>
                  <td style={{ padding: '16px', textAlign: 'center', color: '#64748b', fontSize: '13px' }}>
                    {course.grade ? (GRADE_POINTS[course.grade] * course.credits).toFixed(2) : 'N/A'}
                  </td>
                </tr>
              ))}
              {mode === Mode.CGPA && semesters.filter(s => (s.manualCredits || 0) > 0).map((s) => (
                <tr key={s.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                  <td style={{ padding: '16px', color: '#1e293b', fontWeight: 'bold', fontSize: '13px' }}>Semester {s.label}</td>
                  <td style={{ padding: '16px', color: '#94a3b8', fontStyle: 'italic', fontSize: '13px' }}>Overall Semester Summary</td>
                  <td style={{ padding: '16px', textAlign: 'center', color: '#475569', fontSize: '13px' }}>{s.manualCredits}</td>
                  <td style={{ padding: '16px', textAlign: 'center', fontWeight: 'bold', color: '#1e293b', fontSize: '13px' }}>{s.manualGPA?.toFixed(2)}</td>
                  <td style={{ padding: '16px', textAlign: 'center', color: '#475569', fontSize: '13px' }}>{(s.manualCredits! * s.manualGPA!).toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Summary Card */}
          <div style={{ backgroundColor: '#f1f5f9', borderRadius: '20px', padding: '40px', marginTop: '50px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {summary ? (
                <>
                  <div style={{ display: 'flex', justifyContent: 'space-between', width: '250px' }}>
                    <span style={{ color: '#64748b' }}>Credit Offered:</span>
                    <span style={{ fontWeight: 'bold', color: '#1e293b' }}>{summary.offered}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', width: '250px' }}>
                    <span style={{ color: '#64748b' }}>Credit Attempted:</span>
                    <span style={{ fontWeight: 'bold', color: '#1e293b' }}>{summary.attempted}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', width: '250px' }}>
                    <span style={{ color: '#64748b' }}>Credit Secured:</span>
                    <span style={{ fontWeight: 'bold', color: '#1e293b' }}>{summary.secured}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', width: '250px' }}>
                    <span style={{ color: '#64748b' }}>Points Secured:</span>
                    <span style={{ fontWeight: 'bold', color: '#1e293b' }}>{summary.points}</span>
                  </div>
                </>
              ) : (
                <>
                  <div style={{ display: 'flex', justifyContent: 'space-between', width: '250px' }}>
                    <span style={{ color: '#64748b' }}>Total Credits:</span>
                    <span style={{ fontWeight: 'bold', color: '#1e293b' }}>{stats.offered.toFixed(2)}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', width: '250px' }}>
                    <span style={{ color: '#64748b' }}>Semesters Counted:</span>
                    <span style={{ fontWeight: 'bold', color: '#1e293b' }}>{stats.secured}</span>
                  </div>
                </>
              )}
            </div>

            <div style={{ textAlign: 'right' }}>
              <span style={{ color: '#64748b', fontWeight: 'bold', fontSize: '18px', textTransform: 'uppercase', display: 'block' }}>{mode}</span>
              <span style={{ color: '#4a3aff', fontSize: '72px', fontWeight: 800, lineHeight: 1 }}>{stats.score}</span>
            </div>
          </div>

          {/* Footer Info */}
          <div style={{ marginTop: '80px', paddingTop: '30px', borderTop: '1px solid #f1f5f9', display: 'flex', justifyContent: 'space-between', color: '#94a3b8', fontSize: '10px', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
            <span>Generated by JUST Nutrition Calculator</span>
            <span>Ref: NFT-PDF-GEN-VERIFIED</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default DownloadPDF;
