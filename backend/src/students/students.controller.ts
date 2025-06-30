import { Controller, Get, Post, Put, Delete, Body, Param, Query } from '@nestjs/common';
import { StudentsService } from './students.service';

export interface Student {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  enrollmentDate: string;
  status: 'active' | 'inactive' | 'suspended';
  subjects: string[];
  notes: string;
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

  @Get()
  async getAllStudents(@Query('status') status?: string) {
    return this.studentsService.findAll(status);
  }

  @Get(':id')
  async getStudent(@Param('id') id: string) {
    return this.studentsService.findOne(id);
  }

  @Post()
  async createStudent(@Body() studentData: Omit<Student, 'id'>) {
    return this.studentsService.create(studentData);
  }

  @Put(':id')
  async updateStudent(@Param('id') id: string, @Body() studentData: Partial<Student>) {
    return this.studentsService.update(id, studentData);
  }

  @Delete(':id')
  async deleteStudent(@Param('id') id: string) {
    return this.studentsService.remove(id);
  }

  @Get('stats/overview')
  async getStudentStats() {
    return this.studentsService.getStats();
  }

  // Moderator-specific endpoints
  @Post(':id/assign-teacher')
  async assignTeacher(@Param('id') studentId: string, @Body() body: { teacherId: string }) {
    return this.studentsService.assignTeacher(studentId, body.teacherId);
  }

  @Delete(':id/unassign-teacher')
  async unassignTeacher(@Param('id') studentId: string) {
    return this.studentsService.unassignTeacher(studentId);
  }

  @Get('by-teacher/:teacherId')
  async getStudentsByTeacher(@Param('teacherId') teacherId: string) {
    return this.studentsService.findByTeacher(teacherId);
  }

  @Get('unassigned/list')
  async getUnassignedStudents() {
    return this.studentsService.findUnassigned();
  }
} 