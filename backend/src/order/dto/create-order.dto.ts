import { IsNotEmpty, IsNumber, IsPositive, IsString } from 'class-validator';

export class CreateOrderDto {
  @IsString({ message: 'User ID precisa ser uma string' })
  @IsNotEmpty({ message: 'User ID é obrigatório' })
  userId: string;

  @IsNumber({}, { message: 'Total precisa ser um número' })
  @IsNotEmpty({ message: 'Total é obrigatório' })
  @IsPositive({ message: 'Total precisa ser um número positivo' })
  total: number;
}
