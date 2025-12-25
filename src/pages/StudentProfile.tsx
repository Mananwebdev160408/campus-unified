import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  BookOpen,
  Award,
  FileText,
  Github,
  Linkedin,
  Edit2,
  Download,
  QrCode,
  ExternalLink,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
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

export function StudentProfile() {
  const [activeTab, setActiveTab] = useState('profile');

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="space-y-6"
    >
      {/* Profile Header Card */}
      <motion.div variants={item} className="card-elevated p-6">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Avatar */}
          <div className="relative">
            <div className="w-28 h-28 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center text-primary-foreground text-3xl font-bold">
              AJ
            </div>
            <button className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full bg-card border border-border flex items-center justify-center hover:bg-secondary transition-colors">
              <Edit2 className="w-4 h-4 text-muted-foreground" />
            </button>
          </div>

          {/* Info */}
          <div className="flex-1">
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
              <div>
                <h1 className="text-2xl font-bold text-foreground">Alex Johnson</h1>
                <p className="text-muted-foreground">B.Tech Computer Science & Engineering</p>
                <div className="flex items-center gap-4 mt-3 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <User className="w-4 h-4" />
                    CS2021045
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    Semester 5
                  </span>
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <QrCode className="w-4 h-4" />
                  View QR
                </Button>
                <Button size="sm">
                  <Download className="w-4 h-4" />
                  Download Resume
                </Button>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
              <div className="p-3 rounded-lg bg-secondary/50">
                <p className="text-2xl font-bold text-foreground">8.56</p>
                <p className="text-xs text-muted-foreground">CGPA</p>
              </div>
              <div className="p-3 rounded-lg bg-secondary/50">
                <p className="text-2xl font-bold text-foreground">82%</p>
                <p className="text-xs text-muted-foreground">Attendance</p>
              </div>
              <div className="p-3 rounded-lg bg-secondary/50">
                <p className="text-2xl font-bold text-foreground">128</p>
                <p className="text-xs text-muted-foreground">Credits Earned</p>
              </div>
              <div className="p-3 rounded-lg bg-secondary/50">
                <p className="text-2xl font-bold text-foreground">Top 15%</p>
                <p className="text-xs text-muted-foreground">Class Rank</p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Tabs */}
      <motion.div variants={item}>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="w-full justify-start bg-card border border-border rounded-lg p-1 h-auto flex-wrap">
            <TabsTrigger value="profile" className="rounded-md">Profile</TabsTrigger>
            <TabsTrigger value="academics" className="rounded-md">Academics</TabsTrigger>
            <TabsTrigger value="attendance" className="rounded-md">Attendance</TabsTrigger>
            <TabsTrigger value="documents" className="rounded-md">Documents</TabsTrigger>
          </TabsList>

          <TabsContent value="profile" className="mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Personal Information */}
              <div className="card-elevated p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold text-foreground">Personal Information</h2>
                  <Button variant="ghost" size="sm">
                    <Edit2 className="w-4 h-4" />
                    Edit
                  </Button>
                </div>
                <div className="space-y-4">
                  <InfoRow icon={Mail} label="Email" value="alex.johnson@university.edu" />
                  <InfoRow icon={Phone} label="Phone" value="+91 98765 43210" />
                  <InfoRow icon={MapPin} label="Address" value="123 University Road, Bangalore" />
                  <InfoRow icon={Calendar} label="Date of Birth" value="March 15, 2003" />
                </div>
              </div>

              {/* Connected Accounts */}
              <div className="card-elevated p-6">
                <h2 className="text-lg font-semibold text-foreground mb-4">Connected Accounts</h2>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 rounded-lg bg-secondary/50">
                    <div className="flex items-center gap-3">
                      <Github className="w-5 h-5" />
                      <div>
                        <p className="font-medium text-foreground">GitHub</p>
                        <p className="text-sm text-muted-foreground">@alexjohnson</p>
                      </div>
                    </div>
                    <span className="status-badge status-verified">Connected</span>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-lg bg-secondary/50">
                    <div className="flex items-center gap-3">
                      <Linkedin className="w-5 h-5 text-accent" />
                      <div>
                        <p className="font-medium text-foreground">LinkedIn</p>
                        <p className="text-sm text-muted-foreground">Not connected</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">Connect</Button>
                  </div>
                </div>

                {/* GitHub Stats Preview */}
                <div className="mt-6 p-4 rounded-lg border border-border">
                  <h3 className="text-sm font-medium text-foreground mb-3">GitHub Activity</h3>
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <p className="text-xl font-bold text-foreground">23</p>
                      <p className="text-xs text-muted-foreground">Repos</p>
                    </div>
                    <div>
                      <p className="text-xl font-bold text-foreground">156</p>
                      <p className="text-xs text-muted-foreground">Contributions</p>
                    </div>
                    <div>
                      <p className="text-xl font-bold text-foreground">12</p>
                      <p className="text-xs text-muted-foreground">Stars</p>
                    </div>
                  </div>
                  <div className="flex gap-2 mt-4">
                    <span className="px-2 py-1 text-xs bg-accent/10 text-accent rounded-full">JavaScript</span>
                    <span className="px-2 py-1 text-xs bg-success/10 text-success rounded-full">Python</span>
                    <span className="px-2 py-1 text-xs bg-warning/10 text-warning rounded-full">TypeScript</span>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="academics" className="mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Semester Performance */}
              <div className="card-elevated p-6">
                <h2 className="text-lg font-semibold text-foreground mb-4">Semester Performance</h2>
                <div className="space-y-4">
                  {[
                    { sem: 'Semester 1', sgpa: 8.2, credits: 24 },
                    { sem: 'Semester 2', sgpa: 8.4, credits: 26 },
                    { sem: 'Semester 3', sgpa: 8.7, credits: 26 },
                    { sem: 'Semester 4', sgpa: 8.6, credits: 26 },
                    { sem: 'Semester 5', sgpa: 8.8, credits: 26 },
                  ].map((s) => (
                    <div key={s.sem} className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-foreground">{s.sem}</p>
                        <p className="text-xs text-muted-foreground">{s.credits} credits</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <Progress value={s.sgpa * 10} className="w-24 h-2" />
                        <span className="text-sm font-semibold text-foreground w-8">{s.sgpa}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Current Courses */}
              <div className="card-elevated p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold text-foreground">Current Courses</h2>
                  <Button variant="ghost" size="sm">
                    View All
                    <ExternalLink className="w-3.5 h-3.5" />
                  </Button>
                </div>
                <div className="space-y-3">
                  {[
                    { code: 'CS301', name: 'Data Structures & Algorithms', credits: 4, grade: 'A' },
                    { code: 'CS302', name: 'Database Management Systems', credits: 4, grade: 'A-' },
                    { code: 'CS303', name: 'Software Engineering', credits: 3, grade: 'B+' },
                    { code: 'CS304', name: 'Computer Networks', credits: 4, grade: 'A' },
                  ].map((course) => (
                    <div key={course.code} className="p-3 rounded-lg border border-border">
                      <div className="flex items-start justify-between">
                        <div>
                          <span className="text-xs text-muted-foreground">{course.code}</span>
                          <p className="font-medium text-foreground">{course.name}</p>
                        </div>
                        <span className="px-2 py-0.5 text-xs font-medium bg-accent/10 text-accent rounded">
                          {course.grade}
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">{course.credits} Credits</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="attendance" className="mt-6">
            <div className="card-elevated p-6">
              <h2 className="text-lg font-semibold text-foreground mb-6">Attendance Summary</h2>
              <div className="space-y-6">
                {[
                  { subject: 'Data Structures & Algorithms', attended: 32, total: 44, percentage: 73 },
                  { subject: 'Database Management Systems', attended: 38, total: 42, percentage: 90 },
                  { subject: 'Software Engineering', attended: 28, total: 34, percentage: 82 },
                  { subject: 'Computer Networks', attended: 36, total: 40, percentage: 90 },
                  { subject: 'Discrete Mathematics', attended: 30, total: 38, percentage: 79 },
                ].map((course) => {
                  const statusColor = course.percentage >= 75 ? 'bg-success' : course.percentage >= 65 ? 'bg-warning' : 'bg-destructive';
                  return (
                    <div key={course.subject}>
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium text-foreground">{course.subject}</span>
                        <span className={`text-sm font-medium ${course.percentage >= 75 ? 'text-success' : course.percentage >= 65 ? 'text-warning' : 'text-destructive'}`}>
                          {course.percentage}%
                        </span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="flex-1 h-2 bg-secondary rounded-full overflow-hidden">
                          <div className={`h-full ${statusColor} rounded-full`} style={{ width: `${course.percentage}%` }} />
                        </div>
                        <span className="text-xs text-muted-foreground w-16">
                          {course.attended}/{course.total} classes
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="documents" className="mt-6">
            <div className="card-elevated p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-foreground">Document Vault</h2>
                <Button size="sm">
                  Upload Document
                </Button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[
                  { name: 'Semester 4 Marksheet', type: 'PDF', size: '245 KB', verified: true },
                  { name: '10th Certificate', type: 'PDF', size: '1.2 MB', verified: true },
                  { name: '12th Certificate', type: 'PDF', size: '980 KB', verified: true },
                  { name: 'ID Card', type: 'JPG', size: '156 KB', verified: false },
                  { name: 'Bonafide Certificate', type: 'PDF', size: '320 KB', verified: true },
                  { name: 'Resume', type: 'PDF', size: '180 KB', verified: false },
                ].map((doc) => (
                  <div key={doc.name} className="p-4 rounded-lg border border-border hover:border-accent/30 transition-colors cursor-pointer">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center">
                        <FileText className="w-5 h-5 text-muted-foreground" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-foreground truncate">{doc.name}</p>
                        <p className="text-xs text-muted-foreground">{doc.type} • {doc.size}</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between mt-3">
                      {doc.verified ? (
                        <span className="status-badge status-verified">Verified</span>
                      ) : (
                        <span className="status-badge status-pending">Pending</span>
                      )}
                      <Button variant="ghost" size="sm" className="h-7 px-2">
                        <Download className="w-3.5 h-3.5" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </motion.div>
    </motion.div>
  );
}

interface InfoRowProps {
  icon: React.ElementType;
  label: string;
  value: string;
}

function InfoRow({ icon: Icon, label, value }: InfoRowProps) {
  return (
    <div className="flex items-center gap-3">
      <div className="w-8 h-8 rounded-lg bg-secondary flex items-center justify-center">
        <Icon className="w-4 h-4 text-muted-foreground" />
      </div>
      <div>
        <p className="text-xs text-muted-foreground">{label}</p>
        <p className="font-medium text-foreground">{value}</p>
      </div>
    </div>
  );
}

export default StudentProfile;
