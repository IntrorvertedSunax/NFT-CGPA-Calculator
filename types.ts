
export enum Mode {
  GPA = 'GPA',
  CGPA = 'CGPA'
}

export type Grade = 'A+' | 'A' | 'A-' | 'B+' | 'B' | 'B-' | 'C+' | 'C' | 'D' | 'F' | '';

export interface Course {
  id: string;
  code: string;
  title: string;
  credits: number;
  grade: Grade;
}

export interface Semester {
  id: string;
  label: string; // e.g. "1.1", "1.2"
  courses: Course[];
  manualCredits?: number;
  manualGPA?: number;
}

export interface AppState {
  mode: Mode;
  semesters: Semester[];
  activeSemesterId: string;
}
