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
exports.ClassroomsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let ClassroomsService = class ClassroomsService {
    constructor(prisma) {
        this.prisma = prisma;
        this.seedData();
    }
    async seedData() {
        const classroomCount = await this.prisma.classroom.count();
        if (classroomCount === 0) {
            await this.prisma.classroom.createMany({
                data: [
                    {
                        name: 'Command Bridge',
                        capacity: 8,
                        location: 'Level 1 - Main Deck',
                        equipment: JSON.stringify(['Interactive Whiteboard', 'Projector', 'Sound System', 'Video Conferencing']),
                        status: 'available'
                    },
                    {
                        name: 'Jedi Council Chamber',
                        capacity: 12,
                        location: 'Level 2 - East Wing',
                        equipment: JSON.stringify(['Holographic Display', 'Surround Sound', 'Climate Control', 'Recording Equipment']),
                        status: 'available'
                    },
                    {
                        name: 'Rebel Base Conference',
                        capacity: 6,
                        location: 'Level 1 - West Wing',
                        equipment: JSON.stringify(['Smart Board', 'Tablets', 'Wireless Presentation', 'Coffee Station']),
                        status: 'available'
                    },
                    {
                        name: 'Death Star Briefing Room',
                        capacity: 15,
                        location: 'Level 3 - Central',
                        equipment: JSON.stringify(['Large Screen Display', 'Microphone System', 'Document Camera', 'Lighting Controls']),
                        status: 'maintenance'
                    }
                ]
            });
            const classrooms = await this.prisma.classroom.findMany();
            await this.prisma.classroomUsageReport.createMany({
                data: [
                    {
                        classroomId: classrooms[0].id,
                        studentName: 'Luke Skywalker',
                        subject: 'Advanced Mathematics',
                        startTime: '2025-01-07T09:00:00Z',
                        endTime: '2025-01-07T10:30:00Z',
                        status: 'completed',
                        reportedBy: 'Obi-Wan Kenobi',
                        reportedAt: '2025-01-07T08:55:00Z',
                        notes: 'Session completed successfully. Student showed excellent progress.'
                    },
                    {
                        classroomId: classrooms[1].id,
                        studentName: 'Leia Organa',
                        subject: 'Political Science',
                        startTime: '2025-01-07T11:00:00Z',
                        endTime: '2025-01-07T12:30:00Z',
                        status: 'completed',
                        reportedBy: 'Yoda',
                        reportedAt: '2025-01-07T10:58:00Z',
                        notes: 'Excellent discussion on galactic governance structures.'
                    },
                    {
                        classroomId: classrooms[0].id,
                        studentName: 'Han Solo',
                        subject: 'Business Strategy',
                        startTime: '2025-01-07T14:00:00Z',
                        status: 'active',
                        reportedBy: 'Chewbacca',
                        reportedAt: '2025-01-07T13:58:00Z',
                        notes: 'Current session in progress.'
                    }
                ]
            });
        }
    }
    transformClassroom(dbClassroom, activeReport) {
        const classroom = {
            id: dbClassroom.id,
            name: dbClassroom.name,
            capacity: dbClassroom.capacity,
            location: dbClassroom.location,
            equipment: JSON.parse(dbClassroom.equipment),
            status: dbClassroom.status
        };
        if (activeReport) {
            classroom.status = 'in-use';
            classroom.currentSession = {
                sessionId: activeReport.id,
                studentName: activeReport.studentName,
                subject: activeReport.subject,
                startTime: activeReport.startTime,
                endTime: activeReport.endTime || '',
                reportedBy: activeReport.reportedBy
            };
        }
        return classroom;
    }
    transformUsageReport(dbReport) {
        return {
            id: dbReport.id,
            classroomId: dbReport.classroomId,
            classroomName: dbReport.classroom?.name || '',
            sessionId: dbReport.sessionId,
            studentName: dbReport.studentName,
            subject: dbReport.subject,
            startTime: dbReport.startTime,
            endTime: dbReport.endTime,
            status: dbReport.status,
            reportedBy: dbReport.reportedBy,
            reportedAt: dbReport.reportedAt,
            notes: dbReport.notes
        };
    }
    async findAll() {
        const classrooms = await this.prisma.classroom.findMany({
            include: {
                usageReports: {
                    where: { status: 'active' },
                    take: 1
                }
            }
        });
        return classrooms.map(classroom => this.transformClassroom(classroom, classroom.usageReports[0]));
    }
    async findOne(id) {
        const classroom = await this.prisma.classroom.findUnique({
            where: { id },
            include: {
                usageReports: {
                    where: { status: 'active' },
                    take: 1
                }
            }
        });
        if (!classroom) {
            throw new common_1.NotFoundException(`Classroom with ID ${id} not found`);
        }
        return this.transformClassroom(classroom, classroom.usageReports[0]);
    }
    async create(classroomData) {
        const newClassroom = await this.prisma.classroom.create({
            data: {
                name: classroomData.name,
                capacity: classroomData.capacity,
                location: classroomData.location,
                equipment: JSON.stringify(classroomData.equipment),
                status: classroomData.status || 'available'
            }
        });
        return this.transformClassroom(newClassroom);
    }
    async update(id, classroomData) {
        const updateData = {};
        if (classroomData.name)
            updateData.name = classroomData.name;
        if (classroomData.capacity)
            updateData.capacity = classroomData.capacity;
        if (classroomData.location)
            updateData.location = classroomData.location;
        if (classroomData.equipment)
            updateData.equipment = JSON.stringify(classroomData.equipment);
        if (classroomData.status)
            updateData.status = classroomData.status;
        try {
            const updatedClassroom = await this.prisma.classroom.update({
                where: { id },
                data: updateData
            });
            return this.transformClassroom(updatedClassroom);
        }
        catch (error) {
            throw new common_1.NotFoundException(`Classroom with ID ${id} not found`);
        }
    }
    async remove(id) {
        try {
            await this.prisma.classroom.delete({
                where: { id }
            });
        }
        catch (error) {
            throw new common_1.NotFoundException(`Classroom with ID ${id} not found`);
        }
    }
    async reportUsage(usageData) {
        const classroom = await this.findOne(usageData.classroomId);
        const newReport = await this.prisma.classroomUsageReport.create({
            data: {
                classroomId: usageData.classroomId,
                sessionId: usageData.sessionId,
                studentName: usageData.studentName,
                subject: usageData.subject,
                startTime: usageData.startTime,
                endTime: usageData.endTime,
                status: 'active',
                reportedBy: usageData.reportedBy,
                reportedAt: new Date().toISOString(),
                notes: usageData.notes
            },
            include: {
                classroom: true
            }
        });
        return this.transformUsageReport(newReport);
    }
    async endUsage(reportId, endData) {
        try {
            const updatedReport = await this.prisma.classroomUsageReport.update({
                where: { id: reportId },
                data: {
                    endTime: endData.endTime,
                    status: 'completed',
                    notes: endData.notes
                },
                include: {
                    classroom: true
                }
            });
            return this.transformUsageReport(updatedReport);
        }
        catch (error) {
            throw new common_1.NotFoundException(`Usage report with ID ${reportId} not found`);
        }
    }
    async getUsageReports(date, classroomId) {
        const where = {};
        if (date) {
            where.startTime = {
                startsWith: date
            };
        }
        if (classroomId) {
            where.classroomId = classroomId;
        }
        const reports = await this.prisma.classroomUsageReport.findMany({
            where,
            include: {
                classroom: true
            },
            orderBy: {
                reportedAt: 'desc'
            }
        });
        return reports.map(this.transformUsageReport);
    }
    async getStats() {
        const classrooms = await this.prisma.classroom.findMany();
        const usageReports = await this.prisma.classroomUsageReport.findMany({
            include: {
                classroom: true
            }
        });
        const totalClassrooms = classrooms.length;
        const availableClassrooms = classrooms.filter(c => c.status === 'available').length;
        const inUseClassrooms = usageReports.filter(r => r.status === 'active').length;
        const maintenanceClassrooms = classrooms.filter(c => c.status === 'maintenance').length;
        const today = new Date().toISOString().split('T')[0];
        const todaysReports = usageReports.filter(r => r.startTime.startsWith(today));
        const completedToday = todaysReports.filter(r => r.status === 'completed').length;
        const activeToday = todaysReports.filter(r => r.status === 'active').length;
        const utilizationByClassroom = {};
        classrooms.forEach(classroom => {
            const reports = usageReports.filter(r => r.classroomId === classroom.id);
            utilizationByClassroom[classroom.name] = reports.length;
        });
        return {
            totalClassrooms,
            availableClassrooms,
            inUseClassrooms,
            maintenanceClassrooms,
            todaysUsage: {
                completed: completedToday,
                active: activeToday,
                total: todaysReports.length
            },
            utilizationByClassroom,
            recentReports: usageReports
                .sort((a, b) => new Date(b.reportedAt).getTime() - new Date(a.reportedAt).getTime())
                .slice(0, 10)
                .map(this.transformUsageReport)
        };
    }
};
exports.ClassroomsService = ClassroomsService;
exports.ClassroomsService = ClassroomsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ClassroomsService);
//# sourceMappingURL=classrooms.service.js.map