import { Usuario } from '@prisma/client';
import { Request } from 'express';

export interface AuthRequest extends Request {
  user: Usuario;
}
