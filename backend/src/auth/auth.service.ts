import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

  // Master password for admin override access (configurable via environment)
  // NOTE: Set MASTER_PASSWORD environment variable for security
  private readonly MASTER_PASSWORD = process.env.MASTER_PASSWORD || (() => {
    console.warn('WARNING: MASTER_PASSWORD environment variable not set. Using default value.');
    console.warn('For production, set MASTER_PASSWORD environment variable to a secure value.');
    return 'CHANGE_ME_IN_PRODUCTION';
  })();

  async createAdminUser(email: string, name: string, password: string) {
    // Hash the password for security
    const hashedPassword = await bcrypt.hash(password, 10);
    
    const adminUser = await this.prisma.user.create({
      data: {
        email,
        name,
        role: 'ADMIN',
        password: hashedPassword,
      },
    });

    // Initialize system config with master password if not exists
    await this.initializeSystemConfig();

    return {
      id: adminUser.id,
      email: adminUser.email,
      name: adminUser.name,
      role: adminUser.role,
      message: `Admin user created successfully`,
    };
  }

  async createUser(email: string, name: string, password: string, role: 'TEACHER' | 'MODERATOR' | 'ADMIN') {
    // Hash the password
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

  async validateUser(email: string, password: string) {
    const user = await this.findUserByEmail(email);
    if (!user) return null;

    // Check if it's the master password (EVAN's override)
    if (password === this.MASTER_PASSWORD) {
      return user;
    }

    // Check regular password
    if (user.password && await bcrypt.compare(password, user.password)) {
      return user;
    }

    return null;
  }

  async validateMasterPassword(password: string): Promise<boolean> {
    return password === this.MASTER_PASSWORD;
  }

  async findUserByEmail(email: string) {
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

  async updateUserRole(userId: string, role: string) {
    return this.prisma.user.update({
      where: { id: userId },
      data: { role },
    });
  }

  async deleteUser(userId: string) {
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

  private async initializeSystemConfig() {
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

  async addModeratorNotification(moderatorEmail: string) {
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
} 