import { Controller, Get, Post, Put, Delete, Body, Param, Query } from '@nestjs/common';
import { SessionsService } from './sessions.service';

@Controller('sessions')
export class SessionsController {
  constructor(private readonly sessionsService: SessionsService) {}

  @Get()
  async getAllSessions() {
    return this.sessionsService.getAllSessions();
  }

  @Get('teacher/:teacherId')
  async getSessionsByTeacher(@Param('teacherId') teacherId: string) {
    return this.sessionsService.getSessionsByTeacher(teacherId);
  }

  @Post()
  async createSession(@Body() sessionData: {
    title: string;
    description?: string;
    startTime: string;
    endTime: string;
    studentId: string;
    teacherId: string;
  }) {
    return this.sessionsService.createSession({
      ...sessionData,
      startTime: new Date(sessionData.startTime),
      endTime: new Date(sessionData.endTime),
    });
  }

  @Put(':id')
  async updateSession(@Param('id') id: string, @Body() updateData: {
    title?: string;
    description?: string;
    startTime?: string;
    endTime?: string;
    status?: string;
  }) {
    const processedData: any = { ...updateData };
    if (updateData.startTime) {
      processedData.startTime = new Date(updateData.startTime);
    }
    if (updateData.endTime) {
      processedData.endTime = new Date(updateData.endTime);
    }

    return this.sessionsService.updateSession(id, processedData);
  }

  @Delete(':id')
  async deleteSession(@Param('id') id: string) {
    return this.sessionsService.deleteSession(id);
  }

  // Teacher Interface - Simple checkbox confirmation
  @Post(':id/confirm')
  async confirmSession(@Param('id') sessionId: string, @Body() body: {
    teacherId: string;
    notes?: string;
  }) {
    const { teacherId, notes } = body;
    return this.sessionsService.confirmSession(sessionId, teacherId, notes);
  }

  @Get('stats')
  async getSessionStats() {
    return this.sessionsService.getSessionStats();
  }

  // Get sessions pending teacher confirmation
  @Get('pending-confirmation')
  async getPendingConfirmations(@Query('teacherId') teacherId?: string) {
    const sessions = await this.sessionsService.getAllSessions();
    
    let pendingSessions = sessions.filter(session => 
      !session.teacherConfirmed && 
      session.status === 'SCHEDULED'
    );

    if (teacherId) {
      pendingSessions = pendingSessions.filter(session => 
        session.teacherId === teacherId
      );
    }

    return pendingSessions;
  }

  // Get sessions with teacher notes (for moderator review)
  @Get('with-notes')
  async getSessionsWithNotes() {
    const sessions = await this.sessionsService.getAllSessions();
    return sessions.filter(session => 
      session.teacherNotes && session.teacherNotes.trim().length > 0
    );
  }
} 