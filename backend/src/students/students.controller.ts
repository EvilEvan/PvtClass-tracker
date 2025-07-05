import { Controller, Get, Post, Body, Patch, Param, Delete, Query, HttpCode, HttpStatus } from '@nestjs/common';
import { StudentsService } from './students.service';
import { ApiResponseDto } from '../common/dto/api-response.dto';
import { IsEmail, IsNotEmpty, IsString, IsOptional, IsArray, IsIn } from 'class-validator';

// DTOs for validation
export class CreateStudentDto {
  @IsNotEmpty()
  @IsString()
  firstName: string;

  @IsNotEmpty()
  @IsString()
  lastName: string;

  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  phone: string;

  @IsNotEmpty()
  @IsString()
  dateOfBirth: string;

  @IsNotEmpty()
  @IsString()
  enrollmentDate: string;

  @IsOptional()
  @IsIn(['active', 'inactive', 'suspended'])
  status: string = 'active';

  @IsArray()
  @IsString({ each: true })
  subjects: string[];

  @IsOptional()
  @IsString()
  notes?: string;

  @IsNotEmpty()
  emergencyContact: {
    name: string;
    phone: string;
    relationship: string;
  };

  @IsNotEmpty()
  address: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
  };
}

export class UpdateStudentDto {
  @IsOptional()
  @IsString()
  firstName?: string;

  @IsOptional()
  @IsString()
  lastName?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsString()
  phone?: string;

  @IsOptional()
  @IsString()
  dateOfBirth?: string;

  @IsOptional()
  @IsString()
  enrollmentDate?: string;

  @IsOptional()
  @IsIn(['active', 'inactive', 'suspended'])
  status?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  subjects?: string[];

  @IsOptional()
  @IsString()
  notes?: string;

  @IsOptional()
  emergencyContact?: {
    name: string;
    phone: string;
    relationship: string;
  };

  @IsOptional()
  address?: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
  };
}

export interface Student {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  enrollmentDate: string;
  status: string;
  subjects: string[];
  notes?: string;
  assignedTeacherId?: string;
  assignedTeacher?: {
    id: string;
    name: string;
    email: string;
  };
  emergencyContact: {
    name: string;
    phone: string;
    relationship: string;
  };
  address: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
  };
}

@Controller('students')
export class StudentsController {
  constructor(private readonly studentsService: StudentsService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createStudentDto: CreateStudentDto) {
    const student = await this.studentsService.create(createStudentDto);
    return ApiResponseDto.success(student, 'Student created successfully');
  }

  @Get()
  async findAll(@Query('status') status?: string) {
    const students = await this.studentsService.findAll(status);
    return ApiResponseDto.success(students, 'Students retrieved successfully');
  }

  @Get('stats')
  async getStats() {
    const stats = await this.studentsService.getStats();
    return ApiResponseDto.success(stats, 'Student statistics retrieved successfully');
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const student = await this.studentsService.findOne(id);
    return ApiResponseDto.success(student, 'Student retrieved successfully');
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateStudentDto: UpdateStudentDto) {
    const student = await this.studentsService.update(id, updateStudentDto);
    return ApiResponseDto.success(student, 'Student updated successfully');
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: string) {
    await this.studentsService.remove(id);
    return ApiResponseDto.success(null, 'Student deleted successfully');
  }

  @Post(':id/assign-teacher')
  async assignTeacher(@Param('id') id: string, @Body('teacherId') teacherId: string) {
    const student = await this.studentsService.assignTeacher(id, teacherId);
    return ApiResponseDto.success(student, 'Teacher assigned successfully');
  }

  @Delete(':id/unassign-teacher')
  async unassignTeacher(@Param('id') id: string) {
    const student = await this.studentsService.unassignTeacher(id);
    return ApiResponseDto.success(student, 'Teacher unassigned successfully');
  }
} 