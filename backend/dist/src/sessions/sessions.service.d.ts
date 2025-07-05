 cursor/investigate-and-implement-improvements-633d
import { PrismaService } from '../prisma/prisma.service';
export declare class SessionsService {
    private prisma;
    constructor(prisma: PrismaService);
    getAllSessions(): Promise<({
        student: {
            id: string;
            email: string;
            name: string;
        };
        teacher: {
            id: string;
            email: string;
            name: string;
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        description: string | null;
        startTime: Date;
        endTime: Date;
        status: string;
        teacherConfirmed: boolean;
        teacherNotes: string | null;
        studentId: string;
        teacherId: string;
    })[]>;
    getSessionsByTeacher(teacherId: string): Promise<({
        student: {
            id: string;
            email: string;
            name: string;
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        description: string | null;
        startTime: Date;
        endTime: Date;
        status: string;
        teacherConfirmed: boolean;
        teacherNotes: string | null;
        studentId: string;
        teacherId: string;
    })[]>;
    confirmSession(sessionId: string, teacherId: string, notes?: string): Promise<{
        student: {
            id: string;
            email: string;
            name: string | null;
            role: string;
            password: string | null;
            createdAt: Date;
            updatedAt: Date;
        };
        teacher: {
            id: string;
            email: string;
            name: string | null;
            role: string;
            password: string | null;
            createdAt: Date;
            updatedAt: Date;
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        description: string | null;
        startTime: Date;
        endTime: Date;
        status: string;
        teacherConfirmed: boolean;
        teacherNotes: string | null;
        studentId: string;
        teacherId: string;
    }>;
import { PrismaService } from '../common/prisma.service';
import { AppLogger } from '../common/logger.service';
export declare class SessionsService {
    private readonly prisma;
    private readonly logger;
    constructor(prisma: PrismaService, logger: AppLogger);
    getAllSessions(): Promise<any>;
    getSessionsByTeacher(teacherId: string): Promise<any>;
    confirmSession(sessionId: string, teacherId: string, notes?: string): Promise<any>;
 main
    createSession(sessionData: {
        title: string;
        description?: string;
        startTime: Date;
        endTime: Date;
        studentId: string;
        teacherId: string;
    }): Promise<any>;
    updateSession(sessionId: string, updateData: Partial<{
        title: string;
        description: string;
        startTime: Date;
        endTime: Date;
        status: string;
    }>): Promise<any>;
    deleteSession(sessionId: string): Promise<any>;
    getSessionStats(): Promise<{
        total: any;
        completed: any;
        confirmed: any;
        withNotes: any;
        confirmationRate: number;
    }>;
    private notifyModeratorsOfTeacherNote;
}
