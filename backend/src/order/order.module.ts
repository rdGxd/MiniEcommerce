import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { OrderController } from './controller/order.controller';
import { Order } from './entities/order.entity';
import { OrderMapper } from './mapper/order-mapper';
import { OrderRepositoryContract } from './repository/contract-order-repository';
import { OrderRepository } from './repository/order.repository';
import { OrderService } from './service/order.service';

@Module({
  imports: [TypeOrmModule.forFeature([Order])],
  controllers: [OrderController],
  providers: [
    OrderService,
    OrderMapper,
    {
      provide: OrderRepositoryContract,
      useClass: OrderRepository,
    },
  ],
})
export class OrderModule {}
