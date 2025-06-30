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
exports.ClassroomsController = void 0;
const common_1 = require("@nestjs/common");
const classrooms_service_1 = require("./classrooms.service");
let ClassroomsController = class ClassroomsController {
    constructor(classroomsService) {
        this.classroomsService = classroomsService;
    }
    async getAllClassrooms() {
        return this.classroomsService.findAll();
    }
    async getUsageReports(date, classroomId) {
        return this.classroomsService.getUsageReports(date, classroomId);
    }
    async getClassroom(id) {
        return this.classroomsService.findOne(id);
    }
    async createClassroom(classroomData) {
        return this.classroomsService.create(classroomData);
    }
    async reportClassroomUsage(usageData) {
        return this.classroomsService.reportUsage(usageData);
    }
    async endClassroomUsage(reportId, endData) {
        return this.classroomsService.endUsage(reportId, endData);
    }
    async updateClassroom(id, classroomData) {
        return this.classroomsService.update(id, classroomData);
    }
    async deleteClassroom(id) {
        return this.classroomsService.remove(id);
    }
    async getClassroomStats() {
        return this.classroomsService.getStats();
    }
};
exports.ClassroomsController = ClassroomsController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ClassroomsController.prototype, "getAllClassrooms", null);
__decorate([
    (0, common_1.Get)('usage-reports'),
    __param(0, (0, common_1.Query)('date')),
    __param(1, (0, common_1.Query)('classroom')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], ClassroomsController.prototype, "getUsageReports", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ClassroomsController.prototype, "getClassroom", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ClassroomsController.prototype, "createClassroom", null);
__decorate([
    (0, common_1.Post)('report-usage'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ClassroomsController.prototype, "reportClassroomUsage", null);
__decorate([
    (0, common_1.Put)('usage-reports/:id/end'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], ClassroomsController.prototype, "endClassroomUsage", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], ClassroomsController.prototype, "updateClassroom", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ClassroomsController.prototype, "deleteClassroom", null);
__decorate([
    (0, common_1.Get)('stats/overview'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ClassroomsController.prototype, "getClassroomStats", null);
exports.ClassroomsController = ClassroomsController = __decorate([
    (0, common_1.Controller)('classrooms'),
    __metadata("design:paramtypes", [classrooms_service_1.ClassroomsService])
], ClassroomsController);
//# sourceMappingURL=classrooms.controller.js.map