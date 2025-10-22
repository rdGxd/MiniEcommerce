import { PaymentStatus } from 'src/common/enums/payment-enums';

export class ResponsePaymentDto {
  id: string;
  amount: number;
  currency: string;
  userId: string;
  status: PaymentStatus;
  createdAt: Date;
  updatedAt: Date;
}
