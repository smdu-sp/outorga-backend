import { IsString } from 'class-validator';

export class LoginRequestBody {
  @IsString({ message: 'O login precisa ser um texto.' })
  login: string;

  @IsString({ message: 'A senha precisa ser um texto.' })
  senha: string;
}
