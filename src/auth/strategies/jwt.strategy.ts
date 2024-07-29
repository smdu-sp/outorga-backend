import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UsuarioPayload } from '../models/UsuarioPayload';
import { UsuariosService } from 'src/usuarios/usuarios.service';
import { Usuario } from '@prisma/client';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(private usuariosService: UsuariosService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  async validate(payload: UsuarioPayload): Promise<Usuario> {
    const usuario = await this.usuariosService.buscarPorId(payload.sub);
    if (!usuario) throw new Error('Usuário não encontrado');
    return usuario;
  }
}
