import { Order } from '@/order/entities/order.entity';
import { Product } from '@/product/entities/product.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class OrderItem {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Order, order => order.orderItems, {
    onDelete: 'CASCADE',
    eager: false,
  })
  order: Order;

  @ManyToOne(() => Product, product => product.orderItems, {
    onDelete: 'CASCADE',
    eager: false,
  })
  product: Product;

  @Column()
  quantity: number;

  @Column()
  price: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  total() {
    return this.quantity * this.price;
  }
}
