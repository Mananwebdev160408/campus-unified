import { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard,
  Users,
  GraduationCap,
  BookOpen,
  Calendar,
  ClipboardCheck,
  FileText,
  CreditCard,
  Briefcase,
  Settings,
  ChevronLeft,
  ChevronRight,
  Building2,
  Shield,
  UserCog,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import type { UserRole } from '@/types';

interface SidebarProps {
  role: UserRole;
  collapsed: boolean;
  onToggle: () => void;
}

interface NavItem {
  icon: React.ElementType;
  label: string;
  path: string;
  roles: UserRole[];
}

const navItems: NavItem[] = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard', roles: ['student', 'faculty', 'college_admin', 'super_admin', 'placement_officer', 'recruiter'] },
  { icon: Users, label: 'Students', path: '/students', roles: ['faculty', 'college_admin', 'super_admin', 'placement_officer'] },
  { icon: GraduationCap, label: 'My Profile', path: '/profile', roles: ['student'] },
  { icon: BookOpen, label: 'Courses', path: '/courses', roles: ['student', 'faculty', 'college_admin'] },
  { icon: Calendar, label: 'Timetable', path: '/timetable', roles: ['student', 'faculty', 'college_admin'] },
  { icon: ClipboardCheck, label: 'Attendance', path: '/attendance', roles: ['student', 'faculty', 'college_admin'] },
  { icon: FileText, label: 'Examinations', path: '/examinations', roles: ['student', 'faculty', 'college_admin'] },
  { icon: CreditCard, label: 'Finance', path: '/finance', roles: ['student', 'college_admin', 'super_admin'] },
  { icon: Briefcase, label: 'Placements', path: '/placements', roles: ['student', 'placement_officer', 'recruiter'] },
  { icon: FileText, label: 'Resume Builder', path: '/resume-builder', roles: ['student'] },
  { icon: FileText, label: 'AI Analyzer', path: '/resume-analyzer', roles: ['student'] },
  { icon: Building2, label: 'Hostel Issues', path: '/hostel-issues', roles: ['student'] },
  { icon: Building2, label: 'Organizations', path: '/organizations', roles: ['super_admin'] },
  { icon: UserCog, label: 'Faculty', path: '/faculty', roles: ['college_admin', 'super_admin'] },
  { icon: Shield, label: 'Admins', path: '/admins', roles: ['super_admin'] },
  { icon: Settings, label: 'Settings', path: '/settings', roles: ['student', 'faculty', 'college_admin', 'super_admin', 'placement_officer', 'recruiter'] },
];

export function Sidebar({ role, collapsed, onToggle }: SidebarProps) {
  const location = useLocation();
  const filteredItems = navItems.filter(item => item.roles.includes(role));

  return (
    <aside
      className={cn(
        'fixed left-0 top-0 z-40 h-screen bg-sidebar border-r border-sidebar-border transition-all duration-300 flex flex-col',
        collapsed ? 'w-16' : 'w-64'
      )}
    >
      {/* Logo */}
      <div className={cn(
        "h-16 flex items-center border-b border-sidebar-border",
        collapsed ? "justify-center px-2" : "justify-between px-4"
      )}>
        {collapsed ? (
          <button
            onClick={onToggle}
            className="p-2 rounded-md hover:bg-sidebar-accent transition-colors"
            title="Expand sidebar"
          >
            <ChevronRight className="w-5 h-5 text-sidebar-foreground" />
          </button>
        ) : (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-center gap-3"
            >
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                <GraduationCap className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="font-semibold text-sidebar-foreground">UniFlow</span>
            </motion.div>
            <button
              onClick={onToggle}
              className="p-1.5 rounded-md hover:bg-sidebar-accent transition-colors"
              title="Collapse sidebar"
            >
              <ChevronLeft className="w-4 h-4 text-sidebar-foreground" />
            </button>
          </>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-4 px-3">
        <ul className="space-y-1">
          {filteredItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <li key={item.path}>
                <NavLink
                  to={item.path}
                  className={cn(
                    'sidebar-item',
                    isActive && 'sidebar-item-active'
                  )}
                >
                  <item.icon className={cn('w-5 h-5 shrink-0', isActive && 'text-accent')} />
                  <AnimatePresence mode="wait">
                    {!collapsed && (
                      <motion.span
                        initial={{ opacity: 0, width: 0 }}
                        animate={{ opacity: 1, width: 'auto' }}
                        exit={{ opacity: 0, width: 0 }}
                        className="truncate"
                      >
                        {item.label}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </NavLink>
              </li>
            );
          })}
        </ul>
      </nav>

    </aside>
  );
}
