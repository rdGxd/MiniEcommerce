import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PayloadDto } from 'src/common/dto/payload.dto';
import { UserService } from 'src/user/user.service';
import { Repository } from 'typeorm';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
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
    const paymentEntity = this.paymentMapper.toEntity(
      createPaymentDto,
      user.id,
    );

    const savedPayment = await this.paymentRepository.save(paymentEntity);
    if (!savedPayment) {
      throw new BadRequestException('Payment could not be processed');
    }

    return this.paymentMapper.toDto(savedPayment);
  }

  findAll() {
    return `This action returns all payment`;
  }

  findOne(id: number) {
    return `This action returns a #${id} payment`;
  }

  update(id: number, updatePaymentDto: UpdatePaymentDto) {
    return `This action updates a #${id} payment`;
  }

  remove(id: number) {
    return `This action removes a #${id} payment`;
  }
}
