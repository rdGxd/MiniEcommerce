import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  FindManyOptions,
  FindOneOptions,
  FindOptionsWhere,
  Repository,
} from 'typeorm';

import { Category } from '../entities/category.entity';
import { CategoryRepositoryContract } from './contract-category-repository';

@Injectable()
export class CategoryRepository extends CategoryRepositoryContract {
  constructor(
    @InjectRepository(Category)
    private readonly repository: Repository<Category>,
  ) {
    super();
  }

  async save(category: Category): Promise<Category> {
    return await this.repository.save(category);
  }

  async find(options?: FindManyOptions<Category>): Promise<Category[]> {
    return await this.repository.find(options);
  }

  async findOne(options: FindOneOptions<Category>): Promise<Category | null> {
    return await this.repository.findOne(options);
  }

  async findOneBy(
    criteria: FindOptionsWhere<Category>,
  ): Promise<Category | null> {
    return await this.repository.findOneBy(criteria);
  }

  async remove(category: Category): Promise<Category> {
    return await this.repository.remove(category);
  }

  async update(id: string, category: Partial<Category>): Promise<void> {
    await this.repository.update(id, category);
  }
}
