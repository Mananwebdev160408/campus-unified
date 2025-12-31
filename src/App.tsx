import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MainLayout } from "./components/layout/MainLayout";
import LandingPage from "./pages/LandingPage";
import Auth from "./pages/Auth";
import Onboarding from "./pages/Onboarding";
import Dashboard from "./pages/Dashboard";
import StudentProfile from "./pages/StudentProfile";
import Courses from "./pages/Courses";
import CourseDetail from "./pages/CourseDetail";
import Timetable from "./pages/Timetable";
import Attendance from "./pages/Attendance";
import Examinations from "./pages/Examinations";
import Finance from "./pages/Finance";
import PaymentDetail from "./pages/PaymentDetail";
import Placements from "./pages/Placements";
import JobDetail from "./pages/JobDetail";
import MyApplications from "./pages/MyApplications";
import ResumeBuilder from "./pages/ResumeBuilder";
import ResumeAnalyzer from "./pages/ResumeAnalyzer";
import Settings from "./pages/Settings";
import Notifications from "./pages/Notifications";
import NotificationDetail from "./pages/NotificationDetail";
import Help from "./pages/Help";
import HostelIssues from "./pages/HostelIssues";
import Organizations from "./pages/admin/Organizations";
import OrganizationDetail from "./pages/admin/OrganizationDetail";
import AddOrganization from "./pages/admin/AddOrganization";
import Recruiters from "./pages/admin/Recruiters";
import SystemConfig from "./pages/admin/SystemConfig";
import SystemLogs from "./pages/admin/SystemLogs";
import Approvals from "./pages/admin/Approvals";
import Departments from "./pages/college/Departments";
import DepartmentDetail from "./pages/college/DepartmentDetail";
import FinancialReport from "./pages/college/FinancialReport";
import Admissions from "./pages/college/Admissions";
import Faculty from "./pages/college/Faculty";
import FacultyDetail from "./pages/college/FacultyDetail";
import AddFaculty from "./pages/college/AddFaculty";
import AddUser from "./pages/college/AddUser";
import Reports from "./pages/college/Reports";
import AddCourse from "./pages/college/AddCourse";
import Schedule from "./pages/college/Schedule";
import FeeSetup from "./pages/college/FeeSetup";
import { ThemeProvider } from "next-themes";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/onboarding" element={<Onboarding />} />
            <Route element={<MainLayout />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/profile" element={<StudentProfile />} />
              <Route path="/courses" element={<Courses />} />
              <Route path="/courses/:id" element={<CourseDetail />} />
              <Route path="/timetable" element={<Timetable />} />
              <Route path="/attendance" element={<Attendance />} />
              <Route path="/examinations" element={<Examinations />} />
              <Route path="/finance" element={<Finance />} />
              <Route path="/finance/:id" element={<PaymentDetail />} />
              <Route path="/placements" element={<Placements />} />
              <Route path="/placements/:id" element={<JobDetail />} />
              <Route path="/my-applications" element={<MyApplications />} />
              <Route path="/resume-builder" element={<ResumeBuilder />} />
              <Route path="/resume-analyzer" element={<ResumeAnalyzer />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/notifications" element={<Notifications />} />
              <Route path="/notifications/:id" element={<NotificationDetail />} />
              <Route path="/help" element={<Help />} />
              <Route path="/hostel-issues" element={<HostelIssues />} />
              <Route path="/admin/organizations" element={<Organizations />} />
              <Route path="/admin/organizations/new" element={<AddOrganization />} />
              <Route path="/admin/organizations/:id" element={<OrganizationDetail />} />
              <Route path="/admin/recruiters" element={<Recruiters />} />
              <Route path="/admin/system-config" element={<SystemConfig />} />
              <Route path="/admin/logs" element={<SystemLogs />} />
              <Route path="/admin/approvals" element={<Approvals />} />
              <Route path="/college/departments" element={<Departments />} />
              <Route path="/college/departments/:id" element={<DepartmentDetail />} />
              <Route path="/college/financial-report" element={<FinancialReport />} />
              <Route path="/college/admissions" element={<Admissions />} />
              <Route path="/college/faculty" element={<Faculty />} />
              <Route path="/college/faculty/add" element={<AddFaculty />} />
              <Route path="/college/faculty/:id" element={<FacultyDetail />} />
              <Route path="/college/add-user" element={<AddUser />} />
              <Route path="/college/reports" element={<Reports />} />
              <Route path="/college/add-course" element={<AddCourse />} />
              <Route path="/college/schedule" element={<Schedule />} />
              <Route path="/college/fee-setup" element={<FeeSetup />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </ThemeProvider>
);

export default App;
