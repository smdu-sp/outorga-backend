// NestJS
import {
    Injectable,
  } from '@nestjs/common';
  import { Reflector } from '@nestjs/core';
  import { AuthGuard } from '@nestjs/passport';
  
  @Injectable()
  export class RefreshAuthGuard extends AuthGuard('jwt-refresh') {
    constructor(private reflector: Reflector) {
      super();
    }
  }
  