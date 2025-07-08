import { PrismaService } from '../prisma/prisma.service';
export declare class SessionsService {
    private prisma;
    constructor(prisma: PrismaService);
}
import { AppLogger } from '../common/logger.service';
export declare class SessionsService {
    private readonly prisma;
    private readonly logger;
    constructor(prisma: PrismaService, logger: AppLogger);
}
