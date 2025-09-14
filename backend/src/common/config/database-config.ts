import { registerAs } from '@nestjs/config';

export default registerAs('database', () => ({
  type: process.env.DB_TYPE,
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT || 5432),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  autoLoadEntities: Boolean(process.env.DB_AUTOLOAD_ENTITIES),
  synchronize: Boolean(process.env.DB_SYNCHRONIZE), // Nunca usar true em produção
  migrations: ['dist/migrations/*{.ts,.js}'],
}));
