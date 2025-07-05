import { ValidationPipe as NestValidationPipe, BadRequestException } from '@nestjs/common';
import { ValidationError } from 'class-validator';

export class ValidationPipe extends NestValidationPipe {
  constructor() {
    super({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      exceptionFactory: (errors: ValidationError[]) => {
        const messages = flattenValidationErrors(errors);
        return new BadRequestException({
          message: messages,
          error: 'Validation failed',
        });
      },
    });
  }
}

function flattenValidationErrors(errors: ValidationError[]): string[] {
  return errors.reduce((acc, error) => {
    if (error.constraints) {
      acc.push(...Object.values(error.constraints));
    }
    if (error.children && error.children.length > 0) {
      acc.push(...flattenValidationErrors(error.children));
    }
    return acc;
  }, [] as string[]);
}