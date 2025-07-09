import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

/*
 * A single, shared instance of PrismaClient for the entire NestJS application.
 * Having one instance prevents the "PrismaClientAlreadyKnownError" and
 * reduces the total number of open database connections.
 */
@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  async onModuleInit() {
    await this.$connect();
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}
