import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Create sample users (teachers and students)
  const teacher1 = await prisma.user.create({
    data: {
      id: 'teacher-1',
      email: 'teacher1@example.com',
      name: 'John Teacher',
      role: 'TEACHER',
    },
  });

  const student1 = await prisma.user.create({
    data: {
      id: 'student-1',
      email: 'student1@example.com',
      name: 'Alice Student',
      role: 'STUDENT',
    },
  });

  const student2 = await prisma.user.create({
    data: {
      id: 'student-2',
      email: 'student2@example.com',
      name: 'Bob Student',
      role: 'STUDENT',
    },
  });

  // Create sample sessions
  const now = new Date();
  const tomorrow = new Date(now.getTime() + 24 * 60 * 60 * 1000);
  const nextWeek = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);

  await prisma.session.create({
    data: {
      title: 'Math Tutoring Session',
      description: 'Algebra and geometry review',
      startTime: tomorrow,
      endTime: new Date(tomorrow.getTime() + 60 * 60 * 1000), // 1 hour later
      status: 'SCHEDULED',
      teacherConfirmed: false,
      studentId: 'student-1',
      teacherId: 'teacher-1',
    },
  });

  await prisma.session.create({
    data: {
      title: 'Physics Lab Session',
      description: 'Mechanics and motion experiments',
      startTime: nextWeek,
      endTime: new Date(nextWeek.getTime() + 90 * 60 * 1000), // 1.5 hours later
      status: 'SCHEDULED',
      teacherConfirmed: false,
      studentId: 'student-2',
      teacherId: 'teacher-1',
    },
  });

  await prisma.session.create({
    data: {
      title: 'Chemistry Review',
      description: 'Organic chemistry concepts',
      startTime: new Date(now.getTime() - 24 * 60 * 60 * 1000), // Yesterday
      endTime: new Date(now.getTime() - 23 * 60 * 60 * 1000), // Yesterday + 1 hour
      status: 'COMPLETED',
      teacherConfirmed: true,
      teacherNotes: 'Student showed good understanding of molecular structures',
      studentId: 'student-1',
      teacherId: 'teacher-1',
    },
  });

  console.log('Sample data created successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 