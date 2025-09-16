import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PayloadDto } from 'src/common/dto/payload.dto';
import { PAYMENT_ERRORS } from 'src/constants/payment.constants';
import { USER_ERRORS } from 'src/constants/user.constants';
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
    if (!user) {
      throw new BadRequestException(USER_ERRORS.NOT_FOUND);
    }

    const paymentEntity = this.paymentMapper.toEntity(
      createPaymentDto,
      user.id,
    );

    const savedPayment = await this.paymentRepository.save(paymentEntity);

    if (!savedPayment) {
      throw new BadRequestException(PAYMENT_ERRORS.PROCESSING_ERROR);
    }

    return this.paymentMapper.toDto(savedPayment);
  }

  async findAll(payload: PayloadDto) {
    const payments = await this.paymentRepository.find({
      where: { user: { id: payload.sub } },
    });

    if (payments.length === 0) {
      throw new BadRequestException(PAYMENT_ERRORS.NOT_FOUND);
    }

    return payments.map(payment => this.paymentMapper.toDto(payment));
  }

  async findOne(id: string, payload: PayloadDto) {
    const payment = await this.paymentRepository.findOne({
      where: { id, user: { id: payload.sub } },
    });
    if (!payment) {
      throw new BadRequestException(PAYMENT_ERRORS.NOT_FOUND);
    }
    return this.paymentMapper.toDto(payment);
  }

  async update(
    id: string,
    updatePaymentDto: UpdatePaymentDto,
    payload: PayloadDto,
  ) {
    const payment = await this.paymentRepository.findOne({
      where: { id, user: { id: payload.sub } },
    });
    if (!payment) {
      throw new BadRequestException(PAYMENT_ERRORS.NOT_FOUND);
    }

    payment.amount = updatePaymentDto.amount ?? payment.amount;
    payment.currency = updatePaymentDto.currency ?? payment.currency;
    payment.method = updatePaymentDto.method ?? payment.method;

    const updatedPayment = await this.paymentRepository.save(payment);
    if (!updatedPayment) {
      throw new BadRequestException(PAYMENT_ERRORS.PROCESSING_ERROR);
    }
    return this.paymentMapper.toDto(updatedPayment);
  }

  async remove(id: string, payload: PayloadDto) {
    const payment = await this.paymentRepository.findOne({
      where: { id, user: { id: payload.sub } },
    });
    if (!payment) {
      throw new BadRequestException(PAYMENT_ERRORS.NOT_FOUND);
    }

    const removedPayment = await this.paymentRepository.remove(payment);
    if (!removedPayment) {
      throw new BadRequestException(PAYMENT_ERRORS.PROCESSING_ERROR);
    }

    return this.paymentMapper.toDto(removedPayment);
  }

  async sendPaymentNotification(id: string, payload: PayloadDto) {
    const payment = await this.paymentRepository.findOne({
      where: { id, user: { id: payload.sub } },
    });

    if (!payment) {
      throw new BadRequestException(PAYMENT_ERRORS.NOT_FOUND);
    }

    // Logic to send payment notification (e.g., email, SMS)
    return {
      message: `Notification sent for payment ID: ${payment.id} completed successfully`,
      payment: this.paymentMapper.toDto(payment),
    };
  }
}
