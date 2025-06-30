export declare class SessionsService {
    private prisma;
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
    createSession(sessionData: {
        title: string;
        description?: string;
        startTime: Date;
        endTime: Date;
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
    updateSession(sessionId: string, updateData: Partial<{
        title: string;
        description: string;
        startTime: Date;
        endTime: Date;
        status: string;
    }>): Promise<{
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
    deleteSession(sessionId: string): Promise<{
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
    private notifyModeratorsOfTeacherNote;
}
