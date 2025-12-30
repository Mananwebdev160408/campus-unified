import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  FileText,
  TrendingUp,
  Award,
  Calendar,
  ChevronDown,
  ChevronUp,
  Download,
  Shield,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';

interface Grade {
  courseCode: string;
  courseName: string;
  credits: number;
  midterm: number;
  final: number;
  assignments: number;
  total: number;
  grade: string;
  gradePoint: number;
}

interface Semester {
  id: string;
  name: string;
  year: string;
  sgpa: number;
  totalCredits: number;
  grades: Grade[];
}

const semesters: Semester[] = [
  {
    id: '1',
    name: 'Fall',
    year: '2024',
    sgpa: 8.92,
    totalCredits: 22,
    grades: [
      { courseCode: 'CS301', courseName: 'Data Structures & Algorithms', credits: 4, midterm: 42, final: 85, assignments: 48, total: 88, grade: 'A', gradePoint: 9 },
      { courseCode: 'CS405', courseName: 'Machine Learning', credits: 3, midterm: 38, final: 90, assignments: 50, total: 92, grade: 'A+', gradePoint: 10 },
      { courseCode: 'MA201', courseName: 'Linear Algebra', credits: 3, midterm: 35, final: 78, assignments: 42, total: 78, grade: 'B+', gradePoint: 8 },
      { courseCode: 'CS410', courseName: 'Cloud Computing', credits: 3, midterm: 40, final: 88, assignments: 47, total: 90, grade: 'A+', gradePoint: 10 },
      { courseCode: 'CS302L', courseName: 'Database Systems Lab', credits: 2, midterm: 45, final: 82, assignments: 45, total: 86, grade: 'A', gradePoint: 9 },
    ],
  },
  {
    id: '2',
    name: 'Spring',
    year: '2024',
    sgpa: 8.65,
    totalCredits: 21,
    grades: [
      { courseCode: 'CS201', courseName: 'Object Oriented Programming', credits: 4, midterm: 40, final: 82, assignments: 45, total: 84, grade: 'A', gradePoint: 9 },
      { courseCode: 'CS202', courseName: 'Computer Networks', credits: 3, midterm: 36, final: 75, assignments: 40, total: 76, grade: 'B+', gradePoint: 8 },
      { courseCode: 'MA102', courseName: 'Discrete Mathematics', credits: 3, midterm: 42, final: 88, assignments: 48, total: 90, grade: 'A+', gradePoint: 10 },
      { courseCode: 'CS203', courseName: 'Operating Systems', credits: 4, midterm: 38, final: 80, assignments: 44, total: 82, grade: 'A', gradePoint: 9 },
    ],
  },
];

const upcomingExams = [
  { courseCode: 'CS301', courseName: 'Data Structures', date: '2024-02-15', time: '10:00 AM', venue: 'Hall A', type: 'Final' },
  { courseCode: 'CS405', courseName: 'Machine Learning', date: '2024-02-18', time: '02:00 PM', venue: 'Hall B', type: 'Final' },
  { courseCode: 'MA201', courseName: 'Linear Algebra', date: '2024-02-20', time: '10:00 AM', venue: 'Hall C', type: 'Final' },
];

const cgpa = 8.78;

