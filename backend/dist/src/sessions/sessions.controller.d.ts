import { SessionsService } from './sessions.service';
export declare class SessionsController {
    private readonly sessionsService;
    constructor(sessionsService: SessionsService);
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
    createSession(sessionData: {
        title: string;
        description?: string;
        startTime: string;
        endTime: string;
        studentId: string;
        teacherId: string;
    }): Promise<{
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
    }>;
    updateSession(id: string, updateData: {
        title?: string;
        description?: string;
        startTime?: string;
        endTime?: string;
        status?: string;
    }): Promise<{
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
    deleteSession(id: string): Promise<{
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
    confirmSession(sessionId: string, body: {
        teacherId: string;
        notes?: string;
    }): Promise<{
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
    getSessionStats(): Promise<{
        total: number;
        completed: number;
        confirmed: number;
        withNotes: number;
        confirmationRate: number;
    }>;
    getPendingConfirmations(teacherId?: string): Promise<({
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
    getSessionsWithNotes(): Promise<({
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
}
