import { PrismaService } from '../common/prisma.service';
import { AppLogger } from '../common/logger.service';
export declare class SessionsService {
    private readonly prisma;
    private readonly logger;
    constructor(prisma: PrismaService, logger: AppLogger);
    getAllSessions(): Promise<any>;
    getSessionsByTeacher(teacherId: string): Promise<any>;
    confirmSession(sessionId: string, teacherId: string, notes?: string): Promise<any>;
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
