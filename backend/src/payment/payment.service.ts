import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PayloadDto } from 'src/common/dto/payload.dto';
import { PaymentStatus } from 'src/common/enums/payment-enums';
import { USER_ERRORS } from 'src/constants/user.constants';
import { UserService } from 'src/user/user.service';
import { Repository } from 'typeorm';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { Payment } from './entities/payment.entity';
import { PaymentMapper } from './mapper/payment-mapper';

@Injectable()
export class PaymentService {
  constructor(
    @InjectRepository(Payment)
    private readonly paymentRepository: Repository<Payment>,
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

    const payment = this.paymentRepository.create({
      ...createPaymentDto,
      user: { id: payload.sub },
      status,
    });

    return this.paymentMapper.toDto(payment);
  }

  async findAll(userId: string): Promise<Payment[]> {
    return this.paymentRepository.find({
      where: { user: { id: userId } },
      order: { createdAt: 'DESC' },
    });
  }
}
