import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { OrderStatus } from '../../common/enums/order-enum';
import { OrderItem } from '../../order-item/entities/order-item.entity';
import { User } from '../../user/entities/user.entity';

@Entity()
export class Order {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, user => user.orders, {
    eager: true,
    onDelete: 'CASCADE',
  })
  user: User;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  total: number;

  @Column({
    type: 'enum',
    enum: OrderStatus,
    default: OrderStatus.PENDING,
  })
  status: OrderStatus;

  @OneToMany(() => OrderItem, orderItem => orderItem.order, {
    cascade: true,
    eager: true,
  })
  orderItems: OrderItem[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @BeforeInsert()
  @BeforeUpdate()
  calculateTotal(): void {
    if (this.orderItems && this.orderItems.length > 0) {
      this.total = this.orderItems.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0,
      );
    }
  }

  addItem(item: OrderItem): void {
    if (!this.orderItems) {
      this.orderItems = [];
    }
    this.orderItems.push(item);
    this.calculateTotal();
  }

  removeItem(item: OrderItem): void {
    if (this.orderItems) {
      this.orderItems = this.orderItems.filter(i => i.id !== item.id);
      this.calculateTotal();
    }
  }

  clearItems(): void {
    this.orderItems = [];
    this.total = 0;
  }

  updateQuantity(item: OrderItem, quantity: number): void {
    const orderItem = this.orderItems.find(i => i.id === item.id);
    if (orderItem) {
      orderItem.quantity = quantity;
      this.calculateTotal();
    }
  }
}
