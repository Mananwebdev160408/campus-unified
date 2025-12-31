import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Briefcase,
  MapPin,
  Clock,
  CheckCircle2,
  XCircle,
  HourglassIcon,
  Eye,
  ArrowLeft,
  Filter,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';

interface Application {
  id: string;
  jobId: string;
  title: string;
  company: string;
  companyLogo: string;
  location: string;
  appliedDate: string;
  status: 'pending' | 'shortlisted' | 'interview' | 'offered' | 'rejected';
  nextStep?: string;
  interviewDate?: string;
}

const applications: Application[] = [
  {
    id: '1',
    jobId: '2',
    title: 'ML Engineer Intern',
    company: 'Microsoft',
    companyLogo: 'M',
    location: 'Hyderabad, India',
    appliedDate: '2024-01-15',
    status: 'shortlisted',
    nextStep: 'Technical Interview',
    interviewDate: '2024-02-01',
  },
  {
    id: '2',
    jobId: '5',
    title: 'Frontend Developer Intern',
    company: 'Razorpay',
    companyLogo: 'R',
    location: 'Remote',
    appliedDate: '2024-01-10',
    status: 'interview',
    nextStep: 'HR Round',
    interviewDate: '2024-01-28',
  },
  {
    id: '3',
    jobId: '1',
    title: 'Software Engineer',
    company: 'Google',
    companyLogo: 'G',
    location: 'Bangalore, India',
    appliedDate: '2024-01-05',
    status: 'pending',
  },
  {
    id: '4',
    jobId: '3',
    title: 'Full Stack Developer',
    company: 'Amazon',
    companyLogo: 'A',
    location: 'Mumbai, India',
    appliedDate: '2023-12-20',
    status: 'rejected',
  },
  {
    id: '5',
    jobId: '4',
    title: 'Data Analyst',
    company: 'Flipkart',
    companyLogo: 'F',
    location: 'Bangalore, India',
    appliedDate: '2023-12-15',
    status: 'offered',
    nextStep: 'Accept/Decline by Feb 5',
  },
];

export default function MyApplications() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('all');

  const filteredApplications = applications.filter(app => {
    if (activeTab === 'all') return true;
    return app.status === activeTab;
  });

  const getStatusConfig = (status: string) => {
    switch (status) {
      case 'pending':
        return { icon: HourglassIcon, color: 'text-muted-foreground', bg: 'bg-muted', label: 'Pending Review' };
      case 'shortlisted':
        return { icon: CheckCircle2, color: 'text-primary', bg: 'bg-primary/10', label: 'Shortlisted' };
      case 'interview':
        return { icon: Clock, color: 'text-warning', bg: 'bg-warning/10', label: 'Interview Scheduled' };
      case 'offered':
        return { icon: CheckCircle2, color: 'text-success', bg: 'bg-success/10', label: 'Offer Received' };
      case 'rejected':
        return { icon: XCircle, color: 'text-destructive', bg: 'bg-destructive/10', label: 'Not Selected' };
      default:
        return { icon: Clock, color: 'text-muted-foreground', bg: 'bg-muted', label: 'Unknown' };
    }
  };

  const stats = {
    total: applications.length,
    pending: applications.filter(a => a.status === 'pending').length,
    shortlisted: applications.filter(a => a.status === 'shortlisted' || a.status === 'interview').length,
    offered: applications.filter(a => a.status === 'offered').length,
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => navigate('/placements')}>
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-foreground">My Applications</h1>
            <p className="text-muted-foreground">Track your job application status</p>
          </div>
        </div>
        <Button variant="outline">
          <Filter className="w-4 h-4 mr-2" />
          Filter
        </Button>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="card-elevated p-5">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-primary/10">
              <Briefcase className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Total Applications</p>
              <p className="text-2xl font-bold text-foreground">{stats.total}</p>
            </div>
          </div>
        </div>
        <div className="card-elevated p-5">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-muted">
              <HourglassIcon className="w-5 h-5 text-muted-foreground" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Pending</p>
              <p className="text-2xl font-bold text-foreground">{stats.pending}</p>
            </div>
          </div>
        </div>
        <div className="card-elevated p-5">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-warning/10">
              <CheckCircle2 className="w-5 h-5 text-warning" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">In Progress</p>
              <p className="text-2xl font-bold text-foreground">{stats.shortlisted}</p>
            </div>
          </div>
        </div>
        <div className="card-elevated p-5">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-success/10">
              <CheckCircle2 className="w-5 h-5 text-success" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Offers</p>
              <p className="text-2xl font-bold text-foreground">{stats.offered}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Applications List */}
      <div className="card-elevated">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <div className="p-4 border-b border-border">
            <TabsList>
              <TabsTrigger value="all">All ({applications.length})</TabsTrigger>
              <TabsTrigger value="pending">Pending</TabsTrigger>
              <TabsTrigger value="shortlisted">Shortlisted</TabsTrigger>
              <TabsTrigger value="interview">Interview</TabsTrigger>
              <TabsTrigger value="offered">Offered</TabsTrigger>
              <TabsTrigger value="rejected">Rejected</TabsTrigger>
            </TabsList>
          </div>

          <div className="divide-y divide-border">
            {filteredApplications.length === 0 ? (
              <div className="text-center py-12">
                <Briefcase className="w-12 h-12 mx-auto text-muted-foreground/50 mb-4" />
                <p className="text-muted-foreground">No applications found</p>
              </div>
            ) : (
              filteredApplications.map((app, index) => {
                const statusConfig = getStatusConfig(app.status);
                const StatusIcon = statusConfig.icon;
                
                return (
                  <motion.div
                    key={app.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="p-5 hover:bg-muted/30 transition-colors"
                  >
                    <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                      <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center text-2xl font-bold text-primary shrink-0">
                        {app.companyLogo}
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-1">
                          <h3 className="font-semibold text-foreground">{app.title}</h3>
                          <Badge className={cn(statusConfig.bg, statusConfig.color, 'border-0')}>
                            {statusConfig.label}
                          </Badge>
                        </div>
                        <p className="text-primary font-medium">{app.company}</p>
                        <div className="flex flex-wrap gap-4 mt-2 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <MapPin className="w-4 h-4" />
                            {app.location}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            Applied {app.appliedDate}
                          </span>
                        </div>
                        {app.nextStep && (
                          <div className="mt-2 p-2 rounded-lg bg-secondary/50 text-sm">
                            <span className="font-medium text-foreground">Next: </span>
                            <span className="text-muted-foreground">{app.nextStep}</span>
                            {app.interviewDate && (
                              <span className="text-primary ml-2">({app.interviewDate})</span>
                            )}
                          </div>
                        )}
                      </div>

                      <div className="flex gap-2 shrink-0">
                        <Button variant="outline" onClick={() => navigate(`/placements/${app.jobId}`)}>
                          <Eye className="w-4 h-4 mr-2" />
                          View Job
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                );
              })
            )}
          </div>
        </Tabs>
      </div>
    </motion.div>
  );
}
