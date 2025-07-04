"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidationPipe = void 0;
const common_1 = require("@nestjs/common");
class ValidationPipe extends common_1.ValidationPipe {
    constructor() {
        super({
            whitelist: true,
            forbidNonWhitelisted: true,
            transform: true,
            exceptionFactory: (errors) => {
                const messages = flattenValidationErrors(errors);
                return new common_1.BadRequestException({
                    message: messages,
                    error: 'Validation failed',
                });
            },
        });
    }
}
exports.ValidationPipe = ValidationPipe;
function flattenValidationErrors(errors) {
    return errors.reduce((acc, error) => {
        if (error.constraints) {
            acc.push(...Object.values(error.constraints));
        }
        if (error.children && error.children.length > 0) {
            acc.push(...flattenValidationErrors(error.children));
        }
        return acc;
    }, []);
}
//# sourceMappingURL=validation.pipe.js.map