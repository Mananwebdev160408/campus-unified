import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  ArrowLeft,
  Search,
  Plus,
  Mail,
  Phone,
  BookOpen,
  Users,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const faculty = [
  {
    id: '1',
    name: 'Dr. Rajesh Kumar',
    email: 'rajesh.kumar@university.edu',
    phone: '+91 98765 43210',
    department: 'Computer Science',
    designation: 'Professor & HOD',
    specialization: 'Artificial Intelligence',
    courses: 4,
    students: 120,
    experience: 18,
  },
  {
    id: '2',
    name: 'Dr. Priya Menon',
    email: 'priya.menon@university.edu',
    phone: '+91 98765 43211',
    department: 'Electronics',
    designation: 'Professor & HOD',
    specialization: 'VLSI Design',
    courses: 3,
    students: 95,
    experience: 15,
  },
  {
    id: '3',
    name: 'Dr. Amit Verma',
    email: 'amit.verma@university.edu',
    phone: '+91 98765 43212',
    department: 'Computer Science',
    designation: 'Associate Professor',
    specialization: 'Data Science',
    courses: 5,
    students: 150,
    experience: 12,
  },
  {
    id: '4',
    name: 'Dr. Neha Singh',
    email: 'neha.singh@university.edu',
    phone: '+91 98765 43213',
    department: 'Computer Science',
    designation: 'Assistant Professor',
    specialization: 'Cybersecurity',
    courses: 3,
    students: 90,
    experience: 8,
  },
  {
    id: '5',
    name: 'Dr. Suresh Nair',
    email: 'suresh.nair@university.edu',
    phone: '+91 98765 43214',
    department: 'Electronics',
    designation: 'Professor',
    specialization: 'Signal Processing',
    courses: 4,
    students: 110,
    experience: 20,
  },
  {
    id: '6',
    name: 'Dr. Kavita Rao',
    email: 'kavita.rao@university.edu',
    phone: '+91 98765 43215',
    department: 'Mechanical',
    designation: 'Associate Professor',
    specialization: 'Thermal Engineering',
    courses: 4,
    students: 100,
    experience: 10,
  },
];

export function Faculty() {
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
            <h1 className="text-2xl font-bold text-foreground">Faculty Directory</h1>
            <p className="text-muted-foreground">Manage faculty members across departments</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Link to="/college/faculty/add">
            <Button variant="gradient">
              <Plus className="w-4 h-4" />
              Add Faculty
            </Button>
          </Link>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="card-elevated p-4 text-center">
          <p className="text-3xl font-bold text-foreground">195</p>
          <p className="text-sm text-muted-foreground">Total Faculty</p>
        </div>
        <div className="card-elevated p-4 text-center">
          <p className="text-3xl font-bold text-primary">48</p>
          <p className="text-sm text-muted-foreground">Professors</p>
        </div>
        <div className="card-elevated p-4 text-center">
          <p className="text-3xl font-bold text-accent">72</p>
          <p className="text-sm text-muted-foreground">Associate Professors</p>
        </div>
        <div className="card-elevated p-4 text-center">
          <p className="text-3xl font-bold text-success">75</p>
          <p className="text-sm text-muted-foreground">Assistant Professors</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input placeholder="Search faculty by name..." className="pl-9" />
        </div>
        <Select defaultValue="all">
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Department" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Departments</SelectItem>
            <SelectItem value="cse">Computer Science</SelectItem>
            <SelectItem value="ece">Electronics</SelectItem>
            <SelectItem value="me">Mechanical</SelectItem>
            <SelectItem value="ce">Civil</SelectItem>
          </SelectContent>
        </Select>
        <Select defaultValue="all">
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Designation" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Designations</SelectItem>
            <SelectItem value="professor">Professor</SelectItem>
            <SelectItem value="associate">Associate Professor</SelectItem>
            <SelectItem value="assistant">Assistant Professor</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Faculty Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {faculty.map((member) => (
          <Link key={member.id} to={`/college/faculty/${member.id}`}>
            <motion.div
              whileHover={{ y: -2 }}
              className="card-elevated p-5 cursor-pointer hover:border-primary/30 transition-all"
            >
              <div className="flex items-start gap-4 mb-4">
                <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-lg font-bold text-primary">
                    {member.name.split(' ').slice(1).map(n => n[0]).join('')}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-foreground truncate">{member.name}</h3>
                  <p className="text-sm text-primary">{member.designation}</p>
                  <p className="text-sm text-muted-foreground">{member.department}</p>
                </div>
              </div>
              
              <p className="text-sm text-muted-foreground mb-4 line-clamp-1">
                Specialization: {member.specialization}
              </p>
              
              <div className="grid grid-cols-3 gap-2 pt-4 border-t border-border">
                <div className="text-center">
                  <p className="text-lg font-bold text-foreground">{member.courses}</p>
                  <p className="text-xs text-muted-foreground">Courses</p>
                </div>
                <div className="text-center">
                  <p className="text-lg font-bold text-foreground">{member.students}</p>
                  <p className="text-xs text-muted-foreground">Students</p>
                </div>
                <div className="text-center">
                  <p className="text-lg font-bold text-foreground">{member.experience}y</p>
                  <p className="text-xs text-muted-foreground">Exp.</p>
                </div>
              </div>
            </motion.div>
          </Link>
        ))}
      </div>
    </motion.div>
  );
}

export default Faculty;
