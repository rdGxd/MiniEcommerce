import { IsNotEmpty, IsNumber, IsPositive, IsUUID } from 'class-validator';

export class CreateOrderItemDto {
  @IsUUID()
  @IsNotEmpty({ message: 'O ID do Pedido não pode estar vazio' })
  orderId: string;

  @IsUUID()
  @IsNotEmpty({ message: 'O ID do Produto não pode estar vazio' })
  productId: string;

  @IsNumber({}, { message: 'A Quantidade deve ser um número válido' })
  @IsPositive({ message: 'A Quantidade deve ser um número positivo' })
  @IsNotEmpty({ message: 'A Quantidade não pode estar vazia' })
  quantity: number;

  @IsNumber({}, { message: 'O Preço deve ser um número válido' })
  @IsPositive({ message: 'O Preço deve ser um número positivo' })
  @IsNotEmpty({ message: 'O Preço não pode estar vazio' })
  price: number;
}
