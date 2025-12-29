import { motion } from 'framer-motion';
import {
  Briefcase,
  Building2,
  Users,
  TrendingUp,
  Calendar,
  FileText,
  UserCheck,
  ArrowUpRight,
  CheckCircle,
  Clock,
  Target,
  Award,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';

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

export function PlacementOfficerDashboard() {
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
          <h1 className="text-2xl font-bold text-foreground">Placement Dashboard</h1>
          <p className="text-muted-foreground">Manage recruiters, drives, and student placements</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <FileText className="w-4 h-4" />
            Export Report
          </Button>
          <Button variant="gradient">
            <Calendar className="w-4 h-4" />
            Schedule Drive
          </Button>
        </div>
      </div>

      {/* Quick Stats */}
      <motion.div variants={item} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          icon={UserCheck}
          label="Students Placed"
          value="856"
          subtext="Out of 1,420 eligible"
          trend="60% placed"
          trendUp
        />
        <StatCard
          icon={Building2}
          label="Active Recruiters"
          value="42"
          subtext="Companies hiring"
        />
        <StatCard
          icon={Briefcase}
          label="Open Positions"
          value="124"
          subtext="Across all companies"
          iconColor="text-accent"
        />
        <StatCard
          icon={TrendingUp}
          label="Avg Package"
          value="₹12.4L"
          subtext="This batch"
          trend="+18% YoY"
          trendUp
          iconColor="text-success"
        />
      </motion.div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-6">
          {/* Upcoming Drives */}
          <motion.div variants={item} className="card-elevated p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-foreground">Upcoming Drives</h2>
              <Button variant="ghost" size="sm">
                View Calendar
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Button>
            </div>
            <div className="space-y-3">
              <DriveCard
                company="Google"
                role="Software Engineer"
                date="Jan 5, 2025"
                slots={25}
                registered={180}
                status="confirmed"
              />
              <DriveCard
                company="Microsoft"
                role="Associate SDE"
                date="Jan 8, 2025"
                slots={30}
                registered={220}
                status="confirmed"
              />
              <DriveCard
                company="Amazon"
                role="SDE Intern"
                date="Jan 12, 2025"
                slots={50}
                registered={350}
                status="pending"
              />
              <DriveCard
                company="Goldman Sachs"
                role="Technology Analyst"
                date="Jan 15, 2025"
                slots={15}
                registered={95}
                status="confirmed"
              />
            </div>
          </motion.div>

          {/* Recent Placements */}
          <motion.div variants={item} className="card-elevated p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-foreground">Recent Placements</h2>
              <Button variant="ghost" size="sm">
                View All
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Button>
            </div>
            <div className="space-y-3">
              <PlacementRow
                name="Aditya Kumar"
                company="Google"
                role="Software Engineer"
                package="₹32L"
              />
              <PlacementRow
                name="Sneha Patel"
                company="Microsoft"
                role="Program Manager"
                package="₹28L"
              />
              <PlacementRow
                name="Rohit Sharma"
                company="Amazon"
                role="SDE I"
                package="₹24L"
              />
              <PlacementRow
                name="Priya Gupta"
                company="Meta"
                role="Data Scientist"
                package="₹35L"
              />
            </div>
          </motion.div>

          {/* Company Pipeline */}
          <motion.div variants={item} className="card-elevated p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-foreground">Recruiter Pipeline</h2>
              <Button variant="ghost" size="sm">
                Manage
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Button>
            </div>
            <div className="grid grid-cols-4 gap-4 text-center">
              <div className="p-4 rounded-lg bg-secondary/50">
                <p className="text-2xl font-bold text-foreground">12</p>
                <p className="text-xs text-muted-foreground">Contacted</p>
              </div>
              <div className="p-4 rounded-lg bg-warning/10">
                <p className="text-2xl font-bold text-warning">8</p>
                <p className="text-xs text-muted-foreground">In Discussion</p>
              </div>
              <div className="p-4 rounded-lg bg-accent/10">
                <p className="text-2xl font-bold text-accent">5</p>
                <p className="text-xs text-muted-foreground">Confirmed</p>
              </div>
              <div className="p-4 rounded-lg bg-success/10">
                <p className="text-2xl font-bold text-success">42</p>
                <p className="text-xs text-muted-foreground">Completed</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Placement Progress */}
          <motion.div variants={item} className="card-elevated p-6">
            <h2 className="text-lg font-semibold text-foreground mb-4">Batch Progress</h2>
            <div className="space-y-4">
              <div className="text-center">
                <div className="relative w-28 h-28 mx-auto">
                  <svg className="w-28 h-28 transform -rotate-90">
                    <circle
                      cx="56"
                      cy="56"
                      r="48"
                      className="stroke-secondary"
                      strokeWidth="10"
                      fill="none"
                    />
                    <circle
                      cx="56"
                      cy="56"
                      r="48"
                      className="stroke-success"
                      strokeWidth="10"
                      fill="none"
                      strokeDasharray={`${60 * 3.01} 301`}
                    />
                  </svg>
                  <span className="absolute inset-0 flex items-center justify-center text-2xl font-bold">
                    60%
                  </span>
                </div>
                <p className="text-sm text-muted-foreground mt-2">856 / 1,420 placed</p>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Target</span>
                  <span className="font-medium">85% (1,207)</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Remaining</span>
                  <span className="font-medium text-warning">351 students</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Top Recruiters */}
          <motion.div variants={item} className="card-elevated p-6">
            <h2 className="text-lg font-semibold text-foreground mb-4">Top Recruiters</h2>
            <div className="space-y-3">
              <RecruiterRow company="Google" hired={24} avgPackage="₹32L" />
              <RecruiterRow company="Microsoft" hired={35} avgPackage="₹26L" />
              <RecruiterRow company="Amazon" hired={48} avgPackage="₹22L" />
              <RecruiterRow company="Goldman Sachs" hired={18} avgPackage="₹28L" />
            </div>
          </motion.div>

          {/* Package Distribution */}
          <motion.div variants={item} className="card-elevated p-6">
            <h2 className="text-lg font-semibold text-foreground mb-4">Package Distribution</h2>
            <div className="space-y-3">
              <PackageBar label="> ₹30L" count={45} total={856} color="bg-accent" />
              <PackageBar label="₹20-30L" count={180} total={856} color="bg-success" />
              <PackageBar label="₹10-20L" count={420} total={856} color="bg-primary" />
              <PackageBar label="< ₹10L" count={211} total={856} color="bg-muted-foreground" />
            </div>
          </motion.div>

          {/* Quick Actions */}
          <motion.div variants={item} className="card-elevated p-6">
            <h2 className="text-lg font-semibold text-foreground mb-4">Quick Actions</h2>
            <div className="space-y-2">
              <Button variant="outline" size="sm" className="w-full justify-start">
                <Building2 className="w-4 h-4" />
                Add Recruiter
              </Button>
              <Button variant="outline" size="sm" className="w-full justify-start">
                <Users className="w-4 h-4" />
                Eligible Students
              </Button>
              <Button variant="outline" size="sm" className="w-full justify-start">
                <FileText className="w-4 h-4" />
                Generate Report
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}

