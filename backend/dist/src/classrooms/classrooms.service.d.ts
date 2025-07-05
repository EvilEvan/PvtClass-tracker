import { Classroom, ClassroomUsageReport } from './classrooms.controller';
export declare class ClassroomsService {
    private prisma;
    constructor();
    private seedData;
    private transformClassroom;
    private transformUsageReport;
    findAll(): Promise<Classroom[]>;
    findOne(id: string): Promise<Classroom>;
    create(classroomData: Omit<Classroom, 'id' | 'currentSession'>): Promise<Classroom>;
    update(id: string, classroomData: Partial<Classroom>): Promise<Classroom>;
    remove(id: string): Promise<void>;
    reportUsage(usageData: Omit<ClassroomUsageReport, 'id' | 'reportedAt' | 'classroomName'>): Promise<ClassroomUsageReport>;
    endUsage(reportId: string, endData: {
        endTime: string;
        notes?: string;
    }): Promise<ClassroomUsageReport>;
    getUsageReports(date?: string, classroomId?: string): Promise<ClassroomUsageReport[]>;
    getStats(): Promise<{
        totalClassrooms: any;
        availableClassrooms: any;
        inUseClassrooms: any;
        maintenanceClassrooms: any;
        todaysUsage: {
            completed: any;
            active: any;
            total: any;
        };
        utilizationByClassroom: {};
        recentReports: any;
    }>;
}
