import { motion } from 'framer-motion';
import {
  Users,
  FileText,
  Search,
  Briefcase,
  CheckCircle,
  Clock,
  Building2,
  ArrowUpRight,
  Filter,
  Download,
  Eye,
  Star,
  TrendingUp,
  UserCheck,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
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

export function RecruiterDashboard() {
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
          <h1 className="text-2xl font-bold text-foreground">Recruiter Portal</h1>
          <p className="text-muted-foreground">Find and verify top candidates from verified institutions</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="w-4 h-4" />
            Export Shortlist
          </Button>
          <Button variant="gradient">
            <Briefcase className="w-4 h-4" />
            Post New Job
          </Button>
        </div>
      </div>

      {/* Quick Stats */}
      <motion.div variants={item} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          icon={Briefcase}
          label="Active Jobs"
          value="5"
          subtext="Currently hiring"
        />
        <StatCard
          icon={Users}
          label="Total Applications"
          value="324"
          subtext="Across all positions"
          trend="+48 this week"
          trendUp
        />
        <StatCard
          icon={UserCheck}
          label="Shortlisted"
          value="42"
          subtext="Ready for interview"
          iconColor="text-success"
        />
        <StatCard
          icon={CheckCircle}
          label="Offers Made"
          value="12"
          subtext="This hiring cycle"
          iconColor="text-accent"
        />
      </motion.div>

      {/* Search & Filter */}
      <motion.div variants={item} className="card-elevated p-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search candidates by name, skill, or institution..."
              className="pl-10"
            />
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Filter className="w-4 h-4" />
              Filters
            </Button>
            <Button variant="secondary">
              Search
            </Button>
          </div>
        </div>
      </motion.div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-6">
          {/* Job Listings */}
          <motion.div variants={item} className="card-elevated p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-foreground">Your Job Postings</h2>
              <Button variant="ghost" size="sm">
                Manage All
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Button>
            </div>
            <div className="space-y-3">
              <JobRow
                title="Software Engineer"
                location="Bangalore, IN"
                applications={124}
                shortlisted={18}
                status="active"
                daysLeft={12}
              />
              <JobRow
                title="Data Analyst Intern"
                location="Remote"
                applications={86}
                shortlisted={10}
                status="active"
                daysLeft={8}
              />
              <JobRow
                title="Product Manager"
                location="Mumbai, IN"
                applications={52}
                shortlisted={8}
                status="active"
                daysLeft={15}
              />
              <JobRow
                title="Frontend Developer"
                location="Hyderabad, IN"
                applications={62}
                shortlisted={6}
                status="closing"
                daysLeft={2}
              />
            </div>
          </motion.div>

          {/* Top Candidates */}
          <motion.div variants={item} className="card-elevated p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-foreground">Top Candidates</h2>
              <Button variant="ghost" size="sm">
                View All
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Button>
            </div>
            <div className="space-y-3">
              <CandidateCard
                name="Aditya Sharma"
                institution="IIT Delhi"
                role="Software Engineer"
                cgpa={9.2}
                skills={['React', 'Node.js', 'Python']}
                matchScore={94}
                verified
              />
              <CandidateCard
                name="Priya Patel"
                institution="NIT Warangal"
                role="Software Engineer"
                cgpa={8.8}
                skills={['Java', 'Spring Boot', 'AWS']}
                matchScore={89}
                verified
              />
              <CandidateCard
                name="Rohit Verma"
                institution="BITS Pilani"
                role="Data Analyst Intern"
                cgpa={8.5}
                skills={['Python', 'SQL', 'Tableau']}
                matchScore={86}
                verified
              />
            </div>
          </motion.div>

          {/* Verification Scanner */}
          <motion.div variants={item} className="card-elevated p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-foreground">Resume Verification</h2>
              <span className="status-badge status-verified">ERP Verified</span>
            </div>
            <div className="text-center py-8 border-2 border-dashed border-border rounded-lg">
              <Search className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
              <p className="text-muted-foreground mb-3">Scan QR code or upload resume to verify</p>
              <div className="flex gap-2 justify-center">
                <Button variant="outline">
                  Upload Resume
                </Button>
                <Button variant="secondary">
                  Scan QR Code
                </Button>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Company Profile */}
          <motion.div variants={item} className="card-elevated p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                <Building2 className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="font-semibold text-foreground">Google India</p>
                <p className="text-sm text-muted-foreground">Technology</p>
              </div>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Partner Since</span>
                <span className="font-medium">2019</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Total Hires</span>
                <span className="font-medium">156</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Active Jobs</span>
                <span className="font-medium">5</span>
              </div>
            </div>
          </motion.div>

          {/* Application Pipeline */}
          <motion.div variants={item} className="card-elevated p-6">
            <h2 className="text-lg font-semibold text-foreground mb-4">Pipeline Overview</h2>
            <div className="space-y-4">
              <PipelineItem label="Applied" count={324} percentage={100} color="bg-muted-foreground" />
              <PipelineItem label="Screened" count={186} percentage={57} color="bg-primary" />
              <PipelineItem label="Shortlisted" count={42} percentage={13} color="bg-accent" />
              <PipelineItem label="Interviewed" count={28} percentage={9} color="bg-warning" />
              <PipelineItem label="Offered" count={12} percentage={4} color="bg-success" />
            </div>
          </motion.div>

          {/* Institutions */}
          <motion.div variants={item} className="card-elevated p-6">
            <h2 className="text-lg font-semibold text-foreground mb-4">Partner Institutions</h2>
            <div className="space-y-3">
              <InstitutionRow name="IIT Delhi" candidates={48} avgCgpa={8.9} />
              <InstitutionRow name="NIT Warangal" candidates={35} avgCgpa={8.6} />
              <InstitutionRow name="BITS Pilani" candidates={28} avgCgpa={8.4} />
              <InstitutionRow name="IIT Bombay" candidates={42} avgCgpa={9.1} />
            </div>
          </motion.div>

          {/* Quick Actions */}
          <motion.div variants={item} className="card-elevated p-6">
            <h2 className="text-lg font-semibold text-foreground mb-4">Quick Actions</h2>
            <div className="space-y-2">
              <Button variant="outline" size="sm" className="w-full justify-start">
                <Briefcase className="w-4 h-4" />
                Post New Job
              </Button>
              <Button variant="outline" size="sm" className="w-full justify-start">
                <Users className="w-4 h-4" />
                Browse Candidates
              </Button>
              <Button variant="outline" size="sm" className="w-full justify-start">
                <FileText className="w-4 h-4" />
                Download Reports
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

interface JobRowProps {
  title: string;
  location: string;
  applications: number;
  shortlisted: number;
  status: 'active' | 'closing' | 'closed';
  daysLeft: number;
}

function JobRow({ title, location, applications, shortlisted, status, daysLeft }: JobRowProps) {
  const statusColors = {
    active: 'status-verified',
    closing: 'status-pending',
    closed: 'status-error',
  };

  return (
    <div className="flex items-center justify-between p-4 rounded-lg border border-border hover:border-accent/30 transition-colors">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
          <Briefcase className="w-5 h-5 text-accent" />
        </div>
        <div>
          <p className="font-semibold text-foreground">{title}</p>
          <p className="text-sm text-muted-foreground">{location}</p>
        </div>
      </div>
      <div className="flex items-center gap-6">
        <div className="text-right">
          <p className="text-sm font-medium text-foreground">{applications} applied</p>
          <p className="text-xs text-muted-foreground">{shortlisted} shortlisted</p>
        </div>
        <div className="text-right">
          <span className={`status-badge ${statusColors[status]}`}>
            {status === 'closing' ? `${daysLeft}d left` : status.charAt(0).toUpperCase() + status.slice(1)}
          </span>
        </div>
      </div>
    </div>
  );
}

interface CandidateCardProps {
  name: string;
  institution: string;
  role: string;
  cgpa: number;
  skills: string[];
  matchScore: number;
  verified: boolean;
}

function CandidateCard({ name, institution, role, cgpa, skills, matchScore, verified }: CandidateCardProps) {
  return (
    <div className="p-4 rounded-lg border border-border hover:border-accent/30 transition-colors">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
            <span className="text-sm font-semibold text-primary">{name.charAt(0)}</span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <p className="font-semibold text-foreground">{name}</p>
              {verified && <CheckCircle className="w-4 h-4 text-success" />}
            </div>
            <p className="text-sm text-muted-foreground">{institution} · {cgpa} CGPA</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm font-semibold text-accent">{matchScore}%</span>
          <Star className="w-4 h-4 text-warning fill-warning" />
        </div>
      </div>
      <div className="flex items-center justify-between mt-3 pt-3 border-t border-border">
        <div className="flex gap-1.5 flex-wrap">
          {skills.map(skill => (
            <span key={skill} className="px-2 py-0.5 text-xs bg-secondary rounded-full text-foreground">
              {skill}
            </span>
          ))}
        </div>
        <div className="flex gap-1">
          <Button variant="ghost" size="sm">
            <Eye className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="sm">
            <Download className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}

interface PipelineItemProps {
  label: string;
  count: number;
  percentage: number;
  color: string;
}

function PipelineItem({ label, count, percentage, color }: PipelineItemProps) {
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

interface InstitutionRowProps {
  name: string;
  candidates: number;
  avgCgpa: number;
}

function InstitutionRow({ name, candidates, avgCgpa }: InstitutionRowProps) {
  return (
    <div className="flex items-center justify-between p-2">
      <span className="text-sm font-medium text-foreground">{name}</span>
      <div className="text-right">
        <p className="text-sm font-medium">{candidates}</p>
        <p className="text-xs text-muted-foreground">{avgCgpa} avg</p>
      </div>
    </div>
  );
}

export default RecruiterDashboard;
