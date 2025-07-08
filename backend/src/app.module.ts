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
import { PrismaModule } from './prisma/prisma.module';

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
    PrismaModule,
  ],
<<<<<<< HEAD
>main
>>>>>>> 17a341c30a8b80bbf412655f49f618fc9470c52f
=======
>>>>>>> bd5110fa1510d1f667d7394358477caff65b8eb5
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
