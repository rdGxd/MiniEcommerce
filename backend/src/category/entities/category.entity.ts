import { BaseEntityProps } from '@/common/interfaces/base-entity-props';
import { Product } from '@/product/entities/product.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Category implements BaseEntityProps {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false, unique: true })
  name: string;

  @ManyToMany(type => Product, product => product.categories)
  products: Product[];

  @CreateDateColumn()
  createdAt: Date;

  @CreateDateColumn()
  updatedAt: Date;
}
