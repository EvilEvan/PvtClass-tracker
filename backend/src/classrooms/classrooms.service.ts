import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Classroom, ClassroomUsageReport } from './classrooms.controller';

@Injectable()
export class ClassroomsService {
  constructor(private prisma: PrismaService) {
    this.seedData();
  }

  private async seedData() {
    // Check if data exists, if not, seed with sample data
    const classroomCount = await this.prisma.classroom.count();
    if (classroomCount === 0) {
      await this.prisma.classroom.createMany({
        data: [
          {
            name: 'Command Bridge',
            capacity: 8,
            location: 'Level 1 - Main Deck',
            equipment: JSON.stringify(['Interactive Whiteboard', 'Projector', 'Sound System', 'Video Conferencing']),
            status: 'available'
          },
          {
            name: 'Jedi Council Chamber',
            capacity: 12,
            location: 'Level 2 - East Wing',
            equipment: JSON.stringify(['Holographic Display', 'Surround Sound', 'Climate Control', 'Recording Equipment']),
            status: 'available'
          },
          {
            name: 'Rebel Base Conference',
            capacity: 6,
            location: 'Level 1 - West Wing',
            equipment: JSON.stringify(['Smart Board', 'Tablets', 'Wireless Presentation', 'Coffee Station']),
            status: 'available'
          },
          {
            name: 'Death Star Briefing Room',
            capacity: 15,
            location: 'Level 3 - Central',
            equipment: JSON.stringify(['Large Screen Display', 'Microphone System', 'Document Camera', 'Lighting Controls']),
            status: 'maintenance'
          }
        ]
      });

      // Seed usage reports
      const classrooms = await this.prisma.classroom.findMany();
      await this.prisma.classroomUsageReport.createMany({
        data: [
          {
            classroomId: classrooms[0].id,
            studentName: 'Luke Skywalker',
            subject: 'Advanced Mathematics',
            startTime: '2025-01-07T09:00:00Z',
            endTime: '2025-01-07T10:30:00Z',
            status: 'completed',
            reportedBy: 'Obi-Wan Kenobi',
            reportedAt: '2025-01-07T08:55:00Z',
            notes: 'Session completed successfully. Student showed excellent progress.'
          },
          {
            classroomId: classrooms[1].id,
            studentName: 'Leia Organa',
            subject: 'Political Science',
            startTime: '2025-01-07T11:00:00Z',
            endTime: '2025-01-07T12:30:00Z',
            status: 'completed',
            reportedBy: 'Yoda',
            reportedAt: '2025-01-07T10:58:00Z',
            notes: 'Excellent discussion on galactic governance structures.'
          },
          {
            classroomId: classrooms[0].id,
            studentName: 'Han Solo',
            subject: 'Business Strategy',
            startTime: '2025-01-07T14:00:00Z',
            status: 'active',
            reportedBy: 'Chewbacca',
            reportedAt: '2025-01-07T13:58:00Z',
            notes: 'Current session in progress.'
          }
        ]
      });
    }
  }

  private transformClassroom(dbClassroom: any, activeReport?: any): Classroom {
    const classroom: Classroom = {
      id: dbClassroom.id,
      name: dbClassroom.name,
      capacity: dbClassroom.capacity,
      location: dbClassroom.location,
      equipment: JSON.parse(dbClassroom.equipment),
      status: dbClassroom.status
    };

    if (activeReport) {
      classroom.status = 'in-use';
      classroom.currentSession = {
        sessionId: activeReport.id,
        studentName: activeReport.studentName,
        subject: activeReport.subject,
        startTime: activeReport.startTime,
        endTime: activeReport.endTime || '',
        reportedBy: activeReport.reportedBy
      };
    }

    return classroom;
  }

  private transformUsageReport(dbReport: any): ClassroomUsageReport {
    return {
      id: dbReport.id,
      classroomId: dbReport.classroomId,
      classroomName: dbReport.classroom?.name || '',
      sessionId: dbReport.sessionId,
      studentName: dbReport.studentName,
      subject: dbReport.subject,
      startTime: dbReport.startTime,
      endTime: dbReport.endTime,
      status: dbReport.status,
      reportedBy: dbReport.reportedBy,
      reportedAt: dbReport.reportedAt,
      notes: dbReport.notes
    };
  }

  async findAll(): Promise<Classroom[]> {
    const classrooms = await this.prisma.classroom.findMany({
      include: {
        usageReports: {
          where: { status: 'active' },
          take: 1
        }
      }
    });

    return classrooms.map(classroom => 
      this.transformClassroom(classroom, classroom.usageReports[0])
    );
  }

  async findOne(id: string): Promise<Classroom> {
    const classroom = await this.prisma.classroom.findUnique({
      where: { id },
      include: {
        usageReports: {
          where: { status: 'active' },
          take: 1
        }
      }
    });

    if (!classroom) {
      throw new NotFoundException(`Classroom with ID ${id} not found`);
    }

    return this.transformClassroom(classroom, classroom.usageReports[0]);
  }

