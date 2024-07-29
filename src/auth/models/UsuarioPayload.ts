export interface UsuarioPayload {
  sub: string;
  login: string;
  email: string;
  nome: string;
  senha?: string;
  permissao: string;
  status: number;
  iat?: number;
  exp?: number;
}
