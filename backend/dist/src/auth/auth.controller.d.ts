import { AuthService } from './auth.service';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    setupAdmin(body: {
        email: string;
        name: string;
        password: string;
    }): Promise<{
        id: any;
        email: any;
        name: any;
        role: any;
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
        id: any;
        email: any;
        name: any;
        role: any;
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
            id: any;
            email: any;
            name: any;
            role: any;
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
    getAllUsers(): Promise<any>;
    getTeachers(): Promise<any>;
    getModerators(): Promise<any>;
    updateUserRole(id: string, body: {
        role: string;
    }): Promise<any>;
    deleteUser(id: string): Promise<any>;
    checkAdminExists(): Promise<{
        adminExists: any;
        totalUsers: any;
        users: any;
    }>;
    addModeratorNotification(body: {
        moderatorEmail: string;
    }): Promise<any>;
    getNotificationSettings(): Promise<any>;
}
