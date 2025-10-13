import 'dotenv/config';

import { DataSource } from 'typeorm';

import { Category } from '../category/entities/category.entity';
import { Order } from '../order/entities/order.entity';
import { OrderItem } from '../order-item/entities/order-item.entity';
import { Payment } from '../payment/entities/payment.entity';
import { Product } from '../product/entities/product.entity';
import { User } from '../user/entities/user.entity';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT || 5432),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: [User, Payment, OrderItem, Category, Product, Order],
  migrations: ['src/database/migrations/*{.ts,.js}'],
  synchronize: false, // Nunca usar true em produção
});
