export class ApiResponseDto<T> {
  success: boolean;
  data?: T;
  message?: string;
  errors?: string[];
  timestamp: string;

  constructor(data?: T, message?: string, errors?: string[]) {
    this.success = !errors || errors.length === 0;
    this.data = data;
    this.message = message;
    this.errors = errors;
    this.timestamp = new Date().toISOString();
  }

  static success<T>(data?: T, message?: string): ApiResponseDto<T> {
    return new ApiResponseDto<T>(data, message);
  }

  static error(message: string, errors?: string[]): ApiResponseDto<null> {
    return new ApiResponseDto<null>(null, message, errors);
  }
}

export class PaginatedResponseDto<T> extends ApiResponseDto<T[]> {
  total: number;
  page: number;
  limit: number;
  totalPages: number;

  constructor(data: T[], total: number, page: number, limit: number, message?: string) {
    super(data, message);
    this.total = total;
    this.page = page;
    this.limit = limit;
    this.totalPages = Math.ceil(total / limit);
  }
}