interface StatCardProps {
  icon: React.ElementType;
  label: string;
  value: string;
  subtext: string;
  trend?: string;
  trendUp?: boolean;
  iconColor?: string;
}

function StatCard({ icon: Icon, label, value, subtext, trend, trendUp, iconColor = 'text-primary' }: StatCardProps) {
  return (
    <div className="card-elevated p-5">
      <div className="flex items-start justify-between">
        <div className={`w-10 h-10 rounded-lg bg-secondary flex items-center justify-center ${iconColor}`}>
          <Icon className="w-5 h-5" />
        </div>
        {trend && (
          <span className={`text-xs font-medium ${trendUp ? 'text-success' : 'text-destructive'}`}>
            {trend}
          </span>
        )}
      </div>
      <div className="mt-4">
        <p className="text-2xl font-bold text-foreground">{value}</p>
        <p className="text-sm text-muted-foreground">{label}</p>
        <p className="text-xs text-muted-foreground mt-1">{subtext}</p>
      </div>
    </div>
  );
}

interface DriveCardProps {
  company: string;
  role: string;
  date: string;
  slots: number;
  registered: number;
  status: 'confirmed' | 'pending' | 'cancelled';
}

function DriveCard({ company, role, date, slots, registered, status }: DriveCardProps) {
  const statusColors = {
    confirmed: 'status-verified',
    pending: 'status-pending',
    cancelled: 'status-error',
  };

  return (
    <div className="flex items-center justify-between p-4 rounded-lg border border-border hover:border-accent/30 transition-colors">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
          <Building2 className="w-5 h-5 text-primary" />
        </div>
        <div>
          <p className="font-semibold text-foreground">{company}</p>
          <p className="text-sm text-muted-foreground">{role}</p>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <div className="text-right">
          <p className="text-sm font-medium text-foreground">{date}</p>
          <p className="text-xs text-muted-foreground">{registered} registered · {slots} slots</p>
        </div>
        <span className={`status-badge ${statusColors[status]}`}>
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </span>
      </div>
    </div>
  );
}

interface PlacementRowProps {
  name: string;
  company: string;
  role: string;
  package: string;
}

function PlacementRow({ name, company, role, package: pkg }: PlacementRowProps) {
  return (
    <div className="flex items-center justify-between p-3 rounded-lg bg-success/5 border border-success/10">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-success/20 flex items-center justify-center">
          <CheckCircle className="w-4 h-4 text-success" />
        </div>
        <div>
          <p className="font-medium text-foreground text-sm">{name}</p>
          <p className="text-xs text-muted-foreground">{company} · {role}</p>
        </div>
      </div>
      <span className="font-semibold text-success">{pkg}</span>
    </div>
  );
}

interface RecruiterRowProps {
  company: string;
  hired: number;
  avgPackage: string;
}

function RecruiterRow({ company, hired, avgPackage }: RecruiterRowProps) {
  return (
    <div className="flex items-center justify-between p-2">
      <div className="flex items-center gap-2">
        <Award className="w-4 h-4 text-primary" />
        <span className="text-sm font-medium text-foreground">{company}</span>
      </div>
      <div className="text-right">
        <p className="text-sm font-medium">{hired} hired</p>
        <p className="text-xs text-muted-foreground">{avgPackage} avg</p>
      </div>
    </div>
  );
}

interface PackageBarProps {
  label: string;
  count: number;
  total: number;
  color: string;
}

function PackageBar({ label, count, total, color }: PackageBarProps) {
  const percentage = (count / total) * 100;
  return (
    <div>
      <div className="flex justify-between text-sm mb-1">
        <span className="text-muted-foreground">{label}</span>
        <span className="font-medium">{count}</span>
      </div>
      <div className="h-2 bg-secondary rounded-full overflow-hidden">
        <div className={`h-full ${color} rounded-full`} style={{ width: `${percentage}%` }} />
      </div>
    </div>
  );
}

export default PlacementOfficerDashboard;
