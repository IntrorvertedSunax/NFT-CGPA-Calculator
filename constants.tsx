
import React from 'react';
import { Grade, Semester } from './types';

export const GRADE_POINTS: Record<Grade, number> = {
  'A+': 4.00,
  'A': 3.75,
  'A-': 3.50,
  'B+': 3.25,
  'B': 3.00,
  'B-': 2.75,
  'C+': 2.50,
  'C': 2.25,
  'D': 2.00,
  'F': 0.00,
  '': 0.00
};

export const GRADIENT_BRAND = "from-[#0d8181] to-[#0a6c6c]";

const createInitialCourses = (semester: string): any[] => {
  const realCourses: Record<string, {code: string, title: string, credits: number}[]> = {
    '1.1': [
      { code: '0915 09 NFT1101', title: 'Basic Nutrition', credits: 3 },
      { code: '0531 09 NFT1102', title: 'Fundamental Chemistry Practical', credits: 1 },
      { code: '0531 09 NFT1103', title: 'Inorganic and Physical Chemistry', credits: 3 },
      { code: '0512 09 NFT1104', title: 'Food Chemistry Practical', credits: 1 },
      { code: '0512 09 NFT 1105', title: 'Food Chemistry', credits: 3 },
      { code: '0611 09 NFT 1106', title: 'Computer Fundamental Practical', credits: 1 },
      { code: '0611 09 NFT 1109', title: 'Computer Fundamentals', credits: 2 },
      { code: '0912 09 NFT 1107', title: 'Human Anatomy and Physiology-I', credits: 3 },
      { code: '0231 09 NFT 1111', title: 'Communicative English', credits: 2 },
    ],
  };

  const defaults = realCourses[semester] || [];

  return defaults.map((c, i) => ({ ...c, id: `${semester}-${i}`, grade: '' }));
};

export const INITIAL_SEMESTERS: Semester[] = [
  '1.1', '1.2', '2.1', '2.2', '3.1', '3.2', '4.1', '4.2'
].map(label => ({
  id: label,
  label,
  courses: createInitialCourses(label),
  manualCredits: 0,
  manualGPA: 0,
}));

export const LogoSVG = () => (
  <div className="relative flex items-center justify-center">
    <svg width="48" height="48" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path 
        d="M50 20C33.4315 20 20 33.4315 20 50C20 66.5685 33.4315 80 50 80C66.5685 80 80 66.5685 80 50C80 33.4315 66.5685 20 50 20ZM50 72C37.8497 72 28 62.1503 28 50C28 37.8497 37.8497 28 50 28C62.1503 28 72 37.8497 72 50C72 62.1503 62.1503 72 50 72Z" 
        fill="#0d8181" 
      />
      <path d="M46 15H54V25H46V15Z" fill="#0d8181" />
      <path d="M46 75H54V85H46V75Z" fill="#0d8181" />
      <path d="M15 46H25V54H15V46Z" fill="#0d8181" />
      <path d="M75 46H85V54H75V46Z" fill="#0d8181" />
      <path d="M22 28L28 22L35 29L29 35L22 28Z" fill="#0d8181" />
      <path d="M65 65L71 71L78 64L72 58L65 65Z" fill="#0d8181" />
      <path d="M22 72L28 78L35 71L29 65L22 72Z" fill="#0d8181" />
      <path d="M65 35L71 29L78 36L72 42L65 35Z" fill="#0d8181" />
      <path 
        d="M48 65H52V52H55V43C55 42 54 41 53 41V48H52V41H51V48H49V41H48V48H47V41C46 41 45 42 45 43V52H48V65Z" 
        fill="#0d8181" 
      />
      <path d="M54 39C54 39 57 37 59 37C61 37 63 39 63 41C63 43 61 45 59 45C57 45 54 43 54 43" fill="#4CAF50" />
      <path d="M50 40C50 40 51 37 53 37C55 37 56 38 56 40C56 42 55 43 53 43C51 43 50 42 50 40" fill="#2196F3" />
      <path d="M57 42C57 42 59 41 61 41C63 41 64 42 64 44C64 46 63 47 61 47C59 47 57 46 57 46" fill="#0d8181" />
    </svg>
  </div>
);
