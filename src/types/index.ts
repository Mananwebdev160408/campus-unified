export type UserRole = 
  | 'super_admin'
  | 'college_admin'
  | 'placement_officer'
  | 'faculty'
  | 'student'
  | 'recruiter';

export type VerificationStatus = 'idle' | 'loading' | 'verified' | 'possible_match' | 'not_found';

export interface Organization {
  id: string;
  name: string;
  location?: string;
  type?: 'university' | 'college' | 'institute';
  verified: boolean;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  organizationId?: string;
}

export interface Student {
  id: string;
  userId: string;
  enrollmentNumber: string;
  department: string;
  semester: number;
  cgpa: number;
  attendancePercentage: number;
  status: 'active' | 'graduated' | 'suspended';
}

export interface Course {
  id: string;
  code: string;
  name: string;
  credits: number;
  instructor: string;
  department: string;
  semester: number;
  status: 'ongoing' | 'completed' | 'upcoming';
}

export interface AttendanceRecord {
  date: string;
  status: 'present' | 'absent' | 'late';
  subject: string;
}

export interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  type: 'full-time' | 'part-time' | 'internship';
  salary?: string;
  deadline: string;
  matchScore?: number;
}
