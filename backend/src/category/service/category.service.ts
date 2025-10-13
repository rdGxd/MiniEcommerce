import { Injectable, NotFoundException } from '@nestjs/common';

import { CATEGORY_ERRORS } from '../../constants/category.constants';
import { CreateCategoryDto } from '../dto/create-category.dto';
import { ResponseCategoryDto } from '../dto/response-category.dto';
import { UpdateCategoryDto } from '../dto/update-category.dto';
import { CategoryMapper } from '../mapper/category-mapper';
import { CategoryRepositoryContract } from '../repository/contract-category-repository';

@Injectable()
export class CategoryService {
  constructor(
    private readonly categoryRepository: CategoryRepositoryContract,
    private readonly categoryMapper: CategoryMapper,
  ) {}

  async create(createCategoryDto: CreateCategoryDto) {
    const category = this.categoryMapper.toEntity(createCategoryDto);
    const savedCategory = await this.categoryRepository.save(category);
    if (!savedCategory) {
      throw new NotFoundException(CATEGORY_ERRORS.FAILED_CREATED);
    }
    return this.categoryMapper.toDto(savedCategory);
  }

  async findAll(): Promise<ResponseCategoryDto[]> {
    const allCategories = await this.categoryRepository.find();
    return allCategories.map(category => this.categoryMapper.toDto(category));
  }

  async findOne(id: string) {
    const category = await this.categoryRepository.findOneBy({ id });
    if (!category) {
      throw new NotFoundException(CATEGORY_ERRORS.NOT_FOUND);
    }
    return this.categoryMapper.toDto(category);
  }

  async update(id: string, updateCategoryDto: UpdateCategoryDto) {
    const category = await this.categoryRepository.findOneBy({ id });
    if (!category) {
      throw new NotFoundException(CATEGORY_ERRORS.NOT_FOUND);
    }

    await this.categoryRepository.update(id, {
      name: updateCategoryDto.name ?? category.name,
    });

    const updatedCategory = await this.categoryRepository.findOneBy({ id });
    if (!updatedCategory) {
      throw new NotFoundException(CATEGORY_ERRORS.FAILED_UPDATED);
    }
    return this.categoryMapper.toDto(updatedCategory);
  }

  async remove(id: string) {
    const category = await this.categoryRepository.findOneBy({ id });
    if (!category) {
      throw new NotFoundException(CATEGORY_ERRORS.NOT_FOUND);
    }
    const result = await this.categoryRepository.remove(category);
    if (!result) {
      throw new NotFoundException(CATEGORY_ERRORS.FAILED_DELETED);
    }
    return this.categoryMapper.toDto(result);
  }
}
