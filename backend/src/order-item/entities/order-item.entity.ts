import { Order } from '@/order/entities/order.entity';
import { Product } from '@/product/entities/product.entity';
import {
  BeforeInsert,
  BeforeUpdate,
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

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  price: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  getTotal(): number {
    return this.quantity * this.price;
  }

  @BeforeInsert()
  @BeforeUpdate()
  validate(): void {
    if (this.quantity < 0) {
      throw new Error('Quantidade deve ser maior ou igual a zero.');
    }

    if (this.price < 0) {
      throw new Error('Preço não pode ser negativo.');
    }
  }
}