export default function Examinations() {
  const [expandedSemester, setExpandedSemester] = useState<string | null>('1');

  const getGradeColor = (grade: string) => {
    if (grade.startsWith('A')) return 'text-success';
    if (grade.startsWith('B')) return 'text-primary';
    if (grade.startsWith('C')) return 'text-warning';
    return 'text-destructive';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground">Examinations & Grades</h1>
        <p className="text-muted-foreground mt-1">View your academic performance and exam schedule</p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="card-elevated p-5"
        >
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-primary/10">
              <TrendingUp className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">CGPA</p>
              <p className="text-2xl font-bold text-foreground">{cgpa}</p>
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
            <div className="p-2.5 rounded-xl bg-success/10">
              <Award className="w-5 h-5 text-success" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Current SGPA</p>
              <p className="text-2xl font-bold text-foreground">{semesters[0].sgpa}</p>
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
              <FileText className="w-5 h-5 text-accent" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Credits Earned</p>
              <p className="text-2xl font-bold text-foreground">86</p>
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
              <Calendar className="w-5 h-5 text-warning" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Upcoming Exams</p>
              <p className="text-2xl font-bold text-foreground">{upcomingExams.length}</p>
            </div>
          </div>
        </motion.div>
      </div>

      <Tabs defaultValue="grades" className="space-y-4">
        <TabsList>
          <TabsTrigger value="grades">Gradebook</TabsTrigger>
          <TabsTrigger value="schedule">Exam Schedule</TabsTrigger>
          <TabsTrigger value="transcript">Transcript</TabsTrigger>
        </TabsList>

        {/* Gradebook Tab */}
        <TabsContent value="grades" className="space-y-4">
          {semesters.map((semester, index) => (
            <motion.div
              key={semester.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="card-elevated overflow-hidden"
            >
              <button
                onClick={() => setExpandedSemester(expandedSemester === semester.id ? null : semester.id)}
                className="w-full p-5 flex items-center justify-between hover:bg-muted/30 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div>
                    <h3 className="font-semibold text-foreground text-left">
                      {semester.name} {semester.year}
                    </h3>
                    <p className="text-sm text-muted-foreground">{semester.totalCredits} Credits</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <Badge variant="secondary" className="text-sm">
                    SGPA: {semester.sgpa}
                  </Badge>
                  {expandedSemester === semester.id ? (
                    <ChevronUp className="w-5 h-5 text-muted-foreground" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-muted-foreground" />
                  )}
                </div>
              </button>

              {expandedSemester === semester.id && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="border-t border-border"
                >
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-muted/30">
                        <tr>
                          <th className="text-left p-4 text-sm font-medium text-muted-foreground">Course</th>
                          <th className="text-center p-4 text-sm font-medium text-muted-foreground">Credits</th>
                          <th className="text-center p-4 text-sm font-medium text-muted-foreground">Midterm</th>
                          <th className="text-center p-4 text-sm font-medium text-muted-foreground">Final</th>
                          <th className="text-center p-4 text-sm font-medium text-muted-foreground">Assignments</th>
                          <th className="text-center p-4 text-sm font-medium text-muted-foreground">Total</th>
                          <th className="text-center p-4 text-sm font-medium text-muted-foreground">Grade</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-border">
                        {semester.grades.map((grade) => (
                          <tr key={grade.courseCode} className="hover:bg-muted/20">
                            <td className="p-4">
                              <div>
                                <span className="text-xs text-muted-foreground">{grade.courseCode}</span>
                                <p className="font-medium text-foreground">{grade.courseName}</p>
                              </div>
                            </td>
                            <td className="text-center p-4 text-sm">{grade.credits}</td>
                            <td className="text-center p-4 text-sm">{grade.midterm}/50</td>
                            <td className="text-center p-4 text-sm">{grade.final}/100</td>
                            <td className="text-center p-4 text-sm">{grade.assignments}/50</td>
                            <td className="text-center p-4 text-sm font-medium">{grade.total}</td>
                            <td className="text-center p-4">
                              <Badge className={cn('font-semibold', getGradeColor(grade.grade))}>
                                {grade.grade}
                              </Badge>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </motion.div>
              )}
            </motion.div>
          ))}
        </TabsContent>

        {/* Exam Schedule Tab */}
        <TabsContent value="schedule" className="space-y-4">
          <div className="card-elevated">
            <div className="p-5 border-b border-border">
              <h2 className="text-lg font-semibold text-foreground">Upcoming Examinations</h2>
            </div>
            <div className="divide-y divide-border">
              {upcomingExams.map((exam, index) => (
                <motion.div
                  key={exam.courseCode}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="p-5 hover:bg-muted/30 transition-colors"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex items-start gap-4">
                      <div className="p-3 rounded-xl bg-primary/10">
                        <FileText className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-xs font-medium text-muted-foreground">{exam.courseCode}</span>
                          <Badge variant="outline">{exam.type}</Badge>
                        </div>
                        <h3 className="font-medium text-foreground">{exam.courseName}</h3>
                        <p className="text-sm text-muted-foreground mt-1">
                          {exam.date} at {exam.time} • {exam.venue}
                        </p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      View Syllabus
                    </Button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </TabsContent>

        {/* Transcript Tab */}
        <TabsContent value="transcript" className="space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="card-elevated p-6"
          >
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-xl bg-primary/10">
                  <Shield className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-foreground">Official Transcript</h2>
                  <p className="text-sm text-muted-foreground">Verified & tamper-proof document</p>
                </div>
              </div>
              <Button>
                <Download className="w-4 h-4 mr-2" />
                Download PDF
              </Button>
            </div>

            <div className="border border-border rounded-xl p-6 bg-muted/20">
              <div className="grid gap-6 md:grid-cols-2 mb-6">
                <div>
                  <p className="text-sm text-muted-foreground">Student Name</p>
                  <p className="font-medium text-foreground">Alex Johnson</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Student ID</p>
                  <p className="font-medium text-foreground">STU2021001</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Program</p>
                  <p className="font-medium text-foreground">B.Tech Computer Science</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">CGPA</p>
                  <p className="font-medium text-foreground">{cgpa} / 10.0</p>
                </div>
              </div>

              <div className="border-t border-border pt-6">
                <h3 className="font-medium text-foreground mb-4">Semester Summary</h3>
                <div className="space-y-3">
                  {semesters.map((sem) => (
                    <div key={sem.id} className="flex items-center justify-between p-3 rounded-lg bg-background">
                      <span className="text-sm font-medium">{sem.name} {sem.year}</span>
                      <div className="flex items-center gap-4">
                        <span className="text-sm text-muted-foreground">{sem.totalCredits} Credits</span>
                        <Badge variant="secondary">SGPA: {sem.sgpa}</Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
