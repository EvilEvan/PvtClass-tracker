import { AuthService } from './auth.service';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    setupAdmin(body: {
        email: string;
        name: string;
        password: string;
    }): Promise<{
        id: string;
        email: string;
        name: string;
        role: string;
        message: string;
    } | {
        error: string;
    }>;
    createUser(body: {
        email: string;
        name: string;
        password: string;
        role: 'TEACHER' | 'MODERATOR' | 'ADMIN';
    }): Promise<{
        id: string;
        email: string;
        name: string;
        role: string;
    } | {
        error: string;
    }>;
    login(body: {
        email: string;
        password: string;
    }): Promise<{
        error: string;
        success?: undefined;
        user?: undefined;
    } | {
        success: boolean;
        user: {
            id: string;
            email: string;
            name: string;
            role: string;
        };
        error?: undefined;
    }>;
    masterUnlock(body: {
        password: string;
        targetUserId?: string;
    }): Promise<{
        error: string;
        success?: undefined;
        masterAccess?: undefined;
        message?: undefined;
    } | {
        success: boolean;
        masterAccess: boolean;
        message: string;
        error?: undefined;
    }>;
    getAllUsers(): Promise<{
        id: string;
        email: string;
        name: string;
        role: string;
        createdAt: Date;
    }[]>;
    getTeachers(): Promise<{
        id: string;
        email: string;
        name: string;
    }[]>;
    getModerators(): Promise<{
        id: string;
        email: string;
        name: string;
    }[]>;
    updateUserRole(id: string, body: {
        role: string;
    }): Promise<{
        id: string;
        email: string;
        name: string | null;
        role: string;
        password: string | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
    deleteUser(id: string): Promise<{
        id: string;
        email: string;
        name: string | null;
        role: string;
        password: string | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
    checkAdminExists(): Promise<{
        adminExists: boolean;
        totalUsers: number;
        users: {
            email: string;
            role: string;
        }[];
    }>;
    addModeratorNotification(body: {
        moderatorEmail: string;
    }): Promise<{
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
