import { motion } from 'framer-motion';
import {
  CalendarCheck,
  CalendarX,
  Clock,
  TrendingUp,
  TrendingDown,
  AlertCircle,
  CheckCircle2,
  XCircle,
  MinusCircle,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';

interface CourseAttendance {
  id: string;
  courseCode: string;
  courseName: string;
  totalClasses: number;
  attended: number;
  percentage: number;
  trend: 'up' | 'down' | 'stable';
  lastAttended: string;
}

interface AttendanceRecord {
  date: string;
  day: string;
  classes: {
    courseCode: string;
    courseName: string;
    time: string;
    status: 'present' | 'absent' | 'late' | 'excused';
  }[];
}

const courseAttendance: CourseAttendance[] = [
  { id: '1', courseCode: 'CS301', courseName: 'Data Structures & Algorithms', totalClasses: 28, attended: 26, percentage: 93, trend: 'up', lastAttended: '2024-01-15' },
  { id: '2', courseCode: 'CS405', courseName: 'Machine Learning', totalClasses: 20, attended: 18, percentage: 90, trend: 'stable', lastAttended: '2024-01-14' },
  { id: '3', courseCode: 'MA201', courseName: 'Linear Algebra', totalClasses: 24, attended: 20, percentage: 83, trend: 'down', lastAttended: '2024-01-15' },
  { id: '4', courseCode: 'CS410', courseName: 'Cloud Computing', totalClasses: 18, attended: 17, percentage: 94, trend: 'up', lastAttended: '2024-01-14' },
  { id: '5', courseCode: 'CS302L', courseName: 'Database Systems Lab', totalClasses: 12, attended: 8, percentage: 67, trend: 'down', lastAttended: '2024-01-12' },
  { id: '6', courseCode: 'CS205L', courseName: 'Operating Systems Lab', totalClasses: 10, attended: 9, percentage: 90, trend: 'stable', lastAttended: '2024-01-11' },
];

const recentRecords: AttendanceRecord[] = [
  {
    date: '2024-01-15',
    day: 'Monday',
    classes: [
      { courseCode: 'CS301', courseName: 'Data Structures', time: '09:00 AM', status: 'present' },
      { courseCode: 'MA201', courseName: 'Linear Algebra', time: '10:00 AM', status: 'present' },
      { courseCode: 'CS405', courseName: 'Machine Learning', time: '02:00 PM', status: 'late' },
    ],
  },
  {
    date: '2024-01-14',
    day: 'Sunday',
    classes: [
      { courseCode: 'CS410', courseName: 'Cloud Computing', time: '11:00 AM', status: 'present' },
      { courseCode: 'CS302L', courseName: 'Database Lab', time: '02:00 PM', status: 'absent' },
    ],
  },
  {
    date: '2024-01-13',
    day: 'Saturday',
    classes: [
      { courseCode: 'CS301', courseName: 'Data Structures', time: '09:00 AM', status: 'excused' },
    ],
  },
];

const overallStats = {
  totalClasses: 112,
  attended: 98,
  percentage: 87.5,
  threshold: 75,
};

export default function Attendance() {
  const getStatusConfig = (status: string) => {
    switch (status) {
      case 'present':
        return { icon: CheckCircle2, color: 'text-success', bg: 'bg-success/10', label: 'Present' };
      case 'absent':
        return { icon: XCircle, color: 'text-destructive', bg: 'bg-destructive/10', label: 'Absent' };
      case 'late':
        return { icon: Clock, color: 'text-warning', bg: 'bg-warning/10', label: 'Late' };
      case 'excused':
        return { icon: MinusCircle, color: 'text-muted-foreground', bg: 'bg-muted', label: 'Excused' };
      default:
        return { icon: MinusCircle, color: 'text-muted-foreground', bg: 'bg-muted', label: 'Unknown' };
    }
  };

  const getAttendanceColor = (percentage: number) => {
    if (percentage >= 85) return 'text-success';
    if (percentage >= 75) return 'text-warning';
    return 'text-destructive';
  };

  const getProgressColor = (percentage: number) => {
    if (percentage >= 85) return 'bg-success';
    if (percentage >= 75) return 'bg-warning';
    return 'bg-destructive';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground">Attendance Tracker</h1>
        <p className="text-muted-foreground mt-1">Monitor your class attendance and stay on track</p>
      </div>

      {/* Overall Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="card-elevated p-5"
        >
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-primary/10">
              <CalendarCheck className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Classes Attended</p>
              <p className="text-2xl font-bold text-foreground">{overallStats.attended}</p>
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
            <div className="p-2.5 rounded-xl bg-muted">
              <CalendarX className="w-5 h-5 text-muted-foreground" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Total Classes</p>
              <p className="text-2xl font-bold text-foreground">{overallStats.totalClasses}</p>
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
            <div className={cn('p-2.5 rounded-xl', overallStats.percentage >= 75 ? 'bg-success/10' : 'bg-destructive/10')}>
              <TrendingUp className={cn('w-5 h-5', getAttendanceColor(overallStats.percentage))} />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Overall Attendance</p>
              <p className={cn('text-2xl font-bold', getAttendanceColor(overallStats.percentage))}>
                {overallStats.percentage}%
              </p>
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
              <AlertCircle className="w-5 h-5 text-warning" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Threshold</p>
              <p className="text-2xl font-bold text-foreground">{overallStats.threshold}%</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Course-wise Attendance */}
      <div className="card-elevated">
        <div className="p-5 border-b border-border">
          <h2 className="text-lg font-semibold text-foreground">Course-wise Attendance</h2>
        </div>
        <div className="divide-y divide-border">
          {courseAttendance.map((course, index) => (
            <motion.div
              key={course.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              className="p-5 hover:bg-muted/30 transition-colors"
            >
              <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-medium text-muted-foreground">{course.courseCode}</span>
                    {course.percentage < 75 && (
                      <Badge variant="destructive" className="text-xs">Below Threshold</Badge>
                    )}
                  </div>
                  <h3 className="font-medium text-foreground truncate">{course.courseName}</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    {course.attended} / {course.totalClasses} classes attended
                  </p>
                </div>

                <div className="flex items-center gap-6 sm:w-64">
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1.5">
                      <span className={cn('text-sm font-semibold', getAttendanceColor(course.percentage))}>
                        {course.percentage}%
                      </span>
                      {course.trend === 'up' && <TrendingUp className="w-4 h-4 text-success" />}
                      {course.trend === 'down' && <TrendingDown className="w-4 h-4 text-destructive" />}
                    </div>
                    <div className="h-2 rounded-full bg-muted overflow-hidden">
                      <div
                        className={cn('h-full rounded-full transition-all', getProgressColor(course.percentage))}
                        style={{ width: `${course.percentage}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Recent Records */}
      <div className="card-elevated">
        <div className="p-5 border-b border-border">
          <h2 className="text-lg font-semibold text-foreground">Recent Attendance</h2>
        </div>
        <div className="divide-y divide-border">
          {recentRecords.map((record, index) => (
            <motion.div
              key={record.date}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="p-5"
            >
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h3 className="font-medium text-foreground">{record.day}</h3>
                  <p className="text-sm text-muted-foreground">{record.date}</p>
                </div>
                <Badge variant="secondary">{record.classes.length} Classes</Badge>
              </div>
              <div className="space-y-2">
                {record.classes.map((classItem, classIndex) => {
                  const statusConfig = getStatusConfig(classItem.status);
                  const StatusIcon = statusConfig.icon;
                  return (
                    <div
                      key={classIndex}
                      className={cn(
                        'flex items-center justify-between p-3 rounded-lg',
                        statusConfig.bg
                      )}
                    >
                      <div className="flex items-center gap-3">
                        <StatusIcon className={cn('w-4 h-4', statusConfig.color)} />
                        <div>
                          <span className="text-sm font-medium text-foreground">
                            {classItem.courseCode} - {classItem.courseName}
                          </span>
                          <p className="text-xs text-muted-foreground">{classItem.time}</p>
                        </div>
                      </div>
                      <Badge
                        variant="outline"
                        className={cn('text-xs', statusConfig.color)}
                      >
                        {statusConfig.label}
                      </Badge>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
