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
  // Allow dynamic access to prisma model delegates such as `this.school`, `this.student`, etc.
  // PrismaClient adds these properties at runtime based on the generated schema,
  // but TypeScript may not be aware of them if the client hasn’t been generated yet.
  // The following index signature makes the compiler accept these properties while
  // still retaining typed access for the rest of PrismaClient’s API.
  [key: string]: any;

  async onModuleInit() {
    await this.$connect();
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}
