import { IsNotEmpty, IsNumber, IsPositive } from 'class-validator';

export class CreateOrderDto {
  @IsNumber({}, { message: 'Total precisa ser um número' })
  @IsNotEmpty({ message: 'Total é obrigatório' })
  @IsPositive({ message: 'Total precisa ser um número positivo' })
  total: number;
}
