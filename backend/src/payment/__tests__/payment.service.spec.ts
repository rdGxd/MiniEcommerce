import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UserService } from 'src/user/service/user.service';
import { Payment } from '../entities/payment.entity';
import { PaymentMapper } from '../mapper/payment-mapper';
import { PaymentService } from '../payment.service';

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
const userServiceMock = {
  findUserById: jest.fn(),
};

describe('PaymentService', () => {
  let service: PaymentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PaymentService,
        { provide: getRepositoryToken(Payment), useValue: repositoryMock },
        { provide: PaymentMapper, useValue: mapperMock },
        { provide: UserService, useValue: userServiceMock },
      ],
    }).compile();

    service = module.get<PaymentService>(PaymentService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
