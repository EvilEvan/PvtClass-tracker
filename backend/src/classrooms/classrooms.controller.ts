import { Controller, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('classrooms')
@UseGuards(JwtAuthGuard)
export class ClassroomsController {}
