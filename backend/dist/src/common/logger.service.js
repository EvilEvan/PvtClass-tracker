"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppLogger = void 0;
const common_1 = require("@nestjs/common");
let AppLogger = class AppLogger {
    log(message, context) {
        this.formatAndLog('LOG', message, context);
    }
    error(message, trace, context) {
        this.formatAndLog('ERROR', message, context, trace);
    }
    warn(message, context) {
        this.formatAndLog('WARN', message, context);
    }
    debug(message, context) {
        if (process.env.NODE_ENV === 'development') {
            this.formatAndLog('DEBUG', message, context);
        }
    }
    verbose(message, context) {
        if (process.env.NODE_ENV === 'development') {
            this.formatAndLog('VERBOSE', message, context);
        }
    }
    formatAndLog(level, message, context, trace) {
        const timestamp = new Date().toISOString();
        const contextStr = context ? `[${context}]` : '';
        const formattedMessage = `${timestamp} [${level}] ${contextStr} ${message}`;
        console.log(formattedMessage);
        if (trace) {
            console.log(`Stack trace: ${trace}`);
        }
    }
};
exports.AppLogger = AppLogger;
exports.AppLogger = AppLogger = __decorate([
    (0, common_1.Injectable)()
], AppLogger);
//# sourceMappingURL=logger.service.js.map