  async create(classroomData: Omit<Classroom, 'id' | 'currentSession'>): Promise<Classroom> {
    const newClassroom = await this.prisma.classroom.create({
      data: {
        name: classroomData.name,
        capacity: classroomData.capacity,
        location: classroomData.location,
        equipment: JSON.stringify(classroomData.equipment),
        status: classroomData.status || 'available'
      }
    });

    return this.transformClassroom(newClassroom);
  }

  async update(id: string, classroomData: Partial<Classroom>): Promise<Classroom> {
    const updateData: any = {};
    
    if (classroomData.name) updateData.name = classroomData.name;
    if (classroomData.capacity) updateData.capacity = classroomData.capacity;
    if (classroomData.location) updateData.location = classroomData.location;
    if (classroomData.equipment) updateData.equipment = JSON.stringify(classroomData.equipment);
    if (classroomData.status) updateData.status = classroomData.status;

    try {
      const updatedClassroom = await this.prisma.classroom.update({
        where: { id },
        data: updateData
      });
      return this.transformClassroom(updatedClassroom);
    } catch (error) {
      throw new NotFoundException(`Classroom with ID ${id} not found`);
    }
  }

  async remove(id: string): Promise<void> {
    try {
      await this.prisma.classroom.delete({
        where: { id }
      });
    } catch (error) {
      throw new NotFoundException(`Classroom with ID ${id} not found`);
    }
  }

  async reportUsage(usageData: Omit<ClassroomUsageReport, 'id' | 'reportedAt' | 'classroomName'>): Promise<ClassroomUsageReport> {
    const classroom = await this.findOne(usageData.classroomId);
    
    const newReport = await this.prisma.classroomUsageReport.create({
      data: {
        classroomId: usageData.classroomId,
        sessionId: usageData.sessionId,
        studentName: usageData.studentName,
        subject: usageData.subject,
        startTime: usageData.startTime,
        endTime: usageData.endTime,
        status: 'active',
        reportedBy: usageData.reportedBy,
        reportedAt: new Date().toISOString(),
        notes: usageData.notes
      },
      include: {
        classroom: true
      }
    });
    
    return this.transformUsageReport(newReport);
  }

  async endUsage(reportId: string, endData: { endTime: string; notes?: string }): Promise<ClassroomUsageReport> {
    try {
      const updatedReport = await this.prisma.classroomUsageReport.update({
        where: { id: reportId },
        data: {
          endTime: endData.endTime,
          status: 'completed',
          notes: endData.notes
        },
        include: {
          classroom: true
        }
      });
      
      return this.transformUsageReport(updatedReport);
    } catch (error) {
      throw new NotFoundException(`Usage report with ID ${reportId} not found`);
    }
  }

  async getUsageReports(date?: string, classroomId?: string): Promise<ClassroomUsageReport[]> {
    const where: any = {};
    
    if (date) {
      where.startTime = {
        startsWith: date
      };
    }
    
    if (classroomId) {
      where.classroomId = classroomId;
    }

    const reports = await this.prisma.classroomUsageReport.findMany({
      where,
      include: {
        classroom: true
      },
      orderBy: {
        reportedAt: 'desc'
      }
    });
    
    return reports.map(this.transformUsageReport);
  }

  async getStats() {
    const classrooms = await this.prisma.classroom.findMany();
    const usageReports = await this.prisma.classroomUsageReport.findMany({
      include: {
        classroom: true
      }
    });
    
    const totalClassrooms = classrooms.length;
    const availableClassrooms = classrooms.filter(c => c.status === 'available').length;
    const inUseClassrooms = usageReports.filter(r => r.status === 'active').length;
    const maintenanceClassrooms = classrooms.filter(c => c.status === 'maintenance').length;
    
    const today = new Date().toISOString().split('T')[0];
    const todaysReports = usageReports.filter(r => 
      r.startTime.startsWith(today)
    );
    
    const completedToday = todaysReports.filter(r => r.status === 'completed').length;
    const activeToday = todaysReports.filter(r => r.status === 'active').length;
    
    const utilizationByClassroom = {};
    classrooms.forEach(classroom => {
      const reports = usageReports.filter(r => r.classroomId === classroom.id);
      utilizationByClassroom[classroom.name] = reports.length;
    });
    
    return {
      totalClassrooms,
      availableClassrooms,
      inUseClassrooms,
      maintenanceClassrooms,
      todaysUsage: {
        completed: completedToday,
        active: activeToday,
        total: todaysReports.length
      },
      utilizationByClassroom,
      recentReports: usageReports
        .sort((a, b) => new Date(b.reportedAt).getTime() - new Date(a.reportedAt).getTime())
        .slice(0, 10)
        .map(this.transformUsageReport)
    };
  }
} 