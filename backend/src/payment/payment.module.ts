import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from 'src/user/user.module';
import { Payment } from './entities/payment.entity';
import { PaymentMapper } from './mapper/payment-mapper';
import { PaymentController } from './payment.controller';
import { PaymentService } from './payment.service';

@Module({
  imports: [TypeOrmModule.forFeature([Payment]), UserModule],
  controllers: [PaymentController],
  providers: [PaymentService, PaymentMapper],
  exports: [PaymentService],
})
export class PaymentModule {}
