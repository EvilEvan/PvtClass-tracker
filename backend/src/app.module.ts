import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { StudentsModule } from './students/students.module';
import { ClassroomsModule } from './classrooms/classrooms.module';
import { SessionsModule } from './sessions/sessions.module';
import { PrismaService } from './common/prisma.service';
import { AppLogger } from './common/logger.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    AuthModule,
    StudentsModule,
    ClassroomsModule,
    SessionsModule,
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService, AppLogger],
  exports: [PrismaService, AppLogger],
})
export class AppModule {} 