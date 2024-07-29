import { Global, Module } from '@nestjs/common';
import { Prisma2Service } from './prisma2.service';

@Global()
@Module({
  providers: [Prisma2Service],
  exports: [Prisma2Service],
})
export class Prisma2Module {}
