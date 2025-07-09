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

  async createAdminUser(email: string, firstName: string, lastName: string, password: string) {
    // Hash the password for security
    const hashedPassword = await bcrypt.hash(password, 10);
    
    let school = await this.prisma.school.findFirst();
    if (!school) {
      school = await this.prisma.school.create({
        data: {
          name: 'Default School',
        },
      });
    }

    const adminUser = await this.prisma.user.create({
      data: {
        email,
        firstName,
        lastName,
        role: 'ADMIN',
        password: hashedPassword,
        schoolId: school.id,
      },
    });

    return {
      id: adminUser.id,
      email: adminUser.email,
      firstName: adminUser.firstName,
      lastName: adminUser.lastName,
      role: adminUser.role,
      message: `Admin user created successfully`,
    };
  }

  async createUser(email: string, firstName: string, lastName: string, password: string, role: 'TEACHER' | 'MODERATOR' | 'ADMIN', schoolId: string) {
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    
    const user = await this.prisma.user.create({
      data: {
        email,
        firstName,
        lastName,
        role,
        password: hashedPassword,
        schoolId,
      },
    });

    return {
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
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
        firstName: true,
        lastName: true,
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
        firstName: true,
        lastName: true,
      },
    });
  }

  async getTeachers() {
    return this.prisma.user.findMany({
      where: { role: 'TEACHER' },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
      },
    });
  }
} 