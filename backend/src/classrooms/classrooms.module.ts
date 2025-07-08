import { Module } from '@nestjs/common';
import { ClassroomsService } from './classrooms.service';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [ClassroomsService],
  exports: [ClassroomsService],
})
export class ClassroomsModule {} 