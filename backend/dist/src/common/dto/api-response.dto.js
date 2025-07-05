"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaginatedResponseDto = exports.ApiResponseDto = void 0;
class ApiResponseDto {
    constructor(data, message, errors) {
        this.success = !errors || errors.length === 0;
        this.data = data;
        this.message = message;
        this.errors = errors;
        this.timestamp = new Date().toISOString();
    }
    static success(data, message) {
        return new ApiResponseDto(data, message);
    }
    static error(message, errors) {
        return new ApiResponseDto(null, message, errors);
    }
}
exports.ApiResponseDto = ApiResponseDto;
class PaginatedResponseDto extends ApiResponseDto {
    constructor(data, total, page, limit, message) {
        super(data, message);
        this.total = total;
        this.page = page;
        this.limit = limit;
        this.totalPages = Math.ceil(total / limit);
    }
}
exports.PaginatedResponseDto = PaginatedResponseDto;
//# sourceMappingURL=api-response.dto.js.map