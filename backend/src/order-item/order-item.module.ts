import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { OrderItemController } from './controller/order-item.controller';
import { OrderItem } from './entities/order-item.entity';
import { OrderItemMapper } from './mapper/order-item-mapper';
import { OrderItemRepositoryContract } from './repository/contract-order-item-repository';
import { OrderItemRepository } from './repository/order-item.repository';
import { OrderItemService } from './service/order-item.service';

@Module({
  imports: [TypeOrmModule.forFeature([OrderItem])],
  controllers: [OrderItemController],
  providers: [
    OrderItemService,
    OrderItemMapper,
    {
      provide: OrderItemRepositoryContract,
      useClass: OrderItemRepository,
    },
  ],
})
export class OrderItemModule {}
