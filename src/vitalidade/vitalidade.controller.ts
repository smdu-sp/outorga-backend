import { Controller, Get, UseGuards } from '@nestjs/common';
import {
  HealthCheckService,
  HttpHealthIndicator,
  HealthCheck,
  PrismaHealthIndicator,
  DiskHealthIndicator,
  MemoryHealthIndicator,
} from '@nestjs/terminus';
import { PrismaService } from 'src/prisma/prisma.service';
import { Permissoes } from 'src/auth/decorators/permissoes.decorator';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@ApiTags('vitalidade')
@Controller('vitalidade')
export class VitalidadeController {
  constructor(
    private health: HealthCheckService,
    private http: HttpHealthIndicator,
    private prismaHealth: PrismaHealthIndicator,
    private prisma: PrismaService,
    private readonly disk: DiskHealthIndicator,
    private memory: MemoryHealthIndicator,
  ) {}

  @Permissoes('ADM', 'SUP', 'DEV')
  @Get()
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @HealthCheck()
  check() {
    return this.health.check([
      () =>
        this.http.pingCheck(
          'sispeuc-frontend',
          `${process.env.HEALTHCHECK_FRONTEND_URL}`,
        ), // Monitorar front-end: Há/Não há conexão
      () =>
        this.disk.checkStorage('storage', {
          path: '/',
          thresholdPercent: parseFloat(process.env.HEALTHCHECK_MAX_DISK),
        }),
      async () => this.prismaHealth.pingCheck('prisma', this.prisma), // Monitorar Prisma e PostgreSQL: Há/Não há conexão
      () =>
        this.memory.checkHeap(
          'memory_heap',
          Number(process.env.HEALTHCHECK_MAX_MEMORY),
        ),
    ]);
  }
}
