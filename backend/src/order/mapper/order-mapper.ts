import { Injectable } from '@nestjs/common';

import { User } from '../../user/entities/user.entity';
import { CreateOrderDto } from '../dto/create-order.dto';
import { ResponseOrderDto } from '../dto/response-order.dto';
import { Order } from '../entities/order.entity';

@Injectable()
export class OrderMapper {
  toEntity(dto: CreateOrderDto) {
    const order = new Order();

    const user = new User();
    user.id = dto.userId;

    order.user = user;

    return order;
  }

  toDto(entity: Order) {
    const dto = new ResponseOrderDto();
    dto.id = entity.id;
    dto.userId = entity.user.id;
    dto.total = entity.total;
    dto.status = entity.status;
    dto.createdAt = entity.createdAt;
    dto.updatedAt = entity.updatedAt;
    return dto;
  }
}
