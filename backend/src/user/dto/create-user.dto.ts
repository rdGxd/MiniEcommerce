import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @IsString({ message: 'Nome deve ser uma string' })
  @MinLength(3, { message: 'Nome deve ter no mínimo 3 caracteres' })
  @MaxLength(255, { message: 'Nome deve ter no máximo 255 caracteres' })
  @IsNotEmpty({ message: 'Nome não pode ser vazio' })
  name: string;

  @IsEmail({}, { message: 'Email deve ser um email válido' })
  @IsNotEmpty({ message: 'Email não pode ser vazio' })
  email: string;

  @IsString({ message: 'Senha deve ser uma string' })
  @MinLength(5, { message: 'Senha deve ter no mínimo 5 caracteres' })
  @IsNotEmpty({ message: 'Senha não pode ser vazia' })
  password: string;
}
