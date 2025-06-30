import { Controller, Get, Post, Put, Delete, Body, Param, Query } from '@nestjs/common';
import { ClassroomsService } from './classrooms.service';

export interface Classroom {
  id: string;
  name: string;
  capacity: number;
  location: string;
  equipment: string[];
  status: 'available' | 'in-use' | 'maintenance';
  currentSession?: {
    sessionId: string;
    studentName: string;
    subject: string;
    startTime: string;
    endTime: string;
    reportedBy: string;
  };
}

export interface ClassroomUsageReport {
  id: string;
  classroomId: string;
  classroomName: string;
  sessionId?: string;
  studentName: string;
  subject: string;
  startTime: string;
  endTime?: string;
  status: 'active' | 'completed' | 'cancelled';
  reportedBy: string;
  reportedAt: string;
  notes?: string;
}

@Controller('classrooms')
export class ClassroomsController {
  constructor(private readonly classroomsService: ClassroomsService) {}

  @Get()
  async getAllClassrooms() {
    return this.classroomsService.findAll();
  }

  @Get('usage-reports')
  async getUsageReports(@Query('date') date?: string, @Query('classroom') classroomId?: string) {
    return this.classroomsService.getUsageReports(date, classroomId);
  }

  @Get(':id')
  async getClassroom(@Param('id') id: string) {
    return this.classroomsService.findOne(id);
  }

  @Post()
  async createClassroom(@Body() classroomData: Omit<Classroom, 'id' | 'currentSession'>) {
    return this.classroomsService.create(classroomData);
  }

  @Post('report-usage')
  async reportClassroomUsage(@Body() usageData: Omit<ClassroomUsageReport, 'id' | 'reportedAt'>) {
    return this.classroomsService.reportUsage(usageData);
  }

  @Put('usage-reports/:id/end')
  async endClassroomUsage(@Param('id') reportId: string, @Body() endData: { endTime: string; notes?: string }) {
    return this.classroomsService.endUsage(reportId, endData);
  }

  @Put(':id')
  async updateClassroom(@Param('id') id: string, @Body() classroomData: Partial<Classroom>) {
    return this.classroomsService.update(id, classroomData);
  }

  @Delete(':id')
  async deleteClassroom(@Param('id') id: string) {
    return this.classroomsService.remove(id);
  }

  @Get('stats/overview')
  async getClassroomStats() {
    return this.classroomsService.getStats();
  }
} 