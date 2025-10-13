import { FindManyOptions, FindOneOptions, FindOptionsWhere } from 'typeorm';

import { Payment } from '../entities/payment.entity';

export abstract class PaymentRepositoryContract {
  abstract save(payment: Payment): Promise<Payment>;
  abstract find(options?: FindManyOptions<Payment>): Promise<Payment[]>;
  abstract findOne(options: FindOneOptions<Payment>): Promise<Payment | null>;
  abstract findOneBy(
    criteria: FindOptionsWhere<Payment>,
  ): Promise<Payment | null>;
  abstract remove(payment: Payment): Promise<Payment>;
  abstract update(id: string, payment: Partial<Payment>): Promise<void>;
}
