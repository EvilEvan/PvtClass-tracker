import { StudentsService } from './students.service';
export interface Student {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    dateOfBirth: string;
    enrollmentDate: string;
    status: 'active' | 'inactive' | 'suspended';
    subjects: string[];
    notes: string;
    assignedTeacherId?: string;
    assignedTeacher?: {
        id: string;
        name: string;
        email: string;
    };
    emergencyContact: {
        name: string;
        phone: string;
        relationship: string;
    };
    address: {
        street: string;
        city: string;
        state: string;
        zipCode: string;
    };
}
export declare class StudentsController {
    private readonly studentsService;
    constructor(studentsService: StudentsService);
    getAllStudents(status?: string): Promise<Student[]>;
    getStudent(id: string): Promise<Student>;
    createStudent(studentData: Omit<Student, 'id'>): Promise<Student>;
    updateStudent(id: string, studentData: Partial<Student>): Promise<Student>;
    deleteStudent(id: string): Promise<void>;
    getStudentStats(): Promise<{
        total: number;
        active: number;
        inactive: number;
        suspended: number;
        subjectDistribution: {};
        recentEnrollments: Student[];
    }>;
    assignTeacher(studentId: string, body: {
        teacherId: string;
    }): Promise<Student>;
    unassignTeacher(studentId: string): Promise<Student>;
    getStudentsByTeacher(teacherId: string): Promise<Student[]>;
    getUnassignedStudents(): Promise<Student[]>;
}
