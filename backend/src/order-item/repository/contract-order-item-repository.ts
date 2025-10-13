import { FindManyOptions, FindOneOptions, FindOptionsWhere } from 'typeorm';

import { OrderItem } from '../entities/order-item.entity';

export abstract class OrderItemRepositoryContract {
  abstract save(orderItem: OrderItem): Promise<OrderItem>;
  abstract find(options?: FindManyOptions<OrderItem>): Promise<OrderItem[]>;
  abstract findOne(
    options: FindOneOptions<OrderItem>,
  ): Promise<OrderItem | null>;
  abstract findOneBy(
    criteria: FindOptionsWhere<OrderItem>,
  ): Promise<OrderItem | null>;
  abstract remove(orderItem: OrderItem): Promise<OrderItem>;
  abstract update(id: string, orderItem: Partial<OrderItem>): Promise<void>;
}
