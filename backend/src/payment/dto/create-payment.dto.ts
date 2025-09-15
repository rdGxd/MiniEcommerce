import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
} from 'class-validator';
import { PaymentMethod } from '../enums/payment-enums';

export class CreatePaymentDto {
  @IsNotEmpty({ message: 'Amount é obrigatório' })
  @IsNumber({}, { message: 'Amount precisa ser um número' })
  @IsPositive({ message: 'Amount precisa ser um número positivo' })
  amount: number;

  @IsNotEmpty({ message: 'Currency é obrigatório' })
  @IsString({ message: 'Currency precisa ser um string' })
  currency: string;

  @IsNotEmpty({ message: 'Método de pagamento é obrigatório' })
  @IsEnum(PaymentMethod, { message: 'Método de pagamento inválido' })
  method: PaymentMethod;
}
