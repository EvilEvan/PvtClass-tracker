import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class SessionsService {
  constructor(private prisma: PrismaService) {}

  async getAllSessions() {
    return this.prisma.session.findMany({
      include: {
        student: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        teacher: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });
  }

  async getSessionsByTeacher(teacherId: string) {
    return this.prisma.session.findMany({
      where: { teacherId },
      include: {
        student: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
      orderBy: {
        startTime: 'desc',
      },
    });
  }

  async confirmSession(sessionId: string, teacherId: string, notes?: string) {
    // Update session with teacher confirmation
    const session = await this.prisma.session.update({
      where: { id: sessionId },
      data: {
        teacherConfirmed: true,
        teacherNotes: notes,
        status: 'COMPLETED',
      },
      include: {
        student: true,
        teacher: true,
      },
    });

    // If teacher left notes, notify moderators
    if (notes && notes.trim().length > 0) {
      await this.notifyModeratorsOfTeacherNote(session, notes);
    }

    return session;
  }

  async createSession(sessionData: {
    title: string;
    description?: string;
    startTime: Date;
    endTime: Date;
    studentId: string;
    teacherId: string;
  }) {
    return this.prisma.session.create({
      data: sessionData,
      include: {
        student: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        teacher: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });
  }

  async updateSession(sessionId: string, updateData: Partial<{
    title: string;
    description: string;
    startTime: Date;
    endTime: Date;
    status: string;
  }>) {
    return this.prisma.session.update({
      where: { id: sessionId },
      data: updateData,
      include: {
        student: true,
        teacher: true,
      },
    });
  }

  async deleteSession(sessionId: string) {
    return this.prisma.session.delete({
      where: { id: sessionId },
    });
  }

  async getSessionStats() {
    const total = await this.prisma.session.count();
    const completed = await this.prisma.session.count({
      where: { status: 'COMPLETED' },
    });
    const confirmed = await this.prisma.session.count({
      where: { teacherConfirmed: true },
    });
    const withNotes = await this.prisma.session.count({
      where: { 
        teacherNotes: {
          not: null,
        },
      },
    });

    return {
      total,
      completed,
      confirmed,
      withNotes,
      confirmationRate: total > 0 ? Math.round((confirmed / total) * 100) : 0,
    };
  }

  private async notifyModeratorsOfTeacherNote(session: any, notes: string) {
    // Get all moderators
    const moderators = await this.prisma.user.findMany({
      where: { role: 'MODERATOR' },
      select: { email: true, name: true },
    });

    // Get notification settings
    const notificationSettings = await this.prisma.notificationSettings.findMany({
      where: { enableEmailNotifications: true },
    });

    // In a real implementation, you would send emails here
    // For now, we'll just log the notification
    console.log('📧 MODERATOR NOTIFICATION:', {
      subject: `Teacher Note Added - ${session.title}`,
      recipients: moderators.map(m => m.email),
      message: `
        Teacher: ${session.teacher.name}
        Student: ${session.student.name}
        Session: ${session.title}
        Date: ${session.startTime}
        Notes: ${notes}
      `,
    });

    // Store notification in database for tracking
    // You could add a Notification model to track these
    return { 
      notificationSent: true, 
      recipientCount: moderators.length,
      message: 'Moderators have been notified of teacher note'
    };
  }
} 