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
    create(createStudentDto: CreateStudentDto): Promise<ApiResponseDto<any>>;
    findAll(status?: string): Promise<ApiResponseDto<any>>;
    getStats(): Promise<ApiResponseDto<any>>;
    findOne(id: string): Promise<ApiResponseDto<any>>;
    update(id: string, updateStudentDto: UpdateStudentDto): Promise<ApiResponseDto<any>>;
    remove(id: string): Promise<ApiResponseDto<any>>;
    assignTeacher(id: string, teacherId: string): Promise<ApiResponseDto<any>>;
    unassignTeacher(id: string): Promise<ApiResponseDto<any>>;
}
