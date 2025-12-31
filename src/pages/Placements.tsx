import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Briefcase,
  MapPin,
  Clock,
  DollarSign,
  Search,
  Filter,
  Building2,
  Users,
  CheckCircle2,
  Star,
  ChevronRight,
  ExternalLink,
  BookmarkPlus,
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { cn } from '@/lib/utils';

interface Job {
  id: string;
  title: string;
  company: string;
  companyLogo: string;
  location: string;
  type: 'full-time' | 'internship' | 'part-time';
  salary: string;
  posted: string;
  deadline: string;
  description: string;
  requirements: string[];
  applicants: number;
  matchScore: number;
  status: 'open' | 'applied' | 'shortlisted' | 'closed';
  tags: string[];
}

const jobs: Job[] = [
  {
    id: '1',
    title: 'Software Engineer',
    company: 'Google',
    companyLogo: 'G',
    location: 'Bangalore, India',
    type: 'full-time',
    salary: '₹25-35 LPA',
    posted: '2 days ago',
    deadline: '2024-02-15',
    description: 'Join our team to build next-generation products that impact billions of users worldwide.',
    requirements: ['Strong DSA skills', 'Experience with distributed systems', '3+ years experience', 'B.Tech/M.Tech in CS'],
    applicants: 245,
    matchScore: 92,
    status: 'open',
    tags: ['Python', 'Go', 'Kubernetes', 'ML'],
  },
  {
    id: '2',
    title: 'ML Engineer Intern',
    company: 'Microsoft',
    companyLogo: 'M',
    location: 'Hyderabad, India',
    type: 'internship',
    salary: '₹80K/month',
    posted: '1 week ago',
    deadline: '2024-02-20',
    description: 'Work on cutting-edge AI/ML projects in our Azure AI team.',
    requirements: ['ML fundamentals', 'Python proficiency', 'Currently pursuing B.Tech/M.Tech', 'Good academic record'],
    applicants: 189,
    matchScore: 88,
    status: 'applied',
    tags: ['Python', 'TensorFlow', 'Azure', 'NLP'],
  },
  {
    id: '3',
    title: 'Full Stack Developer',
    company: 'Amazon',
    companyLogo: 'A',
    location: 'Mumbai, India',
    type: 'full-time',
    salary: '₹18-28 LPA',
    posted: '3 days ago',
    deadline: '2024-02-18',
    description: 'Build scalable e-commerce solutions for millions of customers.',
    requirements: ['React/Node.js experience', 'AWS knowledge', '2+ years experience', 'Problem-solving skills'],
    applicants: 312,
    matchScore: 85,
    status: 'open',
    tags: ['React', 'Node.js', 'AWS', 'MongoDB'],
  },
  {
    id: '4',
    title: 'Data Analyst',
    company: 'Flipkart',
    companyLogo: 'F',
    location: 'Bangalore, India',
    type: 'full-time',
    salary: '₹12-18 LPA',
    posted: '5 days ago',
    deadline: '2024-02-22',
    description: 'Analyze large datasets to drive business decisions.',
    requirements: ['SQL expertise', 'Python/R', 'Statistical knowledge', 'B.Tech/B.E preferred'],
    applicants: 156,
    matchScore: 78,
    status: 'open',
    tags: ['SQL', 'Python', 'Tableau', 'Statistics'],
  },
  {
    id: '5',
    title: 'Frontend Developer Intern',
    company: 'Razorpay',
    companyLogo: 'R',
    location: 'Remote',
    type: 'internship',
    salary: '₹50K/month',
    posted: '1 day ago',
    deadline: '2024-02-10',
    description: 'Build beautiful and performant payment interfaces.',
    requirements: ['React knowledge', 'CSS/Tailwind', 'Currently enrolled in college', 'Portfolio required'],
    applicants: 98,
    matchScore: 95,
    status: 'shortlisted',
    tags: ['React', 'TypeScript', 'Tailwind', 'UI/UX'],
  },
];

const placementStats = {
  totalOffers: 156,
  averagePackage: '₹18.5 LPA',
  highestPackage: '₹45 LPA',
  companiesVisited: 42,
};

