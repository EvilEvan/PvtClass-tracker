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
    return this.authService.login(req.user);
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
}
