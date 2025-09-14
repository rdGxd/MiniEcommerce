import { CategoryController } from '@/category/category.controller';
import { CategoryService } from '@/category/category.service';
import { Category } from '@/category/entities/category.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryMapper } from './mapper/category-mapper';

@Module({
  imports: [TypeOrmModule.forFeature([Category])],
  controllers: [CategoryController],
  providers: [CategoryService, CategoryMapper],
  exports: [CategoryService],
})
export class CategoryModule {}
