import { Category } from '@/category/entities/category.entity';
import { BaseEntityProps } from '@/common/interfaces/base-entity-props';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Product implements BaseEntityProps {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false, unique: true })
  name: string;

  @Column({ nullable: false })
  description: string;

  @Column('decimal')
  price: number;

  @Column()
  stock: number;

  @ManyToMany(type => Category, category => category.products)
  @JoinTable()
  categories: Category[];

  @Column({ nullable: false })
  imageUrl: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
