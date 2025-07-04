import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { StudentsModule } from './students/students.module';
import { ClassroomsModule } from './classrooms/classrooms.module';
import { SessionsModule } from './sessions/sessions.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [AuthModule, StudentsModule, ClassroomsModule, SessionsModule, PrismaModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {} 