import { FindManyOptions, FindOneOptions, FindOptionsWhere } from 'typeorm';

import { Order } from '../entities/order.entity';

export abstract class OrderRepositoryContract {
  abstract save(order: Order): Promise<Order>;
  abstract find(options?: FindManyOptions<Order>): Promise<Order[]>;
  abstract findOne(options: FindOneOptions<Order>): Promise<Order | null>;
  abstract findOneBy(criteria: FindOptionsWhere<Order>): Promise<Order | null>;
  abstract remove(order: Order): Promise<Order>;
  abstract update(id: string, order: Partial<Order>): Promise<void>;
}
