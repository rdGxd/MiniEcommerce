import { Product } from '@/product/entities/product.entity';
import { ProductController } from '@/product/product.controller';
import { ProductService } from '@/product/product.service';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Product])],
  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductModule {}
