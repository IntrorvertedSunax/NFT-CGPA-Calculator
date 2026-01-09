
import React, { useState, useEffect, useMemo } from 'react';
import Header from './components/Header';
import Scorecard from './components/Scorecard';
import ModeSwitcher from './components/ModeSwitcher';
import GPAMode from './components/GPAMode';
import CGPAMode from './components/CGPAMode';
import Footer from './components/Footer';
import { Mode, AppState, Grade, Semester } from './types';
import { INITIAL_SEMESTERS, GRADE_POINTS } from './constants';

const App: React.FC = () => {
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('theme') === 'dark' || 
             (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches);
    }
    return false;
  });

  const [state, setState] = useState<AppState>(() => {
    const saved = localStorage.getItem('cgpa_calc_state');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error("Failed to parse saved state", e);
      }
    }
    return {
      mode: Mode.GPA,
      semesters: INITIAL_SEMESTERS,
      activeSemesterId: '1.1'
    };
  });

  // Persist state
  useEffect(() => {
    localStorage.setItem('cgpa_calc_state', JSON.stringify(state));
  }, [state]);

  // Persist theme
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  const updateGrade = (semId: string, courseId: string, grade: Grade) => {
    setState(prev => ({
      ...prev,
      semesters: prev.semesters.map(s => {
        if (s.id !== semId) return s;
        return {
          ...s,
          courses: s.courses.map(c => c.id === courseId ? { ...c, grade } : c)
        };
      })
    }));
  };

  const updateManual = (id: string, credits: number, gpa: number) => {
    setState(prev => ({
      ...prev,
      semesters: prev.semesters.map(s => s.id === id ? { ...s, manualCredits: credits, manualGPA: gpa } : s)
    }));
  };

  const stats = useMemo(() => {
    if (state.mode === Mode.GPA) {
      const active = state.semesters.find(s => s.id === state.activeSemesterId);
      if (!active) return { score: '0.000', offered: 0, secured: 0, offeredLabel: "Credit Offered", securedLabel: "Credit Secured" };

      const offered = active.courses.reduce((acc, c) => acc + c.credits, 0);
      let totalPoints = 0;
      let securedCredits = 0;

      active.courses.forEach(c => {
        if (c.grade) {
          totalPoints += (GRADE_POINTS[c.grade] * c.credits);
          securedCredits += c.credits;
        }
      });

      const gpaResult = securedCredits > 0 ? (totalPoints / securedCredits).toFixed(3) : '0.000';
      return { 
        score: gpaResult, 
        offered, 
        secured: securedCredits,
        offeredLabel: "Credit Offered",
        securedLabel: "Credit Secured"
      };
    } else {
      let totalPoints = 0;
      let totalCredits = 0;
      let semesterCount = 0;

      state.semesters.forEach(s => {
        if (s.manualCredits && s.manualCredits > 0) {
          totalPoints += (s.manualGPA || 0) * s.manualCredits;
          totalCredits += s.manualCredits;
          semesterCount++;
        }
      });

      const cgpaResult = totalCredits > 0 ? (totalPoints / totalCredits).toFixed(2) : '0.00';
      return { 
        score: cgpaResult, 
        offered: totalCredits, 
        secured: semesterCount,
        offeredLabel: "Total Credit",
        securedLabel: "Total Semester"
      };
    }
  }, [state]);

  return (
    <div className="min-h-screen flex flex-col transition-colors duration-300">
      <Header 
        darkMode={darkMode} 
        toggleDarkMode={() => setDarkMode(!darkMode)} 
      />
      
      <main className="flex-grow max-w-4xl w-full mx-auto px-4 py-8">
        <Scorecard 
          label={state.mode === Mode.GPA ? `SEMESTER ${state.activeSemesterId} GPA` : 'OVERALL CGPA'}
          score={stats.score}
          offered={stats.offered}
          secured={stats.secured}
          offeredLabel={stats.offeredLabel}
          securedLabel={stats.securedLabel}
        />

        <ModeSwitcher 
          mode={state.mode} 
          setMode={(m) => setState(prev => ({ ...prev, mode: m }))} 
        />

        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
          {state.mode === Mode.GPA ? (
            <GPAMode 
              semesters={state.semesters}
              activeId={state.activeSemesterId}
              setActiveId={(id) => setState(prev => ({ ...prev, activeSemesterId: id }))}
              updateGrade={updateGrade}
            />
          ) : (
            <CGPAMode 
              semesters={state.semesters}
              updateManual={updateManual}
            />
          )}
        </div>

        <Footer />
      </main>
    </div>
  );
};

export default App;
