import { FindManyOptions, FindOneOptions, FindOptionsWhere } from 'typeorm';

import { Product } from '../entities/product.entity';

export abstract class ProductRepositoryContract {
  abstract save(product: Product): Promise<Product>;
  abstract find(options?: FindManyOptions<Product>): Promise<Product[]>;
  abstract findOne(options: FindOneOptions<Product>): Promise<Product | null>;
  abstract findOneBy(
    criteria: FindOptionsWhere<Product>,
  ): Promise<Product | null>;
  abstract remove(product: Product): Promise<Product>;
  abstract update(id: string, product: Partial<Product>): Promise<void>;
}
