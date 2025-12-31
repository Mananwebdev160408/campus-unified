import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Bell, Search, User, ChevronDown, LogOut, Settings, HelpCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';
import ThemeToggler from "../../components/ThemeToggler";
import type { User as UserType } from '@/types';

interface HeaderProps {
  user: UserType;
  sidebarCollapsed: boolean;
}

export function Header({ user, sidebarCollapsed }: HeaderProps) {
  const navigate = useNavigate();
  const [hasNotifications] = useState(true);

  const roleLabels: Record<string, string> = {
    super_admin: 'Super Admin',
    college_admin: 'College Admin',
    placement_officer: 'Placement Officer',
    faculty: 'Faculty',
    student: 'Student',
    recruiter: 'Recruiter',
  };

  return (
    <header
      className={cn(
        'fixed top-0 right-0 h-16 bg-card border-b border-border z-30 transition-all duration-300',
        sidebarCollapsed ? 'left-16' : 'left-64'
      )}
    >
      <div className="h-full px-6 flex items-center justify-between">
        {/* Search */}
        <div className="relative w-80 hidden md:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search students, courses, documents..."
            className="pl-10 bg-secondary/50 border-0 focus-visible:bg-background"
          />
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-3 ml-auto">
          {/* Help */}
          <Button 
            variant="ghost" 
            size="icon" 
            className="text-muted-foreground hover:text-foreground"
            onClick={() => navigate('/help')}
          >
            <HelpCircle className="w-5 h-5" />
          </Button>
          <ThemeToggler/>
          {/* Notifications */}
          <Button 
            variant="ghost" 
            size="icon" 
            className="relative text-muted-foreground hover:text-foreground"
            onClick={() => navigate('/notifications')}
          >
            <Bell className="w-5 h-5" />
            {hasNotifications && (
              <span className="absolute top-2 right-2 w-2 h-2 bg-destructive rounded-full" />
            )}
          </Button>

          {/* User Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex items-center gap-3 px-2 py-1.5 rounded-lg hover:bg-secondary transition-colors">
                <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                  {user.avatar ? (
                    <img src={user.avatar} alt={user.name} className="w-full h-full rounded-full object-cover" />
                  ) : (
                    <User className="w-4 h-4 text-primary-foreground" />
                  )}
                </div>
                <div className="hidden md:block text-left">
                  <p className="text-sm font-medium text-foreground">{user.name}</p>
                  <p className="text-xs text-muted-foreground">{roleLabels[user.role]}</p>
                </div>
                <ChevronDown className="w-4 h-4 text-muted-foreground hidden md:block" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <div className="px-2 py-1.5">
                <p className="text-sm font-medium">{user.name}</p>
                <p className="text-xs text-muted-foreground">{user.email}</p>
              </div>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => navigate('/profile')}>
                <User className="w-4 h-4 mr-2" />
                View Profile
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => navigate('/settings')}>
                <Settings className="w-4 h-4 mr-2" />
                Settings
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem 
                className="text-destructive focus:text-destructive"
                onClick={() => navigate('/auth')}
              >
                <LogOut className="w-4 h-4 mr-2" />
                Sign Out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
