import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
} from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { Permissoes } from 'src/auth/decorators/permissoes.decorator';
import { UsuarioAtual } from 'src/auth/decorators/usuario-atual.decorator';
import { Usuario } from '@prisma/client';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@ApiTags('usuários')
@Controller('usuarios') //localhost:3000/usuarios
export class UsuariosController {
  constructor(private readonly usuariosService: UsuariosService) {}

  @Permissoes('SUP', 'ADM')
  @Post('criar') //localhost:3000/usuarios/criar
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  criar(
    @UsuarioAtual() usuario: Usuario,
    @Body() createUsuarioDto: CreateUsuarioDto,
  ) {
    return this.usuariosService.criar(createUsuarioDto, usuario);
  }

  @Permissoes('ADM', 'SUP')
  @Get('buscar-tudo') //localhost:3000/usuarios/buscar-tudo
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  buscarTudo(
    @UsuarioAtual() usuario: Usuario,
    @Query('pagina') pagina?: string,
    @Query('limite') limite?: string,
    @Query('status') status?: string,
    @Query('busca') busca?: string,
    @Query('permissao') permissao?: string,
  ) {
    return this.usuariosService.buscarTudo(
      usuario,
      +pagina,
      +limite,
      +status,
      busca,
      permissao,
    );
  }

  @Permissoes('ADM', 'SUP')
  @Get('buscar-por-id/:id') //localhost:3000/usuarios/buscar-por-id/id
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  buscarPorId(@Param('id') id: string) {
    return this.usuariosService.buscarPorId(id);
  }

  @Permissoes('ADM', 'SUP', 'USR')
  @Patch('atualizar/:id') //localhost:3000/usuarios/atualizar/id
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  atualizar(
    @UsuarioAtual() usuario: Usuario,
    @Param('id') id: string,
    @Body() updateUsuarioDto: UpdateUsuarioDto,
  ) {
    return this.usuariosService.atualizar(usuario, id, updateUsuarioDto);
  }

  @Permissoes('ADM', 'SUP', 'DEV')
  @Get('lista-completa') //localhost:3000/usuarios/lista-completa
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  listaCompleta() {
    return this.usuariosService.listaCompleta();
  }

  @Permissoes('ADM', 'SUP')
  @Delete('desativar/:id') //localhost:3000/usuarios/excluir/id
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  excluir(@Param('id') id: string) {
    return this.usuariosService.excluir(id);
  }

  @Permissoes('ADM', 'SUP')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Patch('autorizar/:id')
  autorizarUsuario(@Param('id') id: string) {
    return this.usuariosService.autorizaUsuario(id);
  }

  @Get('valida-usuario')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  validaUsuario(@UsuarioAtual() usuario: Usuario) {
    return this.usuariosService.validaUsuario(usuario.id);
  }

  @Permissoes('ADM', 'SUP')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get('buscar-novo')
  buscarNovo(@Query('login') login: string) {
    return this.usuariosService.buscarNovo(login);
  }
}
