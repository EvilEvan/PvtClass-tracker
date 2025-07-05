import { PrismaService } from '../prisma/prisma.service';
import { Student } from './students.controller';
import { PrismaService } from '../common/prisma.service';
import { AppLogger } from '../common/logger.service';
export declare class StudentsService {
 cursor/investigate-and-implement-improvements-633d
    private prisma;
    constructor(prisma: PrismaService);

    private readonly prisma;
    private readonly logger;
    constructor(prisma: PrismaService, logger: AppLogger);
 main
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
