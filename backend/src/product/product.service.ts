import { PRODUCT_ERRORS } from '@/constants/product.constants';
import { CreateProductDto } from '@/product/dto/create-product.dto';
import { UpdateProductDto } from '@/product/dto/update-product.dto';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { ProductMapper } from './mapper/product-mapper';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    private readonly productMapper: ProductMapper,
  ) {}

  async create(createProductDto: CreateProductDto) {
    const product = this.productMapper.toEntity(createProductDto);
    const savedProduct = await this.productRepository.save(product);
    return this.productMapper.toDto(savedProduct);
  }

  async findAll() {
    const products = await this.productRepository.find({
      relations: ['categories'],
    });
    return products.map(prod => this.productMapper.toDto(prod));
  }

  async findOne(id: string) {
    const product = await this.productRepository.findOne({
      where: { id: id },
      relations: ['categories'],
    });

    if (!product) {
      throw new NotFoundException(PRODUCT_ERRORS.NOT_FOUND);
    }

    return this.productMapper.toDto(product);
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    const product = await this.productRepository.findOne({ where: { id: id } });
    if (!product) {
      throw new NotFoundException(PRODUCT_ERRORS.NOT_FOUND);
    }
    this.productRepository.merge(product, updateProductDto);
    await this.productRepository.save(product);
    return this.productMapper.toDto(product);
  }

  async remove(id: string) {
    const product = await this.productRepository.findOneBy({ id: id });
    if (!product) {
      throw new NotFoundException(PRODUCT_ERRORS.NOT_FOUND);
    }
    await this.productRepository.remove(product);
  }
}
