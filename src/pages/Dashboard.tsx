import { useLocation } from 'react-router-dom';
import { SuperAdminDashboard } from './dashboards/SuperAdminDashboard';
import { CollegeAdminDashboard } from './dashboards/CollegeAdminDashboard';
import { PlacementOfficerDashboard } from './dashboards/PlacementOfficerDashboard';
import { FacultyDashboard } from './dashboards/FacultyDashboard';
import { RecruiterDashboard } from './dashboards/RecruiterDashboard';
import { StudentDashboard } from './dashboards/StudentDashboard';
import type { UserRole } from '@/types';

// This would come from auth context in a real app
const getCurrentUserRole = (): UserRole => {
  // Check URL params for demo purposes
  const params = new URLSearchParams(window.location.search);
  const role = params.get('role') as UserRole;
  if (role && ['super_admin', 'college_admin', 'placement_officer', 'faculty', 'student', 'recruiter'].includes(role)) {
    return role;
  }
  return 'student'; // Default role
};

export function Dashboard() {
  const role = getCurrentUserRole();

  switch (role) {
    case 'super_admin':
      return <SuperAdminDashboard />;
    case 'college_admin':
      return <CollegeAdminDashboard />;
    case 'placement_officer':
      return <PlacementOfficerDashboard />;
    case 'faculty':
      return <FacultyDashboard />;
    case 'recruiter':
      return <RecruiterDashboard />;
    case 'student':
    default:
      return <StudentDashboard />;
  }
}

export default Dashboard;
