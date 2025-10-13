import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ProductController } from './controller/product.controller';
import { Product } from './entities/product.entity';
import { ProductMapper } from './mapper/product-mapper';
import { ProductRepositoryContract } from './repository/contract-product-repository';
import { ProductRepository } from './repository/product.repository';
import { ProductService } from './service/product.service';

@Module({
  imports: [TypeOrmModule.forFeature([Product])],
  controllers: [ProductController],
  providers: [
    ProductService,
    ProductMapper,
    {
      provide: ProductRepositoryContract,
      useClass: ProductRepository,
    },
  ],
})
export class ProductModule {}
