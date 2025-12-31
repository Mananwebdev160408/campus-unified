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
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </ThemeProvider>
);

export default App;
