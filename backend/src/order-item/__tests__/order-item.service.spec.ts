import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';

import { OrderItem } from '../entities/order-item.entity';
import { OrderItemMapper } from '../mapper/order-item-mapper';
import { OrderItemService } from '../service/order-item.service';

const repositoryMock = {
  find: jest.fn(),
  findOne: jest.fn(),
  save: jest.fn(),
  remove: jest.fn(),
};
const mapperMock = {
  toEntity: jest.fn(),
  toDto: jest.fn(),
};

describe('OrderItemService', () => {
  let service: OrderItemService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OrderItemService,
        { provide: getRepositoryToken(OrderItem), useValue: repositoryMock },
        { provide: OrderItemMapper, useValue: mapperMock },
      ],
    }).compile();

    service = module.get<OrderItemService>(OrderItemService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
