import { StudentsService } from './students.service';
import { ApiResponseDto } from '../common/dto/api-response.dto';
export declare class CreateStudentDto {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    dateOfBirth: string;
    enrollmentDate: string;
    status: string;
    subjects: string[];
    notes?: string;
    emergencyContact: {
        name: string;
        phone: string;
        relationship: string;
    };
    address: {
        street: string;
        city: string;
        state: string;
        zipCode: string;
    };
}
export declare class UpdateStudentDto {
    firstName?: string;
    lastName?: string;
    email?: string;
    phone?: string;
    dateOfBirth?: string;
    enrollmentDate?: string;
    status?: string;
    subjects?: string[];
    notes?: string;
    emergencyContact?: {
        name: string;
        phone: string;
        relationship: string;
    };
    address?: {
        street: string;
        city: string;
        state: string;
        zipCode: string;
    };
}
export interface Student {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    dateOfBirth: string;
    enrollmentDate: string;
    status: string;
    subjects: string[];
    notes?: string;
    assignedTeacherId?: string;
    assignedTeacher?: {
        id: string;
        name: string;
        email: string;
    };
    emergencyContact: {
        name: string;
        phone: string;
        relationship: string;
    };
    address: {
        street: string;
        city: string;
        state: string;
        zipCode: string;
    };
}
export declare class StudentsController {
    private readonly studentsService;
    constructor(studentsService: StudentsService);
    create(createStudentDto: CreateStudentDto): Promise<ApiResponseDto<Student>>;
    findAll(status?: string): Promise<ApiResponseDto<Student[]>>;
    getStats(): Promise<ApiResponseDto<{
        total: any;
        active: any;
        inactive: any;
        suspended: any;
        subjectDistribution: {};
        recentEnrollments: any;
    }>>;
    findOne(id: string): Promise<ApiResponseDto<Student>>;
    update(id: string, updateStudentDto: UpdateStudentDto): Promise<ApiResponseDto<Student>>;
    remove(id: string): Promise<ApiResponseDto<any>>;
    assignTeacher(id: string, teacherId: string): Promise<ApiResponseDto<Student>>;
    unassignTeacher(id: string): Promise<ApiResponseDto<Student>>;
}
