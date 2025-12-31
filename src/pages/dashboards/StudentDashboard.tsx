import { motion } from 'framer-motion';
import {
  BookOpen,
  ClipboardCheck,
  CreditCard,
  FileText,
  Briefcase,
  TrendingUp,
  Clock,
  AlertTriangle,
  Calendar,
  CheckCircle,
  ArrowUpRight,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

export function StudentDashboard() {
  const navigate = useNavigate();
  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="space-y-6"
    >
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Welcome back, Alex</h1>
          <p className="text-muted-foreground">Here's what's happening with your academics today.</p>
        </div>
        <Button variant="gradient" onClick={()=>navigate('/resume-builder')}>
          <FileText className="w-4 h-4" />
          Generate Resume
        </Button>
      </div>

      {/* Quick Stats */}
      <motion.div variants={item} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={TrendingUp} label="Current CGPA" value="8.56" subtext="Top 15% of batch" trend="+0.23" trendUp />
        <StatCard icon={ClipboardCheck} label="Attendance" value="82%" subtext="This semester" iconColor="text-warning" />
        <StatCard icon={BookOpen} label="Courses" value="6" subtext="Active this semester" />
        <StatCard icon={Briefcase} label="Job Applications" value="3" subtext="In progress" iconColor="text-accent" />
      </motion.div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <motion.div variants={item} className="card-elevated p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-foreground">Today's Schedule</h2>
              <Button onClick={()=>navigate('/timetable')} variant="ghost" size="sm">View Timetable<ArrowUpRight className="w-3.5 h-3.5" /></Button>
            </div>
            <div className="space-y-3">
              <ScheduleItem time="09:00 - 10:30" subject="Data Structures & Algorithms" room="Room 204" status="completed" />
              <ScheduleItem time="11:00 - 12:30" subject="Database Management Systems" room="Lab 3" status="ongoing" />
              <ScheduleItem time="14:00 - 15:30" subject="Software Engineering" room="Room 301" status="upcoming" />
              <ScheduleItem time="16:00 - 17:00" subject="Discrete Mathematics" room="Room 105" status="upcoming" />
            </div>
          </motion.div>

          <motion.div variants={item} className="card-elevated p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-foreground">Placement Opportunities</h2>
              <Button onClick={()=>navigate('/placements')} variant="ghost" size="sm">View All<ArrowUpRight className="w-3.5 h-3.5" /></Button>
            </div>
            <div className="space-y-3">
              <JobCard company="Google" role="Software Engineer Intern" location="Bangalore" deadline="Dec 28" matchScore={92} />
              <JobCard company="Microsoft" role="Associate SDE" location="Hyderabad" deadline="Dec 30" matchScore={85} />
              <JobCard company="Amazon" role="SDE I" location="Remote" deadline="Jan 5" matchScore={78} />
            </div>
          </motion.div>
        </div>

        <div className="space-y-6">
          <motion.div variants={item} className="p-4 rounded-xl bg-warning/10 border border-warning/20">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-warning mt-0.5" />
              <div>
                <h3 className="font-medium text-foreground">Attendance Warning</h3>
                <p className="text-sm text-muted-foreground mt-1">Your attendance in <span className="font-medium">Data Structures</span> is at 72%. Minimum required is 75%.</p>
              </div>
            </div>
          </motion.div>

          <motion.div variants={item} className="card-elevated p-6">
            <h2 className="text-lg font-semibold text-foreground mb-4">Upcoming Deadlines</h2>
            <div className="space-y-4">
              <DeadlineItem title="DSA Assignment 3" course="Data Structures" dueDate="Dec 26" daysLeft={1} />
              <DeadlineItem title="DBMS Project Report" course="Database Systems" dueDate="Dec 29" daysLeft={4} />
              <DeadlineItem title="SE Documentation" course="Software Engineering" dueDate="Jan 2" daysLeft={8} />
            </div>
          </motion.div>

          <motion.div variants={item} className="card-elevated p-6">
            <h2 className="text-lg font-semibold text-foreground mb-4">Fee Status</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between"><span className="text-sm text-muted-foreground">Tuition Fee</span><span className="status-badge status-verified">Paid</span></div>
              <div className="flex items-center justify-between"><span className="text-sm text-muted-foreground">Exam Fee</span><span className="status-badge status-pending">Due Dec 30</span></div>
              <div className="flex items-center justify-between"><span className="text-sm text-muted-foreground">Library Fine</span><span className="status-badge status-error">₹50 Pending</span></div>
              <Button onClick={()=>navigate('/finance')} variant="outline" className="w-full mt-2" size="sm"><CreditCard className="w-4 h-4" />Pay Now</Button>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}

function StatCard({ icon: Icon, label, value, subtext, trend, trendUp, iconColor = 'text-primary' }: { icon: React.ElementType; label: string; value: string; subtext: string; trend?: string; trendUp?: boolean; iconColor?: string }) {
  return (
    <div className="card-elevated p-5">
      <div className="flex items-start justify-between">
        <div className={`w-10 h-10 rounded-lg bg-secondary flex items-center justify-center ${iconColor}`}><Icon className="w-5 h-5" /></div>
        {trend && <span className={`text-xs font-medium ${trendUp ? 'text-success' : 'text-destructive'}`}>{trend}</span>}
      </div>
      <div className="mt-4">
        <p className="text-2xl font-bold text-foreground">{value}</p>
        <p className="text-sm text-muted-foreground">{label}</p>
        <p className="text-xs text-muted-foreground mt-1">{subtext}</p>
      </div>
    </div>
  );
}

function ScheduleItem({ time, subject, room, status }: { time: string; subject: string; room: string; status: 'completed' | 'ongoing' | 'upcoming' }) {
  const statusStyles = { completed: 'bg-muted text-muted-foreground', ongoing: 'bg-accent/10 border-accent/30 text-foreground', upcoming: 'bg-card text-foreground' };
  return (
    <div className={`p-3 rounded-lg border ${statusStyles[status]} flex items-center gap-4`}>
      <div className="flex items-center gap-2 w-28 shrink-0"><Clock className="w-4 h-4 text-muted-foreground" /><span className="text-sm font-medium">{time}</span></div>
      <div className="flex-1 min-w-0"><p className="font-medium truncate">{subject}</p><p className="text-sm text-muted-foreground">{room}</p></div>
      {status === 'completed' && <CheckCircle className="w-4 h-4 text-success shrink-0" />}
      {status === 'ongoing' && <span className="px-2 py-0.5 text-xs font-medium bg-accent text-accent-foreground rounded-full">Live</span>}
    </div>
  );
}

function JobCard({ company, role, location, deadline, matchScore }: { company: string; role: string; location: string; deadline: string; matchScore: number }) {
  return (
    <div className="p-4 rounded-lg border border-border hover:border-accent/30 transition-colors cursor-pointer">
      <div className="flex items-start justify-between"><div><p className="font-semibold text-foreground">{company}</p><p className="text-sm text-muted-foreground">{role}</p></div><div className="text-right"><span className="text-sm font-semibold text-accent">{matchScore}% Match</span></div></div>
      <div className="flex items-center justify-between mt-3 text-xs text-muted-foreground"><span>{location}</span><span>Deadline: {deadline}</span></div>
    </div>
  );
}

function DeadlineItem({ title, course, dueDate, daysLeft }: { title: string; course: string; dueDate: string; daysLeft: number }) {
  const urgency = daysLeft <= 2 ? 'text-destructive' : daysLeft <= 5 ? 'text-warning' : 'text-muted-foreground';
  return (
    <div className="flex items-center gap-3">
      <div className={`w-10 h-10 rounded-lg bg-secondary flex items-center justify-center ${urgency}`}><Calendar className="w-5 h-5" /></div>
      <div className="flex-1 min-w-0"><p className="font-medium text-foreground truncate">{title}</p><p className="text-xs text-muted-foreground">{course}</p></div>
      <div className="text-right"><p className={`text-sm font-medium ${urgency}`}>{daysLeft}d left</p><p className="text-xs text-muted-foreground">{dueDate}</p></div>
    </div>
  );
}

export default StudentDashboard;
