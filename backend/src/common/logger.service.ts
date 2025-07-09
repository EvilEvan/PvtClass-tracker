import { Injectable, LoggerService } from '@nestjs/common';

@Injectable()
export class AppLogger implements LoggerService {
  log(message: string, context?: string) {
    this.formatAndLog('LOG', message, context);
  }

  error(message: string, trace?: string, context?: string) {
    this.formatAndLog('ERROR', message, context, trace);
  }

  warn(message: string, context?: string) {
    this.formatAndLog('WARN', message, context);
  }

  debug(message: string, context?: string) {
    if (process.env.NODE_ENV === 'development') {
      this.formatAndLog('DEBUG', message, context);
    }
  }

  verbose(message: string, context?: string) {
    if (process.env.NODE_ENV === 'development') {
      this.formatAndLog('VERBOSE', message, context);
    }
  }

  private formatAndLog(
    level: string,
    message: string,
    context?: string,
    trace?: string,
  ) {
    const timestamp = new Date().toISOString();
    const contextStr = context ? `[${context}]` : '';
    const formattedMessage = `${timestamp} [${level}] ${contextStr} ${message}`;

    console.log(formattedMessage);

    if (trace) {
      console.log(`Stack trace: ${trace}`);
    }
  }
}
