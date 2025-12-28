import { useState } from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Clock, Users, Search, Filter, Star, ChevronDown } from 'lucide-react';
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

interface Course {
  id: string;
  code: string;
  name: string;
  department: string;
  credits: number;
  instructor: string;
  semester: string;
  type: 'core' | 'elective' | 'lab';
  enrolled: number;
  capacity: number;
  rating: number;
  schedule: string;
  description: string;
}

const mockCourses: Course[] = [
  {
    id: '1',
    code: 'CS301',
    name: 'Data Structures & Algorithms',
    department: 'Computer Science',
    credits: 4,
    instructor: 'Dr. Sarah Mitchell',
    semester: 'Fall 2024',
    type: 'core',
    enrolled: 45,
    capacity: 60,
    rating: 4.8,
    schedule: 'Mon, Wed, Fri - 10:00 AM',
    description: 'Comprehensive study of data structures including arrays, linked lists, trees, graphs, and algorithm analysis.',
  },
  {
    id: '2',
    code: 'CS405',
    name: 'Machine Learning',
    department: 'Computer Science',
    credits: 3,
    instructor: 'Dr. James Wilson',
    semester: 'Fall 2024',
    type: 'elective',
    enrolled: 55,
    capacity: 55,
    rating: 4.9,
    schedule: 'Tue, Thu - 2:00 PM',
    description: 'Introduction to machine learning algorithms, neural networks, and practical applications.',
  },
  {
    id: '3',
    code: 'CS302L',
    name: 'Database Systems Lab',
    department: 'Computer Science',
    credits: 2,
    instructor: 'Prof. Emily Chen',
    semester: 'Fall 2024',
    type: 'lab',
    enrolled: 30,
    capacity: 40,
    rating: 4.5,
    schedule: 'Fri - 2:00 PM',
    description: 'Hands-on experience with SQL, database design, and management systems.',
  },
  {
    id: '4',
    code: 'MA201',
    name: 'Linear Algebra',
    department: 'Mathematics',
    credits: 3,
    instructor: 'Dr. Robert Brown',
    semester: 'Fall 2024',
    type: 'core',
    enrolled: 80,
    capacity: 100,
    rating: 4.3,
    schedule: 'Mon, Wed - 11:00 AM',
    description: 'Vector spaces, matrices, linear transformations, and eigenvalues.',
  },
  {
    id: '5',
    code: 'CS410',
    name: 'Cloud Computing',
    department: 'Computer Science',
    credits: 3,
    instructor: 'Dr. Michael Lee',
    semester: 'Fall 2024',
    type: 'elective',
    enrolled: 35,
    capacity: 50,
    rating: 4.7,
    schedule: 'Tue, Thu - 10:00 AM',
    description: 'AWS, Azure, distributed systems, and microservices architecture.',
  },
  {
    id: '6',
    code: 'CS205L',
    name: 'Operating Systems Lab',
    department: 'Computer Science',
    credits: 2,
    instructor: 'Prof. Lisa Wang',
    semester: 'Fall 2024',
    type: 'lab',
    enrolled: 28,
    capacity: 35,
    rating: 4.4,
    schedule: 'Wed - 3:00 PM',
    description: 'Process management, memory allocation, and file systems implementation.',
  },
];

const departments = ['All Departments', 'Computer Science', 'Mathematics', 'Physics', 'Electronics'];
const courseTypes = ['All Types', 'Core', 'Elective', 'Lab'];
const semesters = ['Fall 2024', 'Spring 2025', 'Fall 2025'];