export default function Placements() {
  const [searchQuery, setSearchQuery] = useState('');
  const [jobType, setJobType] = useState('all');
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);

  const filteredJobs = jobs.filter((job) => {
    const matchesSearch =
      job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.company.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = jobType === 'all' || job.type === jobType;
    return matchesSearch && matchesType;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open':
        return 'bg-success/10 text-success border-success/20';
      case 'applied':
        return 'bg-primary/10 text-primary border-primary/20';
      case 'shortlisted':
        return 'bg-warning/10 text-warning border-warning/20';
      case 'closed':
        return 'bg-muted text-muted-foreground';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const getMatchColor = (score: number) => {
    if (score >= 90) return 'text-success';
    if (score >= 75) return 'text-primary';
    if (score >= 60) return 'text-warning';
    return 'text-muted-foreground';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Placement Portal</h1>
          <p className="text-muted-foreground mt-1">Find your dream job opportunities</p>
        </div>
        <Button>
          <Briefcase className="w-4 h-4 mr-2" />
          My Applications
        </Button>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="card-elevated p-5"
        >
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-success/10">
              <CheckCircle2 className="w-5 h-5 text-success" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Total Offers</p>
              <p className="text-2xl font-bold text-foreground">{placementStats.totalOffers}</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className="card-elevated p-5"
        >
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-primary/10">
              <DollarSign className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Avg Package</p>
              <p className="text-2xl font-bold text-foreground">{placementStats.averagePackage}</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="card-elevated p-5"
        >
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-accent/10">
              <Star className="w-5 h-5 text-accent" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Highest Package</p>
              <p className="text-2xl font-bold text-foreground">{placementStats.highestPackage}</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="card-elevated p-5"
        >
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-warning/10">
              <Building2 className="w-5 h-5 text-warning" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Companies</p>
              <p className="text-2xl font-bold text-foreground">{placementStats.companiesVisited}</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Filters */}
      <div className="card-elevated p-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search jobs, companies..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={jobType} onValueChange={setJobType}>
            <SelectTrigger className="w-full sm:w-40">
              <SelectValue placeholder="Job Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="full-time">Full Time</SelectItem>
              <SelectItem value="internship">Internship</SelectItem>
              <SelectItem value="part-time">Part Time</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Job Listings */}
      <div className="space-y-4">
        {filteredJobs.map((job, index) => (
          <motion.div
            key={job.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="card-elevated overflow-hidden hover:shadow-lg transition-shadow"
          >
            <div className="p-5">
              <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                {/* Company Logo */}
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center text-2xl font-bold text-primary shrink-0">
                  {job.companyLogo}
                </div>

                {/* Job Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold text-foreground">{job.title}</h3>
                        <Badge className={getStatusColor(job.status)}>
                          {job.status.charAt(0).toUpperCase() + job.status.slice(1)}
                        </Badge>
                      </div>
                      <p className="text-primary font-medium">{job.company}</p>
                    </div>
                    <div className="text-right hidden lg:block">
                      <div className={cn('text-2xl font-bold', getMatchColor(job.matchScore))}>
                        {job.matchScore}%
                      </div>
                      <p className="text-xs text-muted-foreground">Match Score</p>
                    </div>
                  </div>

                  {/* Meta Info */}
                  <div className="flex flex-wrap gap-4 mt-3 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      {job.location}
                    </span>
                    <span className="flex items-center gap-1">
                      <Briefcase className="w-4 h-4" />
                      {job.type}
                    </span>
                    <span className="flex items-center gap-1">
                      <DollarSign className="w-4 h-4" />
                      {job.salary}
                    </span>
                    <span className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      {job.applicants} applicants
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {job.posted}
                    </span>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 mt-3">
                    {job.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex lg:flex-col gap-2 shrink-0">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button onClick={() => setSelectedJob(job)}>
                        View Details
                        <ChevronRight className="w-4 h-4 ml-1" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl">
                      <DialogHeader>
                        <DialogTitle className="flex items-center gap-3">
                          <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-xl font-bold text-primary">
                            {job.companyLogo}
                          </div>
                          <div>
                            <p className="text-xl">{job.title}</p>
                            <p className="text-sm font-normal text-primary">{job.company}</p>
                          </div>
                        </DialogTitle>
                        <DialogDescription className="text-left pt-4">
                          <div className="space-y-4">
                            <p className="text-foreground">{job.description}</p>
                            
                            <div>
                              <h4 className="font-medium text-foreground mb-2">Requirements</h4>
                              <ul className="space-y-1">
                                {job.requirements.map((req, i) => (
                                  <li key={i} className="flex items-start gap-2 text-sm">
                                    <CheckCircle2 className="w-4 h-4 text-success mt-0.5" />
                                    {req}
                                  </li>
                                ))}
                              </ul>
                            </div>

                            <div className="flex gap-4 pt-4">
                              <Button className="flex-1">
                                Apply with Verified Profile
                              </Button>
                              
                            </div>
                          </div>
                        </DialogDescription>
                      </DialogHeader>
                    </DialogContent>
                  </Dialog>
                 
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {filteredJobs.length === 0 && (
        <div className="text-center py-12">
          <Briefcase className="w-12 h-12 mx-auto text-muted-foreground/50 mb-4" />
          <h3 className="font-medium text-foreground mb-1">No jobs found</h3>
          <p className="text-sm text-muted-foreground">Try adjusting your search filters</p>
        </div>
      )}
    </div>
  );
}
