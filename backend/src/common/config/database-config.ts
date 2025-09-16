import { registerAs } from '@nestjs/config';
import 'dotenv/config';
console.log(process.env.DB_HOST);
export default registerAs('database', () => ({
  type: 'postgres',
  host: String(process.env.DB_HOST),
  port: Number(process.env.DB_PORT || 5432),
  username: String(process.env.DB_USERNAME),
  password: String(process.env.DB_PASSWORD),
  database: String(process.env.DB_DATABASE),
  autoLoadEntities: Boolean(process.env.DB_AUTOLOAD_ENTITIES),
  synchronize: Boolean(process.env.DB_SYNCHRONIZE), // * SEMPRE COLOCAR COMO FALSE EM PRODUÇÃO
  migrations: ['dist/src/database/migrations/*{.ts,.js}'],
}));
