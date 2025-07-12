import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

export interface Classroom {
  id: string;
  name: string;
  capacity: number;
  location: string;
  equipment: string[];
  status: string;
}

@Injectable()
export class ClassroomsService {
  constructor(private prisma: PrismaService) {
    this.seedData();
  }

  private async seedData() {
    const classroomCount = await this.prisma.classroom.count();
    if (classroomCount === 0) {
      await this.prisma.classroom.createMany({
        data: [
          {
            name: 'Command Bridge',
            capacity: 8,
            location: 'Level 1 - Main Deck',
            equipment: JSON.stringify([
              'Interactive Whiteboard',
              'Projector',
              'Sound System',
              'Video Conferencing',
            ]),
            status: 'available',
          },
          {
            name: 'Jedi Council Chamber',
            capacity: 12,
            location: 'Level 2 - East Wing',
            equipment: JSON.stringify([
              'Holographic Display',
              'Surround Sound',
              'Climate Control',
              'Recording Equipment',
            ]),
            status: 'available',
          },
          {
            name: 'Rebel Base Conference',
            capacity: 6,
            location: 'Level 1 - West Wing',
            equipment: JSON.stringify([
              'Smart Board',
              'Tablets',
              'Wireless Presentation',
              'Coffee Station',
            ]),
            status: 'available',
          },
          {
            name: 'Death Star Briefing Room',
            capacity: 15,
            location: 'Level 3 - Central',
            equipment: JSON.stringify([
              'Large Screen Display',
              'Microphone System',
              'Document Camera',
              'Lighting Controls',
            ]),
            status: 'maintenance',
          },
        ],
      });
    }
  }

  private transformClassroom(dbClassroom: any): Classroom {
    return {
      id: dbClassroom.id,
      name: dbClassroom.name,
      capacity: dbClassroom.capacity,
      location: dbClassroom.location,
      equipment: JSON.parse(dbClassroom.equipment),
      status: dbClassroom.status,
    };
  }

  async findAll(): Promise<Classroom[]> {
    const classrooms = await this.prisma.classroom.findMany();
    return classrooms.map(this.transformClassroom);
  }

  async findOne(id: string): Promise<Classroom> {
    const classroom = await this.prisma.classroom.findUnique({
      where: { id },
    });

    if (!classroom) {
      throw new NotFoundException(`Classroom with ID ${id} not found`);
    }

    return this.transformClassroom(classroom);
  }

  async create(classroomData: Omit<Classroom, 'id'>): Promise<Classroom> {
    const newClassroom = await this.prisma.classroom.create({
      data: {
        name: classroomData.name,
        capacity: classroomData.capacity,
        location: classroomData.location,
        equipment: JSON.stringify(classroomData.equipment),
        status: classroomData.status || 'available',
      },
    });

    return this.transformClassroom(newClassroom);
  }

  async update(id: string, classroomData: Partial<Classroom>): Promise<Classroom> {
    const updateData: any = {};

    if (classroomData.name) updateData.name = classroomData.name;
    if (classroomData.capacity) updateData.capacity = classroomData.capacity;
    if (classroomData.location) updateData.location = classroomData.location;
    if (classroomData.equipment)
      updateData.equipment = JSON.stringify(classroomData.equipment);
    if (classroomData.status) updateData.status = classroomData.status;

    try {
      const updatedClassroom = await this.prisma.classroom.update({
        where: { id },
        data: updateData,
      });
      return this.transformClassroom(updatedClassroom);
    } catch (error) {
      console.error(error);
      throw new NotFoundException(`Classroom with ID ${id} not found`);
    }
  }

  async remove(id: string): Promise<void> {
    try {
      await this.prisma.classroom.delete({
        where: { id },
      });
    } catch (error) {
      console.error(error);
      throw new NotFoundException(`Classroom with ID ${id} not found`);
    }
  }

  async getStats() {
    const classrooms = await this.prisma.classroom.findMany();

    const totalClassrooms = classrooms.length;
    const availableClassrooms = classrooms.filter(
      (c) => c.status === 'available',
    ).length;
    const maintenanceClassrooms = classrooms.filter(
      (c) => c.status === 'maintenance',
    ).length;

    return {
      totalClassrooms,
      availableClassrooms,
      maintenanceClassrooms,
    };
  }
}
