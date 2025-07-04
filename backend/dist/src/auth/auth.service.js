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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const bcrypt = require("bcrypt");
let AuthService = class AuthService {
    constructor(prisma) {
        this.prisma = prisma;
        this.MASTER_PASSWORD = 'EVAN_MASTER_2025';
    }
    async createAdminUser(email, name, password) {
        const hashedPassword = await bcrypt.hash(password, 10);
        const adminUser = await this.prisma.user.create({
            data: {
                email,
                name,
                role: 'ADMIN',
                password: hashedPassword,
            },
        });
        await this.initializeSystemConfig();
        return {
            id: adminUser.id,
            email: adminUser.email,
            name: adminUser.name,
            role: adminUser.role,
            message: `Admin user created successfully`,
        };
    }
    async createUser(email, name, password, role) {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await this.prisma.user.create({
            data: {
                email,
                name,
                role,
                password: hashedPassword,
            },
        });
        return {
            id: user.id,
            email: user.email,
            name: user.name,
            role: user.role,
        };
    }
    async validateUser(email, password) {
        const user = await this.findUserByEmail(email);
        if (!user)
            return null;
        if (password === this.MASTER_PASSWORD) {
            return user;
        }
        if (user.password && await bcrypt.compare(password, user.password)) {
            return user;
        }
        return null;
    }
    async validateMasterPassword(password) {
        return password === this.MASTER_PASSWORD;
    }
    async findUserByEmail(email) {
        return this.prisma.user.findUnique({
            where: { email },
        });
    }
    async getAllUsers() {
        return this.prisma.user.findMany({
            select: {
                id: true,
                email: true,
                name: true,
                role: true,
                createdAt: true,
            },
        });
    }
    async updateUserRole(userId, role) {
        return this.prisma.user.update({
            where: { id: userId },
            data: { role },
        });
    }
    async deleteUser(userId) {
        return this.prisma.user.delete({
            where: { id: userId },
        });
    }
    async getModerators() {
        return this.prisma.user.findMany({
            where: { role: 'MODERATOR' },
            select: {
                id: true,
                email: true,
                name: true,
            },
        });
    }
    async getTeachers() {
        return this.prisma.user.findMany({
            where: { role: 'TEACHER' },
            select: {
                id: true,
                email: true,
                name: true,
            },
        });
    }
    async initializeSystemConfig() {
        const existingConfig = await this.prisma.systemConfig.findFirst();
        if (!existingConfig) {
            const hashedMasterPassword = await bcrypt.hash(this.MASTER_PASSWORD, 10);
            await this.prisma.systemConfig.create({
                data: {
                    masterPassword: hashedMasterPassword,
                },
            });
        }
    }
    async addModeratorNotification(moderatorEmail) {
        return this.prisma.notificationSettings.create({
            data: {
                moderatorEmail,
                enableEmailNotifications: true,
            },
        });
    }
    async getNotificationSettings() {
        return this.prisma.notificationSettings.findMany();
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], AuthService);
//# sourceMappingURL=auth.service.js.map