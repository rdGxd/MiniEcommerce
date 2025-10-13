import { Injectable } from '@nestjs/common';

import { Category } from '../../category/entities/category.entity';
import { CreateProductDto } from '../dto/create-product.dto';
import { ResponseProductDto } from '../dto/response-product.dto';
import { Product } from '../entities/product.entity';

@Injectable()
export class ProductMapper {
  toEntity(dto: CreateProductDto): Product {
    const product = new Product();
    product.name = dto.name;
    product.description = dto.description;
    product.price = dto.price;
    product.stock = dto.stock;
    product.categories = dto.categoryId.map(id => {
      const cat = new Category();
      cat.id = id;
      return cat;
    });
    product.imageUrl = dto.imageUrl;
    return product;
  }

  toDto(entity: Product): ResponseProductDto {
    const dto = new ResponseProductDto();
    dto.id = entity.id;
    dto.name = entity.name;
    dto.description = entity.description;
    dto.price = entity.price;
    dto.stock = entity.stock;
    dto.categories = entity?.categories?.map(category => ({
      id: category.id,
      name: category.name,
    }));
    dto.createdAt = entity.createdAt;
    dto.updatedAt = entity.updatedAt;
    return dto;
  }
}
