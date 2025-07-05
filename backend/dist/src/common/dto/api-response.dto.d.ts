export declare class ApiResponseDto<T> {
    success: boolean;
    data?: T;
    message?: string;
    errors?: string[];
    timestamp: string;
    constructor(data?: T, message?: string, errors?: string[]);
    static success<T>(data?: T, message?: string): ApiResponseDto<T>;
    static error(message: string, errors?: string[]): ApiResponseDto<null>;
}
export declare class PaginatedResponseDto<T> extends ApiResponseDto<T[]> {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
    constructor(data: T[], total: number, page: number, limit: number, message?: string);
}
