import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';

import { Order } from '../entities/order.entity';
import { OrderMapper } from '../mapper/order-mapper';
import { OrderService } from '../service/order.service';

const orderMapperMock = {
  toEntity: jest.fn(),
  toDto: jest.fn(),
};
const repositoryMock = {
  find: jest.fn(),
  findOne: jest.fn(),
  save: jest.fn(),
  remove: jest.fn(),
};

describe('OrderService', () => {
  let service: OrderService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OrderService,
        { provide: getRepositoryToken(Order), useValue: repositoryMock },
        { provide: OrderMapper, useValue: orderMapperMock },
      ],
    }).compile();

    service = module.get<OrderService>(OrderService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
