import { PrismaService } from '../prisma/prisma.service';
import { Student } from './students.controller';
export declare class StudentsService {
    private prisma;
    constructor(prisma: PrismaService);
    private seedData;
    private transformStudent;
    findAll(status?: string): Promise<Student[]>;
    findOne(id: string): Promise<Student>;
    create(studentData: Omit<Student, 'id'>): Promise<Student>;
    update(id: string, studentData: Partial<Student>): Promise<Student>;
    remove(id: string): Promise<void>;
    getStats(): Promise<{
        total: number;
        active: number;
        inactive: number;
        suspended: number;
        subjectDistribution: {};
        recentEnrollments: Student[];
    }>;
    assignTeacher(studentId: string, teacherId: string): Promise<Student>;
    unassignTeacher(studentId: string): Promise<Student>;
    findByTeacher(teacherId: string): Promise<Student[]>;
    findUnassigned(): Promise<Student[]>;
}
