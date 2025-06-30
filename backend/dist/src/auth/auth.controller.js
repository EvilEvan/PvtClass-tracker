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
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const auth_service_1 = require("./auth.service");
let AuthController = class AuthController {
    constructor(authService) {
        this.authService = authService;
    }
    async setupAdmin(body) {
        const { email, name, password } = body;
        const existingUser = await this.authService.findUserByEmail(email);
        if (existingUser) {
            return { error: 'User with this email already exists' };
        }
        return this.authService.createAdminUser(email, name, password);
    }
    async createUser(body) {
        const { email, name, password, role } = body;
        const existingUser = await this.authService.findUserByEmail(email);
        if (existingUser) {
            return { error: 'User with this email already exists' };
        }
        return this.authService.createUser(email, name, password, role);
    }
    async login(body) {
        const { email, password } = body;
        const user = await this.authService.validateUser(email, password);
        if (!user) {
            return { error: 'Invalid credentials' };
        }
        return {
            success: true,
            user: {
                id: user.id,
                email: user.email,
                name: user.name,
                role: user.role,
            },
        };
    }
    async masterUnlock(body) {
        const { password, targetUserId } = body;
        const isValidMaster = await this.authService.validateMasterPassword(password);
        if (!isValidMaster) {
            return { error: 'Invalid master password' };
        }
        if (targetUserId) {
            const targetUser = await this.authService.findUserByEmail('');
            return {
                success: true,
                masterAccess: true,
                message: 'Master access granted - can access any profile'
            };
        }
        return {
            success: true,
            masterAccess: true,
            message: 'Master password validated'
        };
    }
    async getAllUsers() {
        return this.authService.getAllUsers();
    }
    async getTeachers() {
        return this.authService.getTeachers();
    }
    async getModerators() {
        return this.authService.getModerators();
    }
    async updateUserRole(id, body) {
        return this.authService.updateUserRole(id, body.role);
    }
    async deleteUser(id) {
        return this.authService.deleteUser(id);
    }
    async checkAdminExists() {
        const users = await this.authService.getAllUsers();
        const adminExists = users.some(user => user.role === 'ADMIN');
        return {
            adminExists,
            totalUsers: users.length,
            users: users.map(u => ({ email: u.email, role: u.role }))
        };
    }
    async addModeratorNotification(body) {
        return this.authService.addModeratorNotification(body.moderatorEmail);
    }
    async getNotificationSettings() {
        return this.authService.getNotificationSettings();
    }
};
exports.AuthController = AuthController;
__decorate([
    (0, common_1.Post)('setup-admin'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "setupAdmin", null);
__decorate([
    (0, common_1.Post)('create-user'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "createUser", null);
__decorate([
    (0, common_1.Post)('login'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "login", null);
__decorate([
    (0, common_1.Post)('master-unlock'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "masterUnlock", null);
__decorate([
    (0, common_1.Get)('users'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "getAllUsers", null);
__decorate([
    (0, common_1.Get)('teachers'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "getTeachers", null);
__decorate([
    (0, common_1.Get)('moderators'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "getModerators", null);
__decorate([
    (0, common_1.Put)('users/:id/role'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "updateUserRole", null);
__decorate([
    (0, common_1.Delete)('users/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "deleteUser", null);
__decorate([
    (0, common_1.Get)('check-admin'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "checkAdminExists", null);
__decorate([
    (0, common_1.Post)('moderator-notifications'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "addModeratorNotification", null);
__decorate([
    (0, common_1.Get)('notification-settings'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "getNotificationSettings", null);
exports.AuthController = AuthController = __decorate([
    (0, common_1.Controller)('auth'),
    __metadata("design:paramtypes", [auth_service_1.AuthService])
], AuthController);
//# sourceMappingURL=auth.controller.js.map