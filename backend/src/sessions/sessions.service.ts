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
            firstName: true,
            lastName: true,
            email: true,
          },
        },
        teacher: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
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
            firstName: true,
            lastName: true,
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
    const { title, description, startTime, endTime, studentId, teacherId } =
      sessionData;
    return this.prisma.session.create({
      data: {
        title,
        description,
        startTime,
        endTime,
        student: {
          connect: { id: studentId },
        },
        teacher: {
          connect: { id: teacherId },
        },
      },
      include: {
        student: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
          },
        },
        teacher: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
          },
        },
      },
    });
  }

  async updateSession(
    sessionId: string,
    updateData: Partial<{
      title: string;
      description: string;
      startTime: Date;
      endTime: Date;
      status: string;
    }>,
  ) {
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
}
