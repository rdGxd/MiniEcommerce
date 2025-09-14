import { CreateCategoryDto } from '@/category/dto/create-category.dto';
import { UpdateCategoryDto } from '@/category/dto/update-category.dto';
import { CATEGORY_ERRORS } from '@/constants/category.constants';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ResponseCategoryDto } from './dto/response-category.dto';
import { Category } from './entities/category.entity';
import { CategoryMapper } from './mapper/category-mapper';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
    private readonly categoryMapper: CategoryMapper,
  ) {}

  async create(
    createCategoryDto: CreateCategoryDto,
  ): Promise<ResponseCategoryDto> {
    const category = this.categoryMapper.toEntity(createCategoryDto);
    const savedCategory = await this.categoryRepository.save(category);
    return this.categoryMapper.toDto(savedCategory);
  }

  async findAll(): Promise<ResponseCategoryDto[]> {
    const allCategories = await this.categoryRepository.find();
    return allCategories.map(category => this.categoryMapper.toDto(category));
  }

  async findOne(id: string): Promise<ResponseCategoryDto> {
    const category = await this.categoryRepository.findOneBy({ id });
    if (!category) {
      throw new NotFoundException(CATEGORY_ERRORS.NOT_FOUND);
    }
    return this.categoryMapper.toDto(category);
  }

  // TODO: Falta pegar o token do usuário logado para fazer a atualização
  async update(
    id: string,
    updateCategoryDto: UpdateCategoryDto,
  ): Promise<ResponseCategoryDto> {
    const category = await this.categoryRepository.findOneBy({ id });
    if (!category) {
      throw new NotFoundException(CATEGORY_ERRORS.NOT_FOUND);
    }

    const updatedCategory = this.categoryRepository.merge(
      category,
      updateCategoryDto,
    );

    const savedCategory = await this.categoryRepository.save(updatedCategory);
    return this.categoryMapper.toDto(savedCategory);
  }

  // TODO: Falta pegar o token do usuário logado para fazer a atualização
  async remove(id: string): Promise<void> {
    const category = await this.categoryRepository.findOneBy({ id });
    if (!category) {
      throw new NotFoundException(CATEGORY_ERRORS.NOT_FOUND);
    }
    await this.categoryRepository.remove(category);
  }
}
