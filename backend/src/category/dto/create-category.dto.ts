import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCategoryDto {
  @IsString({ message: 'Nome deve ser uma string' })
  @IsNotEmpty({ message: 'Nome não pode ser vazio' })
  name: string;
}
