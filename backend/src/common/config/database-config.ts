import { registerAs } from '@nestjs/config';
import 'dotenv/config';

export default registerAs('database', () => ({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT || 5432),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  autoLoadEntities: Boolean(process.env.DB_AUTOLOAD_ENTITIES),
  synchronize: Boolean(process.env.DB_SYNCHRONIZE), // * SEMPRE COLOCAR COMO FALSE EM PRODUÇÃO
  migrations: ['dist/src/database/migrations/*{.ts,.js}'],
}));
