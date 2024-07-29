import { SetMetadata } from '@nestjs/common';

export const Permissoes = (...permissoes: string[]) =>
  SetMetadata('permissoes', permissoes);
