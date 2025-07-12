import { Injectable, NotFoundException, HttpException, HttpStatus } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  // Master password for admin override access (configurable via environment)
  // NOTE: Set MASTER_PASSWORD environment variable for security
  private readonly MASTER_PASSWORD =
    process.env.MASTER_PASSWORD ||
    (() => {
      console.warn(
        'WARNING: MASTER_PASSWORD environment variable not set. Using default value.',
      );
      console.warn(
        'For production, set MASTER_PASSWORD environment variable to a secure value.',
      );
      return 'CHANGE_ME_IN_PRODUCTION';
    })();

  async createAdminUser(
    email: string,
    firstName: string,
    lastName: string,
    password: string,
  ) {
    // Hash the password for security
    const hashedPassword = await bcrypt.hash(password, 10);

    const adminUser = await this.prisma.user.create({
      data: {
        email,
        firstName,
        lastName,
        role: 'ADMIN',
        password: hashedPassword,
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

  async createUser(
    email: string,
    firstName: string,
    lastName: string,
    password: string,
    role: 'TEACHER' | 'MODERATOR' | 'ADMIN',
  ) {
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await this.prisma.user.create({
      data: {
        email,
        firstName,
        lastName,
        role,
        password: hashedPassword,
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
    if (user.password && (await bcrypt.compare(password, user.password))) {
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

  async login(user: any) {
    const payload = { email: user.email, sub: user.id, role: user.role };
    return {
      access_token: this.jwtService.sign(payload),
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
        passwordChanged: user.passwordChanged,
      },
    };
  }

  async createToken(user: any) {
    const payload = { email: user.email, sub: user.id, role: user.role };
    return this.jwtService.sign(payload);
  }

  async changePassword(userId: string, currentPassword: string, newPassword: string) {
    // Find the user
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    // Check if current password is correct (skip if using master password)
    if (currentPassword !== this.MASTER_PASSWORD) {
      if (!user.password || !(await bcrypt.compare(currentPassword, user.password))) {
        throw new HttpException('Current password is incorrect', HttpStatus.UNAUTHORIZED);
      }
    }

    // Hash new password
    const hashedNewPassword = await bcrypt.hash(newPassword, 10);

    // Update user with new password and set passwordChanged to true
    return this.prisma.user.update({
      where: { id: userId },
      data: {
        password: hashedNewPassword,
        passwordChanged: true,
      },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        role: true,
        passwordChanged: true,
      },
    });
  }
}
