import {
  ArrayNotEmpty,
  IsArray,
  IsNotEmpty,
  IsPositive,
  IsString,
  IsUrl,
  IsUUID,
} from 'class-validator';

export class CreateProductDto {
  @IsString({ message: 'Nome deve ser uma string' })
  @IsNotEmpty({ message: 'Nome não pode ser vazio' })
  name: string;

  @IsString({ message: 'Descrição deve ser uma string' })
  @IsNotEmpty({ message: 'Descrição não pode ser vazio' })
  description: string;

  @IsNotEmpty({ message: 'Preço não pode ser vazio' })
  @IsPositive({ message: 'Preço deve ser um número positivo' })
  price: number;

  @IsNotEmpty({ message: 'Estoque não pode ser vazio' })
  @IsPositive({ message: 'Estoque deve ser um número positivo' })
  stock: number;

  @IsArray({ message: 'Categorias deve ser um array' })
  @ArrayNotEmpty({ message: 'Deve haver pelo menos uma categoria' })
  @IsUUID('all', {
    each: true,
    message: 'Cada categoria deve ser um UUID válido',
  })
  categoryId: string[];

  @IsString({ message: 'Imagem deve ser uma string' })
  @IsNotEmpty({ message: 'Imagem não pode ser vazio' })
  @IsUrl({}, { message: 'Imagem deve ser uma URL válida' })
  imageUrl: string;
}
