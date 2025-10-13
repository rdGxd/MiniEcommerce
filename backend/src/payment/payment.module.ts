import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from 'src/user/user.module';

import { PaymentController } from './controller/payment.controller';
import { Payment } from './entities/payment.entity';
import { PaymentMapper } from './mapper/payment-mapper';
import { PaymentRepositoryContract } from './repository/contract-payment-repository';
import { PaymentRepository } from './repository/payment.repository';
import { PaymentService } from './service/payment.service';

@Module({
  imports: [TypeOrmModule.forFeature([Payment]), UserModule],
  controllers: [PaymentController],
  providers: [
    PaymentService,
    PaymentMapper,
    {
      provide: PaymentRepositoryContract,
      useClass: PaymentRepository,
    },
  ],
  exports: [PaymentService],
})
export class PaymentModule {}
