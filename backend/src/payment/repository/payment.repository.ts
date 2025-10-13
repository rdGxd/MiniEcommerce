import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  FindManyOptions,
  FindOneOptions,
  FindOptionsWhere,
  Repository,
} from 'typeorm';

import { Payment } from '../entities/payment.entity';
import { PaymentRepositoryContract } from './contract-payment-repository';

@Injectable()
export class PaymentRepository extends PaymentRepositoryContract {
  constructor(
    @InjectRepository(Payment)
    private readonly repository: Repository<Payment>,
  ) {
    super();
  }

  async save(payment: Payment): Promise<Payment> {
    return await this.repository.save(payment);
  }

  async find(options?: FindManyOptions<Payment>): Promise<Payment[]> {
    return await this.repository.find(options);
  }

  async findOne(options: FindOneOptions<Payment>): Promise<Payment | null> {
    return await this.repository.findOne(options);
  }

  async findOneBy(
    criteria: FindOptionsWhere<Payment>,
  ): Promise<Payment | null> {
    return await this.repository.findOneBy(criteria);
  }

  async remove(payment: Payment): Promise<Payment> {
    return await this.repository.remove(payment);
  }

  async update(id: string, payment: Partial<Payment>): Promise<void> {
    await this.repository.update(id, payment);
  }
}
