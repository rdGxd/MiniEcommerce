import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  FindManyOptions,
  FindOneOptions,
  FindOptionsWhere,
  Repository,
} from 'typeorm';

import { OrderItem } from '../entities/order-item.entity';
import { OrderItemRepositoryContract } from './contract-order-item-repository';

@Injectable()
export class OrderItemRepository extends OrderItemRepositoryContract {
  constructor(
    @InjectRepository(OrderItem)
    private readonly repository: Repository<OrderItem>,
  ) {
    super();
  }

  async save(orderItem: OrderItem): Promise<OrderItem> {
    return await this.repository.save(orderItem);
  }

  async find(options?: FindManyOptions<OrderItem>): Promise<OrderItem[]> {
    return await this.repository.find(options);
  }

  async findOne(options: FindOneOptions<OrderItem>): Promise<OrderItem | null> {
    return await this.repository.findOne(options);
  }

  async findOneBy(
    criteria: FindOptionsWhere<OrderItem>,
  ): Promise<OrderItem | null> {
    return await this.repository.findOneBy(criteria);
  }

  async remove(orderItem: OrderItem): Promise<OrderItem> {
    return await this.repository.remove(orderItem);
  }

  async update(id: string, orderItem: Partial<OrderItem>): Promise<void> {
    await this.repository.update(id, orderItem);
  }
}
