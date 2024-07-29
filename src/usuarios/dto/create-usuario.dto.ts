import { ApiProperty } from '@nestjs/swagger';
import { $Enums } from '@prisma/client';
import {
  IsEmail,
  IsEnum,
  IsNumber,
  IsString,
  MinLength,
} from 'class-validator';

export class CreateUsuarioDto {
  @ApiProperty({ description: 'Nome do usuário com ao menos 10 caracteres.' })
  @MinLength(10, { message: 'Nome tem de ter ao menos 10 caracteres.' })
  @IsString({ message: 'Tem de ser texto.' })
  nome: string;

  @ApiProperty({ description: 'Login com ao menos 7 caracteres.' })
  @IsString({ message: 'Login inválido!' })
  @MinLength(7, { message: 'Login tem de ter ao menos 7 caracteres.' })
  login: string;

  @ApiProperty({ description: 'E-mail com ao menos 7 caracteres.' })
  @IsString({ message: 'Login inválido!' })
  @IsEmail({}, { message: 'Login tem de ter ao menos 7 caracteres.' })
  email: string;

  @ApiProperty({ description: 'Enums do tipo:', enum: $Enums.Permissao })
  @IsEnum($Enums.Permissao, { message: 'Escolha uma permissão válida.' })
  permissao?: $Enums.Permissao;

  @IsNumber({}, { message: 'Status inválido!' })
  status?: number;
}
