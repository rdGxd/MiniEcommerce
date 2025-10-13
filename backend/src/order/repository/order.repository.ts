import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  FindManyOptions,
  FindOneOptions,
  FindOptionsWhere,
  Repository,
} from 'typeorm';

import { Order } from '../entities/order.entity';
import { OrderRepositoryContract } from './contract-order-repository';

@Injectable()
export class OrderRepository extends OrderRepositoryContract {
  constructor(
    @InjectRepository(Order)
    private readonly repository: Repository<Order>,
  ) {
    super();
  }

  async save(order: Order): Promise<Order> {
    return await this.repository.save(order);
  }

  async find(options?: FindManyOptions<Order>): Promise<Order[]> {
    return await this.repository.find(options);
  }

  async findOne(options: FindOneOptions<Order>): Promise<Order | null> {
    return await this.repository.findOne(options);
  }

  async findOneBy(criteria: FindOptionsWhere<Order>): Promise<Order | null> {
    return await this.repository.findOneBy(criteria);
  }

  async remove(order: Order): Promise<Order> {
    return await this.repository.remove(order);
  }

  async update(id: string, order: Partial<Order>): Promise<void> {
    await this.repository.update(id, order);
  }
}