export default function Courses() {
  const [searchQuery, setSearchQuery] = useState('');
  const [department, setDepartment] = useState('All Departments');
  const [courseType, setCourseType] = useState('All Types');
  const [expandedCourse, setExpandedCourse] = useState<string | null>(null);

  const filteredCourses = mockCourses.filter((course) => {
    const matchesSearch =
      course.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.instructor.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDepartment = department === 'All Departments' || course.department === department;
    const matchesType = courseType === 'All Types' || course.type === courseType.toLowerCase();
    return matchesSearch && matchesDepartment && matchesType;
  });

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'core':
        return 'bg-primary/10 text-primary border-primary/20';
      case 'elective':
        return 'bg-accent/10 text-accent border-accent/20';
      case 'lab':
        return 'bg-warning/10 text-warning border-warning/20';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Course Catalog</h1>
          <p className="text-muted-foreground mt-1">Browse and enroll in courses for the semester</p>
        </div>
        <Badge variant="secondary" className="w-fit">
          {filteredCourses.length} Courses Available
        </Badge>
      </div>

      {/* Filters */}
      <div className="card-elevated p-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search courses, instructors..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={department} onValueChange={setDepartment}>
            <SelectTrigger className="w-full md:w-48">
              <SelectValue placeholder="Department" />
            </SelectTrigger>
            <SelectContent>
              {departments.map((dept) => (
                <SelectItem key={dept} value={dept}>
                  {dept}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={courseType} onValueChange={setCourseType}>
            <SelectTrigger className="w-full md:w-36">
              <SelectValue placeholder="Type" />
            </SelectTrigger>
            <SelectContent>
              {courseTypes.map((type) => (
                <SelectItem key={type} value={type}>
                  {type}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Course Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredCourses.map((course, index) => (
          <motion.div
            key={course.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="card-elevated overflow-hidden"
          >
            <div className="p-5">
              {/* Header */}
              <div className="flex items-start justify-between mb-3">
                <div>
                  <span className="text-xs font-medium text-muted-foreground">{course.code}</span>
                  <h3 className="font-semibold text-foreground mt-0.5 line-clamp-2">{course.name}</h3>
                </div>
                <Badge className={getTypeColor(course.type)}>
                  {course.type.charAt(0).toUpperCase() + course.type.slice(1)}
                </Badge>
              </div>

              {/* Instructor */}
              <p className="text-sm text-muted-foreground mb-4">{course.instructor}</p>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-3 mb-4">
                <div className="text-center p-2 rounded-lg bg-muted/50">
                  <BookOpen className="w-4 h-4 mx-auto mb-1 text-muted-foreground" />
                  <span className="text-xs font-medium">{course.credits} Credits</span>
                </div>
                <div className="text-center p-2 rounded-lg bg-muted/50">
                  <Users className="w-4 h-4 mx-auto mb-1 text-muted-foreground" />
                  <span className="text-xs font-medium">{course.enrolled}/{course.capacity}</span>
                </div>
                <div className="text-center p-2 rounded-lg bg-muted/50">
                  <Star className="w-4 h-4 mx-auto mb-1 text-warning" />
                  <span className="text-xs font-medium">{course.rating}</span>
                </div>
              </div>

              {/* Schedule */}
              <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                <Clock className="w-4 h-4" />
                <span>{course.schedule}</span>
              </div>

              {/* Expandable Description */}
              <button
                onClick={() => setExpandedCourse(expandedCourse === course.id ? null : course.id)}
                className="flex items-center gap-1 text-sm text-primary hover:text-primary/80 transition-colors"
              >
                <span>View Details</span>
                <ChevronDown
                  className={`w-4 h-4 transition-transform ${
                    expandedCourse === course.id ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {expandedCourse === course.id && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-3 pt-3 border-t border-border"
                >
                  <p className="text-sm text-muted-foreground">{course.description}</p>
                </motion.div>
              )}
            </div>

            {/* Footer */}
            <div className="px-5 py-3 bg-muted/30 border-t border-border">
              <Button
                className="w-full"
                variant={course.enrolled >= course.capacity ? 'secondary' : 'default'}
                disabled={course.enrolled >= course.capacity}
              >
                {course.enrolled >= course.capacity ? 'Class Full' : 'Enroll Now'}
              </Button>
            </div>
          </motion.div>
        ))}
      </div>

      {filteredCourses.length === 0 && (
        <div className="text-center py-12">
          <BookOpen className="w-12 h-12 mx-auto text-muted-foreground/50 mb-4" />
          <h3 className="font-medium text-foreground mb-1">No courses found</h3>
          <p className="text-sm text-muted-foreground">Try adjusting your filters</p>
        </div>
      )}
    </div>
  );
}
