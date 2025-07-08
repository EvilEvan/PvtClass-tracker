import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
<<<<<<< HEAD

@Module({
  imports: [],
=======
import { AuthModule } from './auth/auth.module';
import { StudentsModule } from './students/students.module';
import { ClassroomsModule } from './classrooms/classrooms.module';
import { SessionsModule } from './sessions/sessions.module';
cursor/investigate-and-implement-improvements-633d
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [AuthModule, StudentsModule, ClassroomsModule, SessionsModule, PrismaModule],
=======
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
>main
>>>>>>> 17a341c30a8b80bbf412655f49f618fc9470c52f
  controllers: [AppController],
  providers: [AppService, PrismaService, AppLogger],
  exports: [PrismaService, AppLogger],
})
export class AppModule {}
