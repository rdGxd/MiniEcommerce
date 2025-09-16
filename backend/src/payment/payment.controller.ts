import { Body, Controller, Post } from '@nestjs/common';
import { TokenPayloadParam } from 'src/common/decorators/token-payload.decorator';
import { PayloadDto } from 'src/common/dto/payload.dto';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { PaymentService } from './payment.service';

@Controller('payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Post()
  create(
    @Body() createPaymentDto: CreatePaymentDto,
    @TokenPayloadParam() payload: PayloadDto,
  ) {
    return this.paymentService.create(createPaymentDto, payload);
  }
}
