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
Object.defineProperty(exports, "__esModule", { value: true });
exports.SessionsService = void 0;
const common_1 = require("@nestjs/common");
cursor / investigate - and - implement - improvements - 633;
d;
const prisma_service_1 = require("../prisma/prisma.service");
let SessionsService = class SessionsService {
    constructor(prisma) {
        this.prisma = prisma;
    }
};
exports.SessionsService = SessionsService;
exports.SessionsService = SessionsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], SessionsService);
const logger_service_1 = require("../common/logger.service");
let SessionsService = class SessionsService {
    constructor(prisma, logger) {
        this.prisma = prisma;
        this.logger = logger;
    }
};
exports.SessionsService = SessionsService;
exports.SessionsService = SessionsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        logger_service_1.AppLogger])
], SessionsService);
    > main;
async;
getAllSessions();
{
    return this.prisma.session.findMany({
        include: {
            student: {
                select: {
                    id: true,
                    name: true,
                    email: true,
                },
            },
            teacher: {
                select: {
                    id: true,
                    name: true,
                    email: true,
                },
            },
        },
    });
}
async;
getSessionsByTeacher(teacherId, string);
{
    return this.prisma.session.findMany({
        where: { teacherId },
        include: {
            student: {
                select: {
                    id: true,
                    name: true,
                    email: true,
                },
            },
        },
        orderBy: {
            startTime: 'desc',
        },
    });
}
async;
confirmSession(sessionId, string, teacherId, string, notes ?  : string);
{
    const session = await this.prisma.session.update({
        where: { id: sessionId },
        data: {
            teacherConfirmed: true,
            teacherNotes: notes,
            status: 'COMPLETED',
        },
        include: {
            student: true,
            teacher: true,
        },
    });
    if (notes && notes.trim().length > 0) {
        await this.notifyModeratorsOfTeacherNote(session, notes);
    }
    return session;
}
async;
createSession(sessionData, {
    title: string,
    description: string,
    startTime: Date,
    endTime: Date,
    studentId: string,
    teacherId: string
});
{
    return this.prisma.session.create({
        data: sessionData,
        include: {
            student: {
                select: {
                    id: true,
                    name: true,
                    email: true,
                },
            },
            teacher: {
                select: {
                    id: true,
                    name: true,
                    email: true,
                },
            },
        },
    });
}
async;
updateSession(sessionId, string, updateData, (Partial));
{
    return this.prisma.session.update({
        where: { id: sessionId },
        data: updateData,
        include: {
            student: true,
            teacher: true,
        },
    });
}
async;
deleteSession(sessionId, string);
{
    return this.prisma.session.delete({
        where: { id: sessionId },
    });
}
async;
getSessionStats();
{
    const total = await this.prisma.session.count();
    const completed = await this.prisma.session.count({
        where: { status: 'COMPLETED' },
    });
    const confirmed = await this.prisma.session.count({
        where: { teacherConfirmed: true },
    });
    const withNotes = await this.prisma.session.count({
        where: {
            teacherNotes: {
                not: null,
            },
        },
    });
    return {
        total,
        completed,
        confirmed,
        withNotes,
        confirmationRate: total > 0 ? Math.round((confirmed / total) * 100) : 0,
    };
}
async;
notifyModeratorsOfTeacherNote(session, any, notes, string);
{
    const moderators = await this.prisma.user.findMany({
        where: { role: 'MODERATOR' },
        select: { email: true, name: true },
    });
    const notificationSettings = await this.prisma.notificationSettings.findMany({
        where: { enableEmailNotifications: true },
    });
    this.logger.log(`📧 MODERATOR NOTIFICATION: Teacher Note Added - ${session.title}`, 'SessionsService');
    this.logger.debug(`Recipients: ${moderators.map(m => m.email).join(', ')}`, 'SessionsService');
    return {
        notificationSent: true,
        recipientCount: moderators.length,
        message: 'Moderators have been notified of teacher note'
    };
}
//# sourceMappingURL=sessions.service.js.map