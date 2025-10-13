import { Injectable } from '@nestjs/common';
import { User } from 'src/user/entities/user.entity';

import { CreatePaymentDto } from '../dto/create-payment.dto';
import { ResponsePaymentDto } from '../dto/response-payment.dto';
import { Payment } from '../entities/payment.entity';

@Injectable()
export class PaymentMapper {
  toEntity(dto: CreatePaymentDto, userId: string) {
    const payment = new Payment();
    payment.amount = dto.amount;
    payment.currency = dto.currency;

    const user = new User();
    user.id = userId;

    payment.user = user;
    return payment;
  }

  toDto(entity: Payment) {
    const dto = new ResponsePaymentDto();
    dto.id = entity.id;
    dto.amount = entity.amount;
    dto.currency = entity.currency;
    dto.userId = entity.user.id;
    dto.createdAt = entity.createdAt;
    dto.updatedAt = entity.updatedAt;
    return dto;
  }
}
