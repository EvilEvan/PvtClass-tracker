export declare class AuthService {
    private prisma;
    private readonly MASTER_PASSWORD;
    createAdminUser(email: string, name: string, password: string): Promise<{
        id: string;
        email: string;
        name: string;
        role: string;
        message: string;
    }>;
    createUser(email: string, name: string, password: string, role: 'TEACHER' | 'MODERATOR' | 'ADMIN'): Promise<{
        id: string;
        email: string;
        name: string;
        role: string;
    }>;
    validateUser(email: string, password: string): Promise<{
        id: string;
        email: string;
        name: string | null;
        role: string;
        password: string | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
    validateMasterPassword(password: string): Promise<boolean>;
    findUserByEmail(email: string): Promise<{
        id: string;
        email: string;
        name: string | null;
        role: string;
        password: string | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
    getAllUsers(): Promise<{
        id: string;
        email: string;
        name: string;
        role: string;
        createdAt: Date;
    }[]>;
    updateUserRole(userId: string, role: string): Promise<{
        id: string;
        email: string;
        name: string | null;
        role: string;
        password: string | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
    deleteUser(userId: string): Promise<{
        id: string;
        email: string;
        name: string | null;
        role: string;
        password: string | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
    getModerators(): Promise<{
        id: string;
        email: string;
        name: string;
    }[]>;
    getTeachers(): Promise<{
        id: string;
        email: string;
        name: string;
    }[]>;
    private initializeSystemConfig;
    addModeratorNotification(moderatorEmail: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        moderatorEmail: string;
        enableEmailNotifications: boolean;
    }>;
    getNotificationSettings(): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        moderatorEmail: string;
        enableEmailNotifications: boolean;
    }[]>;
}
