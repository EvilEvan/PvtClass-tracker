import { SessionsService } from './sessions.service';
export declare class SessionsController {
    private readonly sessionsService;
    constructor(sessionsService: SessionsService);
    getAllSessions(): Promise<any>;
    getSessionsByTeacher(teacherId: string): Promise<any>;
    createSession(sessionData: {
        title: string;
        description?: string;
        startTime: string;
        endTime: string;
        studentId: string;
        teacherId: string;
    }): Promise<any>;
    updateSession(id: string, updateData: {
        title?: string;
        description?: string;
        startTime?: string;
        endTime?: string;
        status?: string;
    }): Promise<any>;
    deleteSession(id: string): Promise<any>;
    confirmSession(sessionId: string, body: {
        teacherId: string;
        notes?: string;
    }): Promise<any>;
    getSessionStats(): Promise<{
        total: any;
        completed: any;
        confirmed: any;
        withNotes: any;
        confirmationRate: number;
    }>;
    getPendingConfirmations(teacherId?: string): Promise<any>;
    getSessionsWithNotes(): Promise<any>;
}
