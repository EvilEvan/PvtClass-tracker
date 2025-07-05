import { Injectable, NotFoundException } from '@nestjs/common';
import { Student } from './students.controller';
import { PrismaService } from '../common/prisma.service';
import { AppLogger } from '../common/logger.service';

@Injectable()
export class StudentsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly logger: AppLogger,
  ) {
    this.seedData();
  }

  private async seedData() {
    // Check if data exists, if not, seed with sample data
    const count = await this.prisma.student.count();
    if (count === 0) {
      await this.prisma.student.createMany({
        data: [
          {
            firstName: 'Luke',
            lastName: 'Skywalker',
            email: 'luke.skywalker@rebellion.net',
            phone: '+1-555-0101',
            dateOfBirth: '2005-03-15',
            enrollmentDate: '2024-09-01',
            status: 'active',
            subjects: JSON.stringify(['Mathematics', 'Physics', 'Computer Science']),
            notes: 'Exceptional student with strong analytical skills. Shows great potential in STEM subjects.',
            emergencyContactName: 'Owen Lars',
            emergencyContactPhone: '+1-555-0102',
            emergencyContactRelationship: 'Uncle',
            addressStreet: '123 Tatooine Drive',
            addressCity: 'Desert Springs',
            addressState: 'AZ',
            addressZipCode: '85001'
          },
          {
            firstName: 'Leia',
            lastName: 'Organa',
            email: 'leia.organa@alderaan.gov',
            phone: '+1-555-0201',
            dateOfBirth: '2005-03-15',
            enrollmentDate: '2024-09-01',
            status: 'active',
            subjects: JSON.stringify(['Literature', 'History', 'Political Science']),
            notes: 'Natural leader with excellent communication skills. Particularly strong in humanities.',
            emergencyContactName: 'Bail Organa',
            emergencyContactPhone: '+1-555-0202',
            emergencyContactRelationship: 'Father',
            addressStreet: '456 Royal Avenue',
            addressCity: 'Capital City',
            addressState: 'DC',
            addressZipCode: '20001'
          },
          {
            firstName: 'Han',
            lastName: 'Solo',
            email: 'han.solo@smuggler.com',
            phone: '+1-555-0301',
            dateOfBirth: '2004-07-13',
            enrollmentDate: '2024-10-15',
            status: 'active',
            subjects: JSON.stringify(['Business', 'Engineering', 'Economics']),
            notes: 'Independent learner with practical approach to problem-solving. Sometimes needs motivation.',
            emergencyContactName: 'Chewbacca',
            emergencyContactPhone: '+1-555-0302',
            emergencyContactRelationship: 'Friend',
            addressStreet: '789 Millennium Lane',
            addressCity: 'Corellia',
            addressState: 'TX',
            addressZipCode: '75001'
          }
        ]
      });
    }
  }

  private transformStudent(dbStudent: any): Student {
    return {
      id: dbStudent.id,
      firstName: dbStudent.firstName,
      lastName: dbStudent.lastName,
      email: dbStudent.email,
      phone: dbStudent.phone,
      dateOfBirth: dbStudent.dateOfBirth,
      enrollmentDate: dbStudent.enrollmentDate,
      status: dbStudent.status,
      subjects: JSON.parse(dbStudent.subjects),
      notes: dbStudent.notes || '',
      assignedTeacherId: dbStudent.assignedTeacherId,
      assignedTeacher: dbStudent.assignedTeacher ? {
        id: dbStudent.assignedTeacher.id,
        name: dbStudent.assignedTeacher.name,
        email: dbStudent.assignedTeacher.email
      } : undefined,
      emergencyContact: {
        name: dbStudent.emergencyContactName,
        phone: dbStudent.emergencyContactPhone,
        relationship: dbStudent.emergencyContactRelationship
      },
      address: {
        street: dbStudent.addressStreet,
        city: dbStudent.addressCity,
        state: dbStudent.addressState,
        zipCode: dbStudent.addressZipCode
      }
    };
  }

  async findAll(status?: string): Promise<Student[]> {
    const students = await this.prisma.student.findMany({
      where: status ? { status } : undefined,
      // include: {
      //   assignedTeacher: {
      //     select: {
      //       id: true,
      //       name: true,
      //       email: true
      //     }
      //   }
      // }
    });
    return students.map(this.transformStudent);
  }

  async findOne(id: string): Promise<Student> {
    const student = await this.prisma.student.findUnique({
      where: { id },
      // include: {
      //   assignedTeacher: {
      //     select: {
      //       id: true,
      //       name: true,
      //       email: true
      //     }
      //   }
      // }
    });
    if (!student) {
      throw new NotFoundException(`Student with ID ${id} not found`);
    }
    return this.transformStudent(student);
  }

  async create(studentData: Omit<Student, 'id'>): Promise<Student> {
    const newStudent = await this.prisma.student.create({
      data: {
        firstName: studentData.firstName,
        lastName: studentData.lastName,
        email: studentData.email,
        phone: studentData.phone,
        dateOfBirth: studentData.dateOfBirth,
        enrollmentDate: studentData.enrollmentDate,
        status: studentData.status,
        subjects: JSON.stringify(studentData.subjects),
        notes: studentData.notes,
        emergencyContactName: studentData.emergencyContact.name,
        emergencyContactPhone: studentData.emergencyContact.phone,
        emergencyContactRelationship: studentData.emergencyContact.relationship,
        addressStreet: studentData.address.street,
        addressCity: studentData.address.city,
        addressState: studentData.address.state,
        addressZipCode: studentData.address.zipCode
      }
    });
    return this.transformStudent(newStudent);
  }

  async update(id: string, studentData: Partial<Student>): Promise<Student> {
    const updateData: any = {};
    
    if (studentData.firstName) updateData.firstName = studentData.firstName;
    if (studentData.lastName) updateData.lastName = studentData.lastName;
    if (studentData.email) updateData.email = studentData.email;
    if (studentData.phone) updateData.phone = studentData.phone;
    if (studentData.dateOfBirth) updateData.dateOfBirth = studentData.dateOfBirth;
    if (studentData.enrollmentDate) updateData.enrollmentDate = studentData.enrollmentDate;
    if (studentData.status) updateData.status = studentData.status;
    if (studentData.subjects) updateData.subjects = JSON.stringify(studentData.subjects);
    if (studentData.notes) updateData.notes = studentData.notes;
    if (studentData.emergencyContact) {
      updateData.emergencyContactName = studentData.emergencyContact.name;
      updateData.emergencyContactPhone = studentData.emergencyContact.phone;
      updateData.emergencyContactRelationship = studentData.emergencyContact.relationship;
    }
    if (studentData.address) {
      updateData.addressStreet = studentData.address.street;
      updateData.addressCity = studentData.address.city;
      updateData.addressState = studentData.address.state;
      updateData.addressZipCode = studentData.address.zipCode;
    }

    try {
      const updatedStudent = await this.prisma.student.update({
        where: { id },
        data: updateData
      });
      return this.transformStudent(updatedStudent);
    } catch (error) {
      throw new NotFoundException(`Student with ID ${id} not found`);
    }
  }

  async remove(id: string): Promise<void> {
    try {
      await this.prisma.student.delete({
        where: { id }
      });
    } catch (error) {
      throw new NotFoundException(`Student with ID ${id} not found`);
    }
  }

  async getStats() {
    const students = await this.prisma.student.findMany();
    
    const total = students.length;
    const active = students.filter(s => s.status === 'active').length;
    const inactive = students.filter(s => s.status === 'inactive').length;
    const suspended = students.filter(s => s.status === 'suspended').length;
    
    const subjectCounts = {};
    students.forEach(student => {
      const subjects = JSON.parse(student.subjects);
      subjects.forEach(subject => {
        subjectCounts[subject] = (subjectCounts[subject] || 0) + 1;
      });
    });

    return {
      total,
      active,
      inactive,
      suspended,
      subjectDistribution: subjectCounts,
      recentEnrollments: students
        .sort((a, b) => new Date(b.enrollmentDate).getTime() - new Date(a.enrollmentDate).getTime())
        .slice(0, 5)
        .map(this.transformStudent)
    };
  }

  // Moderator-specific methods for teacher assignments
  async assignTeacher(studentId: string, teacherId: string): Promise<Student> {
    // Verify teacher exists and has TEACHER role
    const teacher = await this.prisma.user.findUnique({
      where: { id: teacherId }
    });
    
    if (!teacher || teacher.role !== 'TEACHER') {
      throw new NotFoundException('Teacher not found or invalid role');
    }

    const updatedStudent = await this.prisma.student.update({
      where: { id: studentId },
      data: { assignedTeacherId: teacherId },
      // include: {
      //   assignedTeacher: {
      //     select: {
      //       id: true,
      //       name: true,
      //       email: true
      //     }
      //   }
      // }
    });

    return this.transformStudent(updatedStudent);
  }

  async unassignTeacher(studentId: string): Promise<Student> {
    const updatedStudent = await this.prisma.student.update({
      where: { id: studentId },
      data: { assignedTeacherId: null },
      // include: {
      //   assignedTeacher: {
      //     select: {
      //       id: true,
      //       name: true,
      //       email: true
      //     }
      //   }
      // }
    });

    return this.transformStudent(updatedStudent);
  }

  async findByTeacher(teacherId: string): Promise<Student[]> {
    const students = await this.prisma.student.findMany({
      where: { assignedTeacherId: teacherId },
      // include: {
      //   assignedTeacher: {
      //     select: {
      //       id: true,
      //       name: true,
      //       email: true
      //     }
      //   }
      // }
    });

    return students.map(this.transformStudent);
  }

  async findUnassigned(): Promise<Student[]> {
    const students = await this.prisma.student.findMany({
      where: { assignedTeacherId: null },
      // include: {
      //   assignedTeacher: {
      //     select: {
      //       id: true,
      //       name: true,
      //       email: true
      //     }
      //   }
      // }
    });

    return students.map(this.transformStudent);
  }
} 