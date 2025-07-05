import { Student } from './students.controller';
import { PrismaService } from '../common/prisma.service';
import { AppLogger } from '../common/logger.service';
export declare class StudentsService {
    private readonly prisma;
    private readonly logger;
    constructor(prisma: PrismaService, logger: AppLogger);
    private seedData;
    private transformStudent;
    findAll(status?: string): Promise<Student[]>;
    findOne(id: string): Promise<Student>;
    create(studentData: Omit<Student, 'id'>): Promise<Student>;
    update(id: string, studentData: Partial<Student>): Promise<Student>;
    remove(id: string): Promise<void>;
    getStats(): Promise<{
        total: any;
        active: any;
        inactive: any;
        suspended: any;
        subjectDistribution: {};
        recentEnrollments: any;
    }>;
    assignTeacher(studentId: string, teacherId: string): Promise<Student>;
    unassignTeacher(studentId: string): Promise<Student>;
    findByTeacher(teacherId: string): Promise<Student[]>;
    findUnassigned(): Promise<Student[]>;
}
