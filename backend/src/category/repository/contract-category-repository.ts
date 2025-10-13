import { FindManyOptions, FindOneOptions, FindOptionsWhere } from 'typeorm';

import { Category } from '../entities/category.entity';

export abstract class CategoryRepositoryContract {
  abstract save(category: Category): Promise<Category>;
  abstract find(options?: FindManyOptions<Category>): Promise<Category[]>;
  abstract findOne(options: FindOneOptions<Category>): Promise<Category | null>;
  abstract findOneBy(
    criteria: FindOptionsWhere<Category>,
  ): Promise<Category | null>;
  abstract remove(category: Category): Promise<Category>;
  abstract update(id: string, category: Partial<Category>): Promise<void>;
}
