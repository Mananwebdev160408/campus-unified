import { motion } from 'framer-motion';
import { Link, useParams } from 'react-router-dom';
import {
  ArrowLeft,
  Users,
  GraduationCap,
  BookOpen,
  TrendingUp,
  Mail,
  Phone,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';

const departmentData: Record<string, {
  name: string;
  code: string;
  students: number;
  faculty: number;
  hod: { name: string; email: string; phone: string };
  attendance: number;
  courses: number;
  description: string;
  facultyList: Array<{ name: string; designation: string; specialization: string }>;
}> = {
  '1': {
    name: 'Computer Science & Engineering',
    code: 'CSE',
    students: 1850,
    faculty: 48,
    hod: { name: 'Dr. Rajesh Kumar', email: 'rajesh.kumar@university.edu', phone: '+91 98765 43210' },
    attendance: 86,
    courses: 42,
    description: 'The Department of Computer Science & Engineering is dedicated to providing quality education in computing and information technology.',
    facultyList: [
      { name: 'Dr. Priya Sharma', designation: 'Professor', specialization: 'Machine Learning' },
      { name: 'Dr. Amit Verma', designation: 'Associate Professor', specialization: 'Data Science' },
      { name: 'Dr. Neha Singh', designation: 'Assistant Professor', specialization: 'Cybersecurity' },
    ],
  },
  '2': {
    name: 'Electronics & Communication',
    code: 'ECE',
    students: 1420,
    faculty: 38,
    hod: { name: 'Dr. Priya Menon', email: 'priya.menon@university.edu', phone: '+91 98765 43211' },
    attendance: 82,
    courses: 36,
    description: 'The Department of Electronics & Communication Engineering focuses on electronic systems and communication technologies.',
    facultyList: [
      { name: 'Dr. Suresh Nair', designation: 'Professor', specialization: 'VLSI Design' },
      { name: 'Dr. Kavita Rao', designation: 'Associate Professor', specialization: 'Signal Processing' },
    ],
  },
};

export function DepartmentDetail() {
  const { id } = useParams<{ id: string }>();
  const dept = departmentData[id || '1'] || departmentData['1'];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link to="/college/departments">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="w-5 h-5" />
          </Button>
        </Link>
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-medium px-2 py-1 rounded-full bg-primary/10 text-primary">
              {dept.code}
            </span>
            <h1 className="text-2xl font-bold text-foreground">{dept.name}</h1>
          </div>
          <p className="text-muted-foreground">{dept.description}</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="card-elevated p-4">
          <GraduationCap className="w-8 h-8 text-primary mb-2" />
          <p className="text-2xl font-bold text-foreground">{dept.students}</p>
          <p className="text-sm text-muted-foreground">Students Enrolled</p>
        </div>
        <div className="card-elevated p-4">
          <Users className="w-8 h-8 text-accent mb-2" />
          <p className="text-2xl font-bold text-foreground">{dept.faculty}</p>
          <p className="text-sm text-muted-foreground">Faculty Members</p>
        </div>
        <div className="card-elevated p-4">
          <BookOpen className="w-8 h-8 text-success mb-2" />
          <p className="text-2xl font-bold text-foreground">{dept.courses}</p>
          <p className="text-sm text-muted-foreground">Active Courses</p>
        </div>
        <div className="card-elevated p-4">
          <TrendingUp className="w-8 h-8 text-warning mb-2" />
          <p className="text-2xl font-bold text-foreground">{dept.attendance}%</p>
          <p className="text-sm text-muted-foreground">Avg. Attendance</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* HOD Info */}
        <div className="card-elevated p-6">
          <h2 className="text-lg font-semibold text-foreground mb-4">Head of Department</h2>
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                <span className="text-xl font-bold text-primary">
                  {dept.hod.name.split(' ').map(n => n[0]).join('')}
                </span>
              </div>
              <div>
                <p className="font-semibold text-foreground">{dept.hod.name}</p>
                <p className="text-sm text-muted-foreground">Professor & HOD</p>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm">
                <Mail className="w-4 h-4 text-muted-foreground" />
                <span className="text-foreground">{dept.hod.email}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Phone className="w-4 h-4 text-muted-foreground" />
                <span className="text-foreground">{dept.hod.phone}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Faculty List */}
        <div className="lg:col-span-2 card-elevated p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-foreground">Faculty Members</h2>
            <Link to="/college/faculty">
              <Button variant="outline" size="sm">View All Faculty</Button>
            </Link>
          </div>
          <div className="space-y-3">
            {dept.facultyList.map((faculty, idx) => (
              <div key={idx} className="flex items-center justify-between p-3 rounded-lg bg-secondary/30">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="text-sm font-medium text-primary">
                      {faculty.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div>
                    <p className="font-medium text-foreground">{faculty.name}</p>
                    <p className="text-sm text-muted-foreground">{faculty.designation}</p>
                  </div>
                </div>
                <span className="text-sm text-muted-foreground">{faculty.specialization}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default DepartmentDetail;
