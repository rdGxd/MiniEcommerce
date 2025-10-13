import { BadRequestException, Injectable } from '@nestjs/common';
import { PayloadDto } from 'src/common/dto/payload.dto';
import { PaymentStatus } from 'src/common/enums/payment-enums';
import { USER_ERRORS } from 'src/constants/user.constants';
import { UserService } from 'src/user/service/user.service';

import { CreatePaymentDto } from '../dto/create-payment.dto';
import { Payment } from '../entities/payment.entity';
import { PaymentMapper } from '../mapper/payment-mapper';
import { PaymentRepositoryContract } from '../repository/contract-payment-repository';

@Injectable()
export class PaymentService {
  constructor(
    private readonly paymentRepository: PaymentRepositoryContract,
    private readonly userService: UserService,
    private readonly paymentMapper: PaymentMapper,
  ) {}

  async create(createPaymentDto: CreatePaymentDto, payload: PayloadDto) {
    const user = await this.userService.findOne(payload.sub);
    if (!user) {
      throw new BadRequestException(USER_ERRORS.NOT_FOUND);
    }

    // Simulação do processamento do pagamento
    const statuses = Object.values(PaymentStatus);
    const status = statuses[Math.floor(Math.random() * statuses.length)];

    const payment = new Payment();
    Object.assign(payment, {
      ...createPaymentDto,
      user: { id: payload.sub },
      status,
    });

    const savedPayment = await this.paymentRepository.save(payment);
    return this.paymentMapper.toDto(savedPayment);
  }

  async findAll(userId: string): Promise<Payment[]> {
    return this.paymentRepository.find({
      where: { user: { id: userId } },
      order: { createdAt: 'DESC' },
    });
  }
}
