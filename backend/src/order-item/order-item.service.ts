import { ORDER_ITEM_ERRORS } from '@/constants/order-item.constants';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateOrderItemDto } from './dto/create-order-item.dto';
import { UpdateOrderItemDto } from './dto/update-order-item.dto';
import { OrderItem } from './entities/order-item.entity';
import { OrderItemMapper } from './mapper/order-item-mapper';

@Injectable()
export class OrderItemService {
  constructor(
    @InjectRepository(OrderItem)
    private readonly orderItemRepository: Repository<OrderItem>,
    private readonly orderItemMapper: OrderItemMapper,
  ) {}

  async create(createOrderItemDto: CreateOrderItemDto) {
    const orderItem = this.orderItemMapper.toEntity(createOrderItemDto);
    const isSaved = await this.orderItemRepository.save(orderItem);
    if (!isSaved) {
      throw new Error(ORDER_ITEM_ERRORS.CANNOT_CREATE);
    }

    return this.orderItemMapper.toDto(isSaved);
  }

  async findAll() {
    const orderItems = await this.orderItemRepository.find();
    if (!orderItems) {
      throw new NotFoundException(ORDER_ITEM_ERRORS.NOT_FOUND);
    }
    return orderItems.map(item => this.orderItemMapper.toDto(item));
  }

  async findOne(id: string) {
    const orderItem = await this.orderItemRepository.findOneBy({ id });
    if (!orderItem) {
      throw new NotFoundException(ORDER_ITEM_ERRORS.NOT_FOUND);
    }
    return this.orderItemMapper.toDto(orderItem);
  }

  async update(id: string, updateOrderItemDto: UpdateOrderItemDto) {
    const orderItem = await this.orderItemRepository.findOneBy({ id });
    if (!orderItem) {
      throw new NotFoundException(ORDER_ITEM_ERRORS.NOT_FOUND);
    }
    orderItem.quantity = updateOrderItemDto.quantity ?? orderItem.quantity;
    orderItem.price = updateOrderItemDto.price ?? orderItem.price;
    const isUpdated = await this.orderItemRepository.save(orderItem);
    if (!isUpdated) {
      throw new Error(ORDER_ITEM_ERRORS.CANNOT_UPDATE);
    }
    return this.orderItemMapper.toDto(isUpdated);
  }

  async remove(id: string) {
    const orderItem = await this.orderItemRepository.findOneBy({ id });
    if (!orderItem) {
      throw new NotFoundException(ORDER_ITEM_ERRORS.NOT_FOUND);
    }
    await this.orderItemRepository.remove(orderItem);
  }
}
