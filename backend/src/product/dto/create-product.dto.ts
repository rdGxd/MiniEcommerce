import { IsNotEmpty, IsString, IsUrl } from 'class-validator';

export class CreateProductDto {
  @IsString({ message: 'Nome deve ser uma string' })
  @IsNotEmpty({ message: 'Nome não pode ser vazio' })
  name: string;

  @IsString({ message: 'Descrição deve ser uma string' })
  @IsNotEmpty({ message: 'Descrição não pode ser vazio' })
  description: string;
  price: number;
  stock: number;

  @IsString({ message: 'Descrição deve ser uma string' })
  @IsNotEmpty({ message: 'Descrição não pode ser vazio' })
  categoryId: string;

  @IsString({ message: 'Descrição deve ser uma string' })
  @IsNotEmpty({ message: 'Descrição não pode ser vazio' })
  @IsUrl({}, { message: 'Imagem deve ser uma URL válida' })
  imageUrl: string;
}
