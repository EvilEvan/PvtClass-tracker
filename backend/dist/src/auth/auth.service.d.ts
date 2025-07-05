export declare class AuthService {
    private prisma;
    private readonly MASTER_PASSWORD;
    createAdminUser(email: string, name: string, password: string): Promise<{
        id: any;
        email: any;
        name: any;
        role: any;
        message: string;
    }>;
    createUser(email: string, name: string, password: string, role: 'TEACHER' | 'MODERATOR' | 'ADMIN'): Promise<{
        id: any;
        email: any;
        name: any;
        role: any;
    }>;
    validateUser(email: string, password: string): Promise<any>;
    validateMasterPassword(password: string): Promise<boolean>;
    findUserByEmail(email: string): Promise<any>;
    getAllUsers(): Promise<any>;
    updateUserRole(userId: string, role: string): Promise<any>;
    deleteUser(userId: string): Promise<any>;
    getModerators(): Promise<any>;
    getTeachers(): Promise<any>;
    private initializeSystemConfig;
    addModeratorNotification(moderatorEmail: string): Promise<any>;
    getNotificationSettings(): Promise<any>;
}
