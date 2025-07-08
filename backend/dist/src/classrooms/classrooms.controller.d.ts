import { ClassroomsService } from './classrooms.service';
export interface Classroom {
    id: string;
    name: string;
    capacity: number;
    location: string;
    equipment: string[];
    status: 'available' | 'in-use' | 'maintenance';
    currentSession?: {
        sessionId: string;
        studentName: string;
        subject: string;
        startTime: string;
        endTime: string;
        reportedBy: string;
    };
}
export interface ClassroomUsageReport {
    id: string;
    classroomId: string;
    classroomName: string;
    sessionId?: string;
    studentName: string;
    subject: string;
    startTime: string;
    endTime?: string;
    status: 'active' | 'completed' | 'cancelled';
    reportedBy: string;
    reportedAt: string;
    notes?: string;
}
export declare class ClassroomsController {
    private readonly classroomsService;
    constructor(classroomsService: ClassroomsService);
    getAllClassrooms(): Promise<Classroom[]>;
    getUsageReports(date?: string, classroomId?: string): Promise<ClassroomUsageReport[]>;
    getClassroom(id: string): Promise<Classroom>;
    createClassroom(classroomData: Omit<Classroom, 'id' | 'currentSession'>): Promise<Classroom>;
    reportClassroomUsage(usageData: Omit<ClassroomUsageReport, 'id' | 'reportedAt'>): Promise<ClassroomUsageReport>;
    endClassroomUsage(reportId: string, endData: {
        endTime: string;
        notes?: string;
    }): Promise<ClassroomUsageReport>;
    updateClassroom(id: string, classroomData: Partial<Classroom>): Promise<Classroom>;
    deleteClassroom(id: string): Promise<void>;
    getClassroomStats(): Promise<{
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
