import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { CategoryModule } from './category/category.module';
import { HashingModule } from './common/hashing/hashing.module';
import { CoreModule } from './core/core.module';
import { DatabaseModule } from './database/database.module';
import { OrderModule } from './order/order.module';
import { OrderItemModule } from './order-item/order-item.module';
import { PaymentModule } from './payment/payment.module';
import { ProductModule } from './product/product.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    DatabaseModule,
    CoreModule,
    HashingModule,
    UserModule,
    ProductModule,
    CategoryModule,
    OrderModule,
    OrderItemModule,
    PaymentModule,
  ],
})
export class AppModule {}
