import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Building2,
  Users,
  GraduationCap,
  TrendingUp,
  ArrowLeft,
  Search,
  Plus,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';

const departments = [
  {
    id: '1',
    name: 'Computer Science & Engineering',
    code: 'CSE',
    students: 1850,
    faculty: 48,
    hod: 'Dr. Rajesh Kumar',
    attendance: 86,
    courses: 42,
  },
  {
    id: '2',
    name: 'Electronics & Communication',
    code: 'ECE',
    students: 1420,
    faculty: 38,
    hod: 'Dr. Priya Menon',
    attendance: 82,
    courses: 36,
  },
  {
    id: '3',
    name: 'Mechanical Engineering',
    code: 'ME',
    students: 1180,
    faculty: 35,
    hod: 'Dr. Anil Sharma',
    attendance: 79,
    courses: 32,
  },
  {
    id: '4',
    name: 'Civil Engineering',
    code: 'CE',
    students: 920,
    faculty: 28,
    hod: 'Dr. Sunita Rao',
    attendance: 84,
    courses: 28,
  },
  {
    id: '5',
    name: 'Electrical Engineering',
    code: 'EE',
    students: 780,
    faculty: 24,
    hod: 'Dr. Vikram Singh',
    attendance: 81,
    courses: 24,
  },
  {
    id: '6',
    name: 'Information Technology',
    code: 'IT',
    students: 650,
    faculty: 22,
    hod: 'Dr. Meera Joshi',
    attendance: 88,
    courses: 30,
  },
];

export function Departments() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="flex items-center gap-4">
          <Link to="/dashboard?role=college_admin">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="w-5 h-5" />
            </Button>
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-foreground">All Departments</h1>
            <p className="text-muted-foreground">Manage your institution's departments</p>
          </div>
        </div>
        <div className="flex gap-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input placeholder="Search departments..." className="pl-9 w-64" />
          </div>
          <Button variant="gradient">
            <Plus className="w-4 h-4" />
            Add Department
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="card-elevated p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <Building2 className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">6</p>
              <p className="text-sm text-muted-foreground">Total Departments</p>
            </div>
          </div>
        </div>
        <div className="card-elevated p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-success/10 flex items-center justify-center">
              <GraduationCap className="w-5 h-5 text-success" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">6,800</p>
              <p className="text-sm text-muted-foreground">Total Students</p>
            </div>
          </div>
        </div>
        <div className="card-elevated p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
              <Users className="w-5 h-5 text-accent" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">195</p>
              <p className="text-sm text-muted-foreground">Total Faculty</p>
            </div>
          </div>
        </div>
        <div className="card-elevated p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-warning/10 flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-warning" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">83%</p>
              <p className="text-sm text-muted-foreground">Avg. Attendance</p>
            </div>
          </div>
        </div>
      </div>

      {/* Departments List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {departments.map((dept) => (
          <Link key={dept.id} to={`/college/departments/${dept.id}`}>
            <motion.div
              whileHover={{ y: -2 }}
              className="card-elevated p-5 cursor-pointer hover:border-primary/30 transition-all"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <span className="text-xs font-medium px-2 py-1 rounded-full bg-primary/10 text-primary">
                    {dept.code}
                  </span>
                  <h3 className="text-lg font-semibold text-foreground mt-2">{dept.name}</h3>
                  <p className="text-sm text-muted-foreground">HOD: {dept.hod}</p>
                </div>
              </div>
              
              <div className="grid grid-cols-3 gap-4 mb-4">
                <div>
                  <p className="text-xl font-bold text-foreground">{dept.students}</p>
                  <p className="text-xs text-muted-foreground">Students</p>
                </div>
                <div>
                  <p className="text-xl font-bold text-foreground">{dept.faculty}</p>
                  <p className="text-xs text-muted-foreground">Faculty</p>
                </div>
                <div>
                  <p className="text-xl font-bold text-foreground">{dept.courses}</p>
                  <p className="text-xs text-muted-foreground">Courses</p>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Attendance</span>
                  <span className={`font-medium ${dept.attendance >= 80 ? 'text-success' : dept.attendance >= 75 ? 'text-warning' : 'text-destructive'}`}>
                    {dept.attendance}%
                  </span>
                </div>
                <Progress value={dept.attendance} className="h-2" />
              </div>
            </motion.div>
          </Link>
        ))}
      </div>
    </motion.div>
  );
}

export default Departments;
