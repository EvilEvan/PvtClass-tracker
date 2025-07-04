"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StudentsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../common/prisma.service");
const logger_service_1 = require("../common/logger.service");
let StudentsService = class StudentsService {
    constructor(prisma, logger) {
        this.prisma = prisma;
        this.logger = logger;
        this.seedData();
    }
    async seedData() {
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
    transformStudent(dbStudent) {
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
    async findAll(status) {
        const students = await this.prisma.student.findMany({
            where: status ? { status } : undefined,
        });
        return students.map(this.transformStudent);
    }
    async findOne(id) {
        const student = await this.prisma.student.findUnique({
            where: { id },
        });
        if (!student) {
            throw new common_1.NotFoundException(`Student with ID ${id} not found`);
        }
        return this.transformStudent(student);
    }
    async create(studentData) {
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
    async update(id, studentData) {
        const updateData = {};
        if (studentData.firstName)
            updateData.firstName = studentData.firstName;
        if (studentData.lastName)
            updateData.lastName = studentData.lastName;
        if (studentData.email)
            updateData.email = studentData.email;
        if (studentData.phone)
            updateData.phone = studentData.phone;
        if (studentData.dateOfBirth)
            updateData.dateOfBirth = studentData.dateOfBirth;
        if (studentData.enrollmentDate)
            updateData.enrollmentDate = studentData.enrollmentDate;
        if (studentData.status)
            updateData.status = studentData.status;
        if (studentData.subjects)
            updateData.subjects = JSON.stringify(studentData.subjects);
        if (studentData.notes)
            updateData.notes = studentData.notes;
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
        }
        catch (error) {
            throw new common_1.NotFoundException(`Student with ID ${id} not found`);
        }
    }
    async remove(id) {
        try {
            await this.prisma.student.delete({
                where: { id }
            });
        }
        catch (error) {
            throw new common_1.NotFoundException(`Student with ID ${id} not found`);
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
    async assignTeacher(studentId, teacherId) {
        const teacher = await this.prisma.user.findUnique({
            where: { id: teacherId }
        });
        if (!teacher || teacher.role !== 'TEACHER') {
            throw new common_1.NotFoundException('Teacher not found or invalid role');
        }
        const updatedStudent = await this.prisma.student.update({
            where: { id: studentId },
            data: { assignedTeacherId: teacherId },
        });
        return this.transformStudent(updatedStudent);
    }
    async unassignTeacher(studentId) {
        const updatedStudent = await this.prisma.student.update({
            where: { id: studentId },
            data: { assignedTeacherId: null },
        });
        return this.transformStudent(updatedStudent);
    }
    async findByTeacher(teacherId) {
        const students = await this.prisma.student.findMany({
            where: { assignedTeacherId: teacherId },
        });
        return students.map(this.transformStudent);
    }
    async findUnassigned() {
        const students = await this.prisma.student.findMany({
            where: { assignedTeacherId: null },
        });
        return students.map(this.transformStudent);
    }
};
exports.StudentsService = StudentsService;
exports.StudentsService = StudentsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        logger_service_1.AppLogger])
], StudentsService);
//# sourceMappingURL=students.service.js.map