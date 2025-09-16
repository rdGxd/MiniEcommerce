import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { TokenPayloadParam } from 'src/common/decorators/token-payload.decorator';
import { PayloadDto } from 'src/common/dto/payload.dto';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
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

  @Post(':id/notify')
  sendPaymentNotification(
    @Param('id') id: string,
    @TokenPayloadParam() payload: PayloadDto,
  ) {
    return this.paymentService.sendPaymentNotification(id, payload);
  }

  @Get()
  findAll(@TokenPayloadParam() payload: PayloadDto) {
    return this.paymentService.findAll(payload);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @TokenPayloadParam() payload: PayloadDto) {
    return this.paymentService.findOne(id, payload);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updatePaymentDto: UpdatePaymentDto,
    @TokenPayloadParam() payload: PayloadDto,
  ) {
    return this.paymentService.update(id, updatePaymentDto, payload);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @TokenPayloadParam() payload: PayloadDto) {
    return this.paymentService.remove(id, payload);
  }
}
