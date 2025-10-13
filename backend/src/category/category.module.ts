import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CategoryController } from './controller/category.controller';
import { Category } from './entities/category.entity';
import { CategoryMapper } from './mapper/category-mapper';
import { CategoryRepository } from './repository/category.repository';
import { CategoryRepositoryContract } from './repository/contract-category-repository';
import { CategoryService } from './service/category.service';

@Module({
  imports: [TypeOrmModule.forFeature([Category])],
  controllers: [CategoryController],
  providers: [
    CategoryService,
    CategoryMapper,
    {
      provide: CategoryRepositoryContract,
      useClass: CategoryRepository,
    },
  ],
  exports: [CategoryService],
})
export class CategoryModule {}
