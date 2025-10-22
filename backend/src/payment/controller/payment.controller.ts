import { Body, Controller, Get, Post } from '@nestjs/common';
import { TokenPayloadParam } from 'src/common/decorators/token-payload.decorator';
import { PayloadDto } from 'src/common/dto/payload.dto';

import { CreatePaymentDto } from '../dto/create-payment.dto';
import { PaymentService } from '../service/payment.service';

@Controller('payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Post()
  create(
    @Body() createPaymentDto: CreatePaymentDto,
    @TokenPayloadParam() payload: PayloadDto,
  ) {
    console.log(payload);
    return this.paymentService.create(createPaymentDto, payload);
  }

  @Get()
  findAll(@TokenPayloadParam() payload: PayloadDto) {
    return this.paymentService.findAll(payload.sub);
  }
}
