import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  FindManyOptions,
  FindOneOptions,
  FindOptionsWhere,
  Repository,
} from 'typeorm';

import { Product } from '../entities/product.entity';
import { ProductRepositoryContract } from './contract-product-repository';

@Injectable()
export class ProductRepository extends ProductRepositoryContract {
  constructor(
    @InjectRepository(Product)
    private readonly repository: Repository<Product>,
  ) {
    super();
  }

  async save(product: Product): Promise<Product> {
    return await this.repository.save(product);
  }

  async find(options?: FindManyOptions<Product>): Promise<Product[]> {
    return await this.repository.find(options);
  }

  async findOne(options: FindOneOptions<Product>): Promise<Product | null> {
    return await this.repository.findOne(options);
  }

  async findOneBy(
    criteria: FindOptionsWhere<Product>,
  ): Promise<Product | null> {
    return await this.repository.findOneBy(criteria);
  }

  async remove(product: Product): Promise<Product> {
    return await this.repository.remove(product);
  }

  async update(id: string, product: Partial<Product>): Promise<void> {
    await this.repository.update(id, product);
  }
}
