import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from '../../user/entities/user.entity';
import { PaymentMethod, PaymentStatus } from '../enums/payment-enums';

@Entity()
export class Payment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, user => user.payments, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  user: User;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  amount: number;

  @Column({ length: 3, nullable: false })
  currency: string;

  @Column({ type: 'enum', enum: PaymentMethod, nullable: false })
  method: PaymentMethod;

  @Column({ type: 'enum', enum: PaymentStatus, nullable: false })
  status: PaymentStatus;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
