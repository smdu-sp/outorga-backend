import {
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Body,
  UseGuards,
  Get,
  Req,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { AuthRequest } from './models/AuthRequest';
import { IsPublic } from './decorators/is-public.decorator';
import { UsuarioAtual } from './decorators/usuario-atual.decorator';
import { Usuario } from '@prisma/client';
import { RefreshAuthGuard } from './guards/refresh.guard';
import { LoginDto } from './dto/login.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('autenticação e autorização')
@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login') //localhost:3000/login
  @HttpCode(HttpStatus.OK)
  @UseGuards(LocalAuthGuard)
  @IsPublic()
  login(@Req() req: AuthRequest, @Body() _loginDto: LoginDto) {
    return this.authService.login(req.user);
  }

  @Post('refresh') //localhost:3000/refresh
  @IsPublic()
  @UseGuards(RefreshAuthGuard)
  refresh(@UsuarioAtual() usuario: Usuario) {
    return this.authService.refresh(usuario);
  }

  @Get('eu')
  @IsPublic()
  usuarioAtual(@UsuarioAtual() usuario: Usuario) {
    return usuario;
  }
}
