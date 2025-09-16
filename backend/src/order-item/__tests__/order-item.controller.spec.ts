import { Test, TestingModule } from '@nestjs/testing';
import { OrderItemController } from '../order-item.controller';
import { OrderItemService } from '../order-item.service';

const orderItemServiceMock = {
  create: jest.fn(),
  findAll: jest.fn(),
  findOne: jest.fn(),
  update: jest.fn(),
  remove: jest.fn(),
};

describe('OrderItemController', () => {
  let controller: OrderItemController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrderItemController],
      providers: [
        { provide: OrderItemService, useValue: orderItemServiceMock },
      ],
    }).compile();

    controller = module.get<OrderItemController>(OrderItemController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
