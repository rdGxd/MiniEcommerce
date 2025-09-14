import { AuthModule } from '@/auth/auth.module';
import { CategoryModule } from '@/category/category.module';
import { HashingModule } from '@/common/hashing/hashing.module';
import { ProductModule } from '@/product/product.module';
import { UserModule } from '@/user/user.module';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CoreModule } from './core/core.module';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    DatabaseModule,
    CoreModule,
    HashingModule,
    UserModule,
    AuthModule,
    ProductModule,
    CategoryModule,
  ],
})
export class AppModule {}
