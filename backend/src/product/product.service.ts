import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PRODUCT_ERRORS } from 'src/constants/product.constants';
import { Repository } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
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
    if (!savedProduct) {
      throw new BadRequestException(PRODUCT_ERRORS.CREATION_FAILED);
    }
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
    product.name = updateProductDto.name ?? product.name;
    product.description = updateProductDto.description ?? product.description;
    product.price = updateProductDto.price ?? product.price;
    product.stock = updateProductDto.stock ?? product.stock;
    product.imageUrl = updateProductDto.imageUrl ?? product.imageUrl;

    const updatedProduct = await this.productRepository.save(product);
    if (!updatedProduct) {
      throw new BadRequestException(PRODUCT_ERRORS.UPDATE_FAILED);
    }
    return this.productMapper.toDto(updatedProduct);
  }

  async remove(id: string) {
    const product = await this.productRepository.findOneBy({ id: id });
    if (!product) {
      throw new NotFoundException(PRODUCT_ERRORS.NOT_FOUND);
    }
    const result = await this.productRepository.remove(product);
    if (!result) {
      throw new BadRequestException(PRODUCT_ERRORS.DELETION_FAILED);
    }
    return this.productMapper.toDto(result);
  }
}
