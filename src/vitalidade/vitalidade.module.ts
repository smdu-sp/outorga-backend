import { Module } from '@nestjs/common';
import { TerminusModule } from '@nestjs/terminus';
import { VitalidadeController } from './vitalidade.controller';
import { HttpModule } from '@nestjs/axios';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [
    TerminusModule.forRoot({
      errorLogStyle: 'pretty',
    }),
    PrismaModule,
    HttpModule,
  ],
  controllers: [VitalidadeController],
})
export class VitalidadeModule {}
