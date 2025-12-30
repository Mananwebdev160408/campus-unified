import { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Clock, MapPin, User, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface ScheduleClass {
  id: string;
  courseCode: string;
  courseName: string;
  instructor: string;
  room: string;
  startTime: string;
  endTime: string;
  type: 'lecture' | 'lab' | 'tutorial';
  day: number;
  hasClash?: boolean;
}

const mockSchedule: ScheduleClass[] = [
  { id: '1', courseCode: 'CS301', courseName: 'Data Structures', instructor: 'Dr. Sarah Mitchell', room: 'Room 301', startTime: '09:00', endTime: '10:00', type: 'lecture', day: 0 },
  { id: '2', courseCode: 'MA201', courseName: 'Linear Algebra', instructor: 'Dr. Robert Brown', room: 'Room 105', startTime: '10:00', endTime: '11:00', type: 'lecture', day: 0 },
  { id: '3', courseCode: 'CS405', courseName: 'Machine Learning', instructor: 'Dr. James Wilson', room: 'Lab 201', startTime: '14:00', endTime: '16:00', type: 'lab', day: 0 },
  { id: '4', courseCode: 'CS301', courseName: 'Data Structures', instructor: 'Dr. Sarah Mitchell', room: 'Room 301', startTime: '09:00', endTime: '10:00', type: 'lecture', day: 1 },
  { id: '5', courseCode: 'CS410', courseName: 'Cloud Computing', instructor: 'Dr. Michael Lee', room: 'Room 402', startTime: '11:00', endTime: '12:30', type: 'lecture', day: 1 },
  { id: '6', courseCode: 'CS302L', courseName: 'Database Lab', instructor: 'Prof. Emily Chen', room: 'Lab 102', startTime: '14:00', endTime: '16:00', type: 'lab', day: 1 },
  { id: '7', courseCode: 'MA201', courseName: 'Linear Algebra', instructor: 'Dr. Robert Brown', room: 'Room 105', startTime: '10:00', endTime: '11:00', type: 'lecture', day: 2 },
  { id: '8', courseCode: 'CS301', courseName: 'Data Structures', instructor: 'Dr. Sarah Mitchell', room: 'Room 301', startTime: '09:00', endTime: '10:00', type: 'lecture', day: 2 },
  { id: '9', courseCode: 'CS405', courseName: 'Machine Learning', instructor: 'Dr. James Wilson', room: 'Room 301', startTime: '14:00', endTime: '15:30', type: 'tutorial', day: 2 },
  { id: '10', courseCode: 'CS410', courseName: 'Cloud Computing', instructor: 'Dr. Michael Lee', room: 'Room 402', startTime: '11:00', endTime: '12:30', type: 'lecture', day: 3 },
  { id: '11', courseCode: 'CS205L', courseName: 'OS Lab', instructor: 'Prof. Lisa Wang', room: 'Lab 103', startTime: '15:00', endTime: '17:00', type: 'lab', day: 3, hasClash: true },
  { id: '12', courseCode: 'CS301', courseName: 'Data Structures', instructor: 'Dr. Sarah Mitchell', room: 'Room 301', startTime: '09:00', endTime: '10:00', type: 'lecture', day: 4 },
  { id: '13', courseCode: 'CS302L', courseName: 'Database Lab', instructor: 'Prof. Emily Chen', room: 'Lab 102', startTime: '14:00', endTime: '16:00', type: 'lab', day: 4 },
];

const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const shortDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const timeSlots = ['09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00'];

export default function Timetable() {
  const [currentWeek, setCurrentWeek] = useState(0);
  const [selectedClass, setSelectedClass] = useState<ScheduleClass | null>(null);

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'lecture':
        return 'bg-primary/10 border-primary/30 text-primary';
      case 'lab':
        return 'bg-accent/10 border-accent/30 text-accent';
      case 'tutorial':
        return 'bg-warning/10 border-warning/30 text-warning';
      default:
        return 'bg-muted';
    }
  };

  const getClassesForSlot = (day: number, time: string) => {
    return mockSchedule.filter(
      (c) => c.day === day && c.startTime === time
    );
  };

  const getClassHeight = (startTime: string, endTime: string) => {
    const start = parseInt(startTime.split(':')[0]);
    const end = parseInt(endTime.split(':')[0]) + (parseInt(endTime.split(':')[1]) > 0 ? 0.5 : 0);
    return (end - start) * 60;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Timetable</h1>
          <p className="text-muted-foreground mt-1">Your weekly class schedule</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" onClick={() => setCurrentWeek(currentWeek - 1)}>
            <ChevronLeft className="w-4 h-4" />
          </Button>
          <span className="text-sm font-medium px-4">Week {currentWeek + 1}</span>
          <Button variant="outline" size="icon" onClick={() => setCurrentWeek(currentWeek + 1)}>
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-4">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-primary" />
          <span className="text-sm text-muted-foreground">Lecture</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-accent" />
          <span className="text-sm text-muted-foreground">Lab</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-warning" />
          <span className="text-sm text-muted-foreground">Tutorial</span>
        </div>
        <div className="flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 text-destructive" />
          <span className="text-sm text-muted-foreground">Schedule Clash</span>
        </div>
      </div>

      {/* Timetable Grid */}
      <div className="card-elevated overflow-hidden">
        <div className="overflow-x-auto">
          <div className="min-w-[800px]">
            {/* Header Row */}
            <div className="grid grid-cols-7 border-b border-border">
              <div className="p-3 text-center text-sm font-medium text-muted-foreground bg-muted/30">
                Time
              </div>
              {days.map((day, index) => (
                <div
                  key={day}
                  className="p-3 text-center text-sm font-medium text-foreground bg-muted/30 border-l border-border"
                >
                  <span className="hidden sm:inline">{day}</span>
                  <span className="sm:hidden">{shortDays[index]}</span>
                </div>
              ))}
            </div>

            {/* Time Rows */}
            {timeSlots.map((time, timeIndex) => (
              <div key={time} className="grid grid-cols-7 border-b border-border last:border-b-0">
                <div className="p-3 text-center text-sm text-muted-foreground bg-muted/20 flex items-start justify-center">
                  {time}
                </div>
                {days.map((_, dayIndex) => {
                  const classes = getClassesForSlot(dayIndex, time);
                  return (
                    <div
                      key={`${dayIndex}-${time}`}
                      className="relative border-l border-border min-h-[60px] bg-background"
                    >
                      {classes.map((classItem) => (
                        <motion.div
                          key={classItem.id}
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          className={cn(
                            'absolute inset-x-1 top-1 rounded-md border p-2 cursor-pointer transition-shadow hover:shadow-md',
                            getTypeColor(classItem.type),
                            classItem.hasClash && 'ring-2 ring-destructive ring-offset-1'
                          )}
                          style={{
                            height: `${getClassHeight(classItem.startTime, classItem.endTime) - 8}px`,
                          }}
                          onClick={() => setSelectedClass(classItem)}
                        >
                          <div className="flex flex-col h-full">
                            <span className="text-xs font-semibold truncate">
                              {classItem.courseCode}
                            </span>
                            <span className="text-xs truncate opacity-80">
                              {classItem.room}
                            </span>
                            {classItem.hasClash && (
                              <AlertTriangle className="w-3 h-3 mt-auto text-destructive" />
                            )}
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Selected Class Details */}
      {selectedClass && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="card-elevated p-5"
        >
          <div className="flex items-start justify-between mb-4">
            <div>
              <Badge className={getTypeColor(selectedClass.type)}>
                {selectedClass.type.charAt(0).toUpperCase() + selectedClass.type.slice(1)}
              </Badge>
              <h3 className="text-lg font-semibold mt-2">{selectedClass.courseName}</h3>
              <p className="text-sm text-muted-foreground">{selectedClass.courseCode}</p>
            </div>
            <Button variant="ghost" size="sm" onClick={() => setSelectedClass(null)}>
              ✕
            </Button>
          </div>
          <div className="grid gap-3 sm:grid-cols-3">
            <div className="flex items-center gap-2 text-sm">
              <User className="w-4 h-4 text-muted-foreground" />
              <span>{selectedClass.instructor}</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <MapPin className="w-4 h-4 text-muted-foreground" />
              <span>{selectedClass.room}</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Clock className="w-4 h-4 text-muted-foreground" />
              <span>{selectedClass.startTime} - {selectedClass.endTime}</span>
            </div>
          </div>
          {selectedClass.hasClash && (
            <div className="mt-4 p-3 rounded-lg bg-destructive/10 border border-destructive/20 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-destructive" />
              <span className="text-sm text-destructive">This class has a scheduling conflict</span>
            </div>
          )}
        </motion.div>
      )}
    </div>
  );
}
