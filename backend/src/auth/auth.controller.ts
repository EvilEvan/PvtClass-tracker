import { Controller, Post, Get, Body, Param, Put, Delete } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('setup-admin')
  async setupAdmin(@Body() body: { email: string; name: string; password: string }) {
    const { email, name, password } = body;
    
    // Check if admin already exists
    const existingUser = await this.authService.findUserByEmail(email);
    if (existingUser) {
      return { error: 'User with this email already exists' };
    }

    return this.authService.createAdminUser(email, name, password);
  }

  @Post('create-user')
  async createUser(@Body() body: { 
    email: string; 
    name: string; 
    password: string; 
    role: 'TEACHER' | 'MODERATOR' | 'ADMIN' 
  }) {
    const { email, name, password, role } = body;
    
    // Check if user already exists
    const existingUser = await this.authService.findUserByEmail(email);
    if (existingUser) {
      return { error: 'User with this email already exists' };
    }

    return this.authService.createUser(email, name, password, role);
  }

  @Post('login')
  async login(@Body() body: { email: string; password: string }) {
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

  @Post('master-unlock')
  async masterUnlock(@Body() body: { password: string; targetUserId?: string }) {
    const { password, targetUserId } = body;
    
    const isValidMaster = await this.authService.validateMasterPassword(password);
    if (!isValidMaster) {
      return { error: 'Invalid master password' };
    }

    if (targetUserId) {
      // Return specific user data for hijacking
      const targetUser = await this.authService.findUserByEmail(''); // We'll need to find by ID
      // For now, return success with master access
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

  @Get('users')
  async getAllUsers() {
    return this.authService.getAllUsers();
  }

  @Get('teachers')
  async getTeachers() {
    return this.authService.getTeachers();
  }

  @Get('moderators')
  async getModerators() {
    return this.authService.getModerators();
  }

  @Put('users/:id/role')
  async updateUserRole(@Param('id') id: string, @Body() body: { role: string }) {
    return this.authService.updateUserRole(id, body.role);
  }

  @Delete('users/:id')
  async deleteUser(@Param('id') id: string) {
    return this.authService.deleteUser(id);
  }

  @Get('check-admin')
  async checkAdminExists() {
    const users = await this.authService.getAllUsers();
    const adminExists = users.some(user => user.role === 'ADMIN');
    
    return { 
      adminExists,
      totalUsers: users.length,
      users: users.map(u => ({ email: u.email, role: u.role }))
    };
  }

  @Post('moderator-notifications')
  async addModeratorNotification(@Body() body: { moderatorEmail: string }) {
    return this.authService.addModeratorNotification(body.moderatorEmail);
  }

  @Get('notification-settings')
  async getNotificationSettings() {
    return this.authService.getNotificationSettings();
  }
} 