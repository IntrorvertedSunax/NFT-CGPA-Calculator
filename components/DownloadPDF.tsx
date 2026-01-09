import React, { useState, useMemo } from 'react';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import { Semester, Mode } from '../types';
import { GRADE_POINTS } from '../constants';

interface DownloadPDFProps {
  mode: Mode;
  activeSemesterId: string;
  semesters: Semester[];
  stats: {
    score: string;
    offered: number;
    secured: number;
  };
}

const DownloadPDF: React.FC<DownloadPDFProps> = ({ mode, activeSemesterId, semesters, stats }) => {
  const [isDownloading, setIsDownloading] = useState(false);

  const activeSemester = useMemo(() => 
    semesters.find(s => s.id === activeSemesterId), 
  [semesters, activeSemesterId]);

  const canDownload = useMemo(() => {
    // Disable if total credits is zero as per technical flow
    if (stats.offered === 0) return false;
    
    if (mode === Mode.GPA) {
      return !!activeSemester;
    } else {
      return semesters.some(s => (s.manualCredits || 0) > 0);
    }
  }, [mode, activeSemester, semesters, stats.offered]);

  const generatePDF = async () => {
    if (!canDownload) return;
    setIsDownloading(true);

    try {
      const doc = new jsPDF({
        orientation: 'portrait',
        unit: 'pt',
        format: 'a4'
      });

      const pageWidth = doc.internal.pageSize.getWidth();
      const margin = 40;
      const primaryColor: [number, number, number] = [79, 70, 229]; // Indigo
      const darkGrey = '#282828';
      const mediumGrey = '#646464';
      const lightGreyBG = [241, 245, 249];

      // 1. Header Section
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(22);
      doc.setTextColor(darkGrey);
      doc.text('GPA Report', pageWidth / 2, 60, { align: 'center' });

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(12);
      doc.setTextColor(mediumGrey);
      doc.text('Department of Nutrition and Food Technology, JUST', pageWidth / 2, 80, { align: 'center' });

      doc.setFont('helvetica', 'bold');
      doc.setFontSize(16);
      doc.setTextColor(darkGrey);
      const identifier = mode === Mode.GPA ? `Semester: ${activeSemester?.label}` : 'Overall Report';
      doc.text(identifier, margin, 120);

      // 2. Data Table
      let tableData: any[][] = [];
      let tableHeaders: string[] = [];
      let columnStyles: any = {};

      if (mode === Mode.GPA && activeSemester) {
        tableHeaders = ['Course Code', 'Course Name', 'Credits', 'Grade', 'Points'];
        // Show all courses including N/A ones as requested
        tableData = activeSemester.courses.map(c => [
          c.code,
          c.title,
          c.credits.toFixed(2),
          c.grade || 'N/A',
          (GRADE_POINTS[c.grade || ''] * c.credits).toFixed(2)
        ]);
        columnStyles = {
          0: { cellWidth: 80 },
          1: { cellWidth: 'auto' },
          2: { halign: 'right', cellWidth: 60 },
          3: { halign: 'center', cellWidth: 50 },
          4: { halign: 'right', cellWidth: 60 }
        };
      } else {
        tableHeaders = ['Semester', 'Credits', 'GPA', 'Points Secured'];
        tableData = semesters
          .filter(s => (s.manualCredits || 0) > 0)
          .map(s => [
            `Semester ${s.label}`,
            (s.manualCredits || 0).toFixed(2),
            (s.manualGPA || 0).toFixed(2),
            ((s.manualCredits || 0) * (s.manualGPA || 0)).toFixed(2)
          ]);
        columnStyles = {
          0: { cellWidth: 'auto' },
          1: { halign: 'right', cellWidth: 80 },
          2: { halign: 'right', cellWidth: 80 },
          3: { halign: 'right', cellWidth: 100 }
        };
      }

      autoTable(doc, {
        head: [tableHeaders],
        body: tableData,
        startY: 140,
        theme: 'grid',
        headStyles: {
          fillColor: primaryColor,
          textColor: [255, 255, 255],
          fontSize: 10,
          fontStyle: 'bold'
        },
        bodyStyles: {
          fontSize: 10,
          textColor: mediumGrey
        },
        columnStyles: columnStyles,
        margin: { left: margin, right: margin }
      });

      // 3. Summary Box
      const finalY = (doc as any).lastAutoTable.finalY || 150;
      const boxY = finalY + 30;
      const boxHeight = 80;
      const boxWidth = pageWidth - (margin * 2);

      // Draw Rounded Rect
      doc.setFillColor(lightGreyBG[0], lightGreyBG[1], lightGreyBG[2]);
      doc.roundedRect(margin, boxY, boxWidth, boxHeight, 10, 10, 'F');

      // Left Side Totals
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(10);
      doc.setTextColor(mediumGrey);
      
      let totalPoints = 0;
      if (mode === Mode.GPA && activeSemester) {
        totalPoints = activeSemester.courses
          .reduce((acc, c) => acc + (GRADE_POINTS[c.grade || ''] * c.credits), 0);
      } else {
        totalPoints = semesters.reduce((acc, s) => acc + ((s.manualCredits || 0) * (s.manualGPA || 0)), 0);
      }

      doc.text(`Total Credits: ${stats.offered.toFixed(2)}`, margin + 20, boxY + 35);
      doc.text(`Total Points: ${totalPoints.toFixed(2)}`, margin + 20, boxY + 55);

      // Right Side Score
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(12);
      doc.text(mode === Mode.GPA ? 'GPA' : 'CGPA', margin + boxWidth - 100, boxY + 35, { align: 'right' });
      
      doc.setFontSize(28);
      doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
      doc.text(stats.score, margin + boxWidth - 20, boxY + 55, { align: 'right' });

      // 4. Footer & Pagination
      const pageCount = (doc as any).internal.getNumberOfPages();
      for (let i = 1; i <= pageCount; i++) {
        doc.setPage(i);
        doc.setFontSize(10);
        doc.setTextColor(150, 150, 150); // Light Grey
        doc.text('Generated by JUST Nutrition Calculator', margin, doc.internal.pageSize.getHeight() - 20);
        doc.text(`Page ${i} of ${pageCount}`, pageWidth - margin, doc.internal.pageSize.getHeight() - 20, { align: 'right' });
      }

      doc.save(mode === Mode.GPA ? `GPA_Semester_${activeSemester?.label}.pdf` : 'Overall_CGPA_Report.pdf');
    } catch (error) {
      console.error('PDF Generation failed', error);
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="flex justify-center mt-6 mb-2">
      <button
        onClick={generatePDF}
        disabled={!canDownload || isDownloading}
        className={`group flex items-center gap-3 px-10 py-4 font-bold text-sm rounded-2xl shadow-lg transition-all duration-300 active:scale-95 ${
          canDownload && !isDownloading
            ? 'bg-[#4f46e5] hover:bg-[#4338ca] text-white shadow-indigo-900/10 cursor-pointer'
            : 'bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-600 shadow-none cursor-not-allowed grayscale'
        }`}
      >
        {isDownloading ? (
          <div className="flex items-center gap-2">
            <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Processing...
          </div>
        ) : (
          <>
            <svg className={`w-5 h-5 transition-transform ${canDownload ? 'group-hover:-translate-y-0.5' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10" />
            </svg>
            Download PDF Report
          </>
        )}
      </button>
    </div>
  );
};

export default DownloadPDF;