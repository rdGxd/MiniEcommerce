import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ORDER_ERRORS } from '../constants/order.constants';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Order } from './entities/order.entity';
import { OrderMapper } from './mapper/order-mapper';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
    private readonly orderMapper: OrderMapper,
  ) {}

  async create(createOrderDto: CreateOrderDto) {
    const order = this.orderMapper.toEntity(createOrderDto);
    const savedOrder = await this.orderRepository.save(order);

    if (!savedOrder) {
      throw new BadRequestException(ORDER_ERRORS.ORDER_CREATION_FAILED);
    }
    return this.orderMapper.toDto(savedOrder);
  }

  async findAll() {
    const getAllOrders = await this.orderRepository.find({
      relations: ['user'],
    });

    if (!getAllOrders) {
      throw new NotFoundException(ORDER_ERRORS.ORDER_NOT_FOUND);
    }

    return getAllOrders.map(order => this.orderMapper.toDto(order));
  }

  async findOne(id: string) {
    const order = await this.orderRepository.findOne({
      where: { id },
      relations: ['user'],
    });

    if (!order) {
      throw new NotFoundException(ORDER_ERRORS.ORDER_NOT_FOUND);
    }

    return this.orderMapper.toDto(order);
  }

  async update(id: string, updateOrderDto: UpdateOrderDto) {
    const order = await this.orderRepository.findOne({ where: { id } });
    if (!order) {
      throw new NotFoundException(ORDER_ERRORS.ORDER_NOT_FOUND);
    }

    order.total = updateOrderDto.total ?? order.total;
    order.status = updateOrderDto.status ?? order.status;

    const savedOrder = await this.orderRepository.save(order);
    if (!savedOrder) {
      throw new BadRequestException(ORDER_ERRORS.ORDER_UPDATE_FAILED);
    }
    return this.orderMapper.toDto(savedOrder);
  }

  async remove(id: string) {
    const order = await this.orderRepository.findOne({ where: { id } });
    if (!order) {
      throw new NotFoundException(ORDER_ERRORS.ORDER_NOT_FOUND);
    }

    const deletedOrder = await this.orderRepository.remove(order);
    if (!deletedOrder) {
      throw new BadRequestException(ORDER_ERRORS.ORDER_DELETION_FAILED);
    }
    return this.orderMapper.toDto(deletedOrder);
  }
}
