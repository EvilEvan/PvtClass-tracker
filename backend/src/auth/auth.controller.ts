import {
  Controller,
  Post,
  UseGuards,
  Request,
  Get,
  Body,
  HttpException,
  HttpStatus,
  Delete,
  Param,
  Patch,
  Put,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';
import { JwtAuthGuard } from './jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    // Extract client information for enhanced security
    const clientInfo = {
      ip: req.ip || req.connection.remoteAddress,
      userAgent: req.headers['user-agent']
    };
    
    return this.authService.login(req.user, clientInfo);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }

  @Get('check-admin')
  async checkAdmin() {
    try {
      const users = await this.authService.getAllUsers();
      const hasAdmin = users.some(user => user.role === 'ADMIN');
      return { hasAdmin };
    } catch (error) {
      throw new HttpException(
        'Failed to check admin status',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Post('create-user')
  async createUser(@Body() createUserDto: any) {
    try {
      const { email, firstName, lastName, password, role } = createUserDto;
      
      if (!email || !firstName || !lastName || !password || !role) {
        throw new HttpException(
          'Missing required fields',
          HttpStatus.BAD_REQUEST,
        );
      }

      if (role === 'ADMIN') {
        return this.authService.createAdminUser(email, firstName, lastName, password);
      } else {
        return this.authService.createUser(email, firstName, lastName, password, role);
      }
    } catch (error) {
      throw new HttpException(
        error.message || 'Failed to create user',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Post('master-unlock')
  async masterUnlock(@Body() body: { password: string }) {
    try {
      const isValid = await this.authService.validateMasterPassword(body.password);
      return { valid: isValid };
    } catch (error) {
      throw new HttpException(
        'Failed to validate master password',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get('users')
  async getAllUsers() {
    try {
      return await this.authService.getAllUsers();
    } catch (error) {
      throw new HttpException(
        'Failed to fetch users',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @UseGuards(JwtAuthGuard)
  @Delete('users/:id')
  async deleteUser(@Param('id') id: string) {
    try {
      await this.authService.deleteUser(id);
      return { message: 'User deleted successfully' };
    } catch (error) {
      throw new HttpException(
        'Failed to delete user',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @UseGuards(JwtAuthGuard)
  @Patch('users/:id')
  async updateUser(@Param('id') id: string, @Body() updateData: any) {
    try {
      const updatedUser = await this.authService.updateUserRole(id, updateData.role);
      return updatedUser;
    } catch (error) {
      throw new HttpException(
        'Failed to update user',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get('moderators')
  async getModerators() {
    try {
      return await this.authService.getModerators();
    } catch (error) {
      throw new HttpException(
        'Failed to fetch moderators',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get('teachers')
  async getTeachers() {
    try {
      return await this.authService.getTeachers();
    } catch (error) {
      throw new HttpException(
        'Failed to fetch teachers',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @UseGuards(JwtAuthGuard)
  @Put('users/:id/password')
  async changePassword(@Param('id') userId: string, @Body() body: { currentPassword: string; newPassword: string }) {
    try {
      const { currentPassword, newPassword } = body;
      
      if (!currentPassword || !newPassword) {
        throw new HttpException(
          'Current password and new password are required',
          HttpStatus.BAD_REQUEST,
        );
      }

      const updatedUser = await this.authService.changePassword(userId, currentPassword, newPassword);
      return { 
        message: 'Password changed successfully',
        user: updatedUser
      };
    } catch (error) {
      throw new HttpException(
        error.message || 'Failed to change password',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  // Admin Setup Wizard - Check if system is initialized
  @Get('system-status')
  async getSystemStatus() {
    try {
      const status = await this.authService.getSystemStatus();
      return status;
    } catch (error) {
      throw new HttpException(
        'Failed to check system status',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // Admin Setup Wizard - Initialize system with master password
  @Post('initialize-system')
  async initializeSystem(@Body() body: { masterPassword: string; adminEmail: string; adminFirstName: string; adminLastName: string; adminPassword: string }) {
    try {
      const { masterPassword, adminEmail, adminFirstName, adminLastName, adminPassword } = body;
      
      if (!masterPassword || !adminEmail || !adminFirstName || !adminLastName || !adminPassword) {
        throw new HttpException(
          'All fields are required for system initialization',
          HttpStatus.BAD_REQUEST,
        );
      }

      const result = await this.authService.initializeSystem(masterPassword, adminEmail, adminFirstName, adminLastName, adminPassword);
      return result;
    } catch (error) {
      throw new HttpException(
        error.message || 'Failed to initialize system',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  // Role-based user creation - only for admin and moderators
  @UseGuards(JwtAuthGuard)
  @Post('create-user-by-role')
  async createUserByRole(@Request() req, @Body() createUserDto: any) {
    try {
      const { email, firstName, lastName, role, requestorPassword } = createUserDto;
      
      if (!email || !firstName || !lastName || !role || !requestorPassword) {
        throw new HttpException(
          'All fields including requestor password are required',
          HttpStatus.BAD_REQUEST,
        );
      }

      // Check if user has permission to create users
      const result = await this.authService.createUserByRole(
        req.user.id,
        req.user.role,
        email,
        firstName,
        lastName,
        role,
        requestorPassword
      );
      
      return result;
    } catch (error) {
      throw new HttpException(
        error.message || 'Failed to create user',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  // Request password creation - for new users
  @Post('request-password-creation')
  async requestPasswordCreation(@Body() body: { email: string; firstName: string; lastName: string; role: string; reason: string }) {
    try {
      const { email, firstName, lastName, role, reason } = body;
      
      if (!email || !firstName || !lastName || !role || !reason) {
        throw new HttpException(
          'All fields are required for password creation request',
          HttpStatus.BAD_REQUEST,
        );
      }

      const result = await this.authService.requestPasswordCreation(email, firstName, lastName, role, reason);
      return result;
    } catch (error) {
      throw new HttpException(
        error.message || 'Failed to request password creation',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  // Get pending password requests - admin only
  @UseGuards(JwtAuthGuard)
  @Get('pending-password-requests')
  async getPendingPasswordRequests(@Request() req) {
    try {
      if (req.user.role !== 'ADMIN') {
        throw new HttpException(
          'Only administrators can view pending password requests',
          HttpStatus.FORBIDDEN,
        );
      }

      const requests = await this.authService.getPendingPasswordRequests();
      return requests;
    } catch (error) {
      throw new HttpException(
        error.message || 'Failed to fetch pending password requests',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // Approve password request - admin only
  @UseGuards(JwtAuthGuard)
  @Post('approve-password-request/:id')
  async approvePasswordRequest(@Request() req, @Param('id') requestId: string, @Body() body: { password: string; masterPassword: string }) {
    try {
      if (req.user.role !== 'ADMIN') {
        throw new HttpException(
          'Only administrators can approve password requests',
          HttpStatus.FORBIDDEN,
        );
      }

      const { password, masterPassword } = body;
      
      if (!password || !masterPassword) {
        throw new HttpException(
          'Password and master password are required',
          HttpStatus.BAD_REQUEST,
        );
      }

      const result = await this.authService.approvePasswordRequest(requestId, password, masterPassword);
      return result;
    } catch (error) {
      throw new HttpException(
        error.message || 'Failed to approve password request',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
