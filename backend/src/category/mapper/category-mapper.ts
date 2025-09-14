import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from '../dto/create-category.dto';
import { ResponseCategoryDto } from '../dto/response-category.dto';
import { Category } from '../entities/category.entity';

@Injectable()
export class CategoryMapper {
  toEntity(dto: CreateCategoryDto): Category {
    const category = new Category();
    category.name = dto.name;
    return category;
  }

  toDto(entity: Category): ResponseCategoryDto {
    const dto = new ResponseCategoryDto();
    dto.id = entity.id;
    dto.name = entity.name;
    dto.createdAt = entity.createdAt;
    dto.updatedAt = entity.updatedAt;
    return dto;
  }
}
