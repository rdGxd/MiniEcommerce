import { Injectable } from '@nestjs/common';
import { Product } from '../../product/entities/product.entity';
import { CreateOrderItemDto } from '../dto/create-order-item.dto';
import { ResponseOrderItemDto } from '../dto/response-order-item.dto';
import { OrderItem } from '../entities/order-item.entity';

@Injectable()
export class OrderItemMapper {
  toEntity(dto: CreateOrderItemDto) {
    const entity = new OrderItem();
    const product = new Product();
    product.id = dto.productId;

    entity.product = product;
    entity.quantity = dto.quantity;
    entity.price = dto.price;
    return entity;
  }

  toDto(entity: OrderItem) {
    const dto = new ResponseOrderItemDto();
    dto.id = entity.id;
    dto.orderId = entity.order.id;
    dto.productId = entity.product.id;
    dto.quantity = entity.quantity;
    dto.price = entity.price;
    dto.createdAt = entity.createdAt;
    dto.updatedAt = entity.updatedAt;
    return dto;
  }
}
