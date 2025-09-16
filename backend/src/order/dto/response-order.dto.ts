import { OrderStatus } from '../../common/enums/order-enum';

export class ResponseOrderDto {
  id: string;
  userId: string;
  total: number;
  status: OrderStatus;
  createdAt: Date;
  updatedAt: Date;
}
