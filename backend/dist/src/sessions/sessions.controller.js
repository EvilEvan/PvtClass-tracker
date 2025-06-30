"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SessionsController = void 0;
const common_1 = require("@nestjs/common");
const sessions_service_1 = require("./sessions.service");
let SessionsController = class SessionsController {
    constructor(sessionsService) {
        this.sessionsService = sessionsService;
    }
    async getAllSessions() {
        return this.sessionsService.getAllSessions();
    }
    async getSessionsByTeacher(teacherId) {
        return this.sessionsService.getSessionsByTeacher(teacherId);
    }
    async createSession(sessionData) {
        return this.sessionsService.createSession({
            ...sessionData,
            startTime: new Date(sessionData.startTime),
            endTime: new Date(sessionData.endTime),
        });
    }
    async updateSession(id, updateData) {
        const processedData = { ...updateData };
        if (updateData.startTime) {
            processedData.startTime = new Date(updateData.startTime);
        }
        if (updateData.endTime) {
            processedData.endTime = new Date(updateData.endTime);
        }
        return this.sessionsService.updateSession(id, processedData);
    }
    async deleteSession(id) {
        return this.sessionsService.deleteSession(id);
    }
    async confirmSession(sessionId, body) {
        const { teacherId, notes } = body;
        return this.sessionsService.confirmSession(sessionId, teacherId, notes);
    }
    async getSessionStats() {
        return this.sessionsService.getSessionStats();
    }
    async getPendingConfirmations(teacherId) {
        const sessions = await this.sessionsService.getAllSessions();
        let pendingSessions = sessions.filter(session => !session.teacherConfirmed &&
            session.status === 'SCHEDULED');
        if (teacherId) {
            pendingSessions = pendingSessions.filter(session => session.teacherId === teacherId);
        }
        return pendingSessions;
    }
    async getSessionsWithNotes() {
        const sessions = await this.sessionsService.getAllSessions();
        return sessions.filter(session => session.teacherNotes && session.teacherNotes.trim().length > 0);
    }
};
exports.SessionsController = SessionsController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], SessionsController.prototype, "getAllSessions", null);
__decorate([
    (0, common_1.Get)('teacher/:teacherId'),
    __param(0, (0, common_1.Param)('teacherId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], SessionsController.prototype, "getSessionsByTeacher", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], SessionsController.prototype, "createSession", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], SessionsController.prototype, "updateSession", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], SessionsController.prototype, "deleteSession", null);
__decorate([
    (0, common_1.Post)(':id/confirm'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], SessionsController.prototype, "confirmSession", null);
__decorate([
    (0, common_1.Get)('stats'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], SessionsController.prototype, "getSessionStats", null);
__decorate([
    (0, common_1.Get)('pending-confirmation'),
    __param(0, (0, common_1.Query)('teacherId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], SessionsController.prototype, "getPendingConfirmations", null);
__decorate([
    (0, common_1.Get)('with-notes'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], SessionsController.prototype, "getSessionsWithNotes", null);
exports.SessionsController = SessionsController = __decorate([
    (0, common_1.Controller)('sessions'),
    __metadata("design:paramtypes", [sessions_service_1.SessionsService])
], SessionsController);
//# sourceMappingURL=sessions.controller.js.map