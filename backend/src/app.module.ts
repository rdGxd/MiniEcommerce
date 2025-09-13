import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        host: config.get('DB_HOST'),
        port: Number(config.get('DB_PORT') || 5432),
        username: config.get('DB_USERNAME'),
        password: config.get('DB_PASSWORD'),
        database: config.get('DB_DATABASE'),
        autoLoadEntities: config.get<boolean>('DB_AUTOLOAD_ENTITIES'),
        synchronize: config.get<boolean>('DB_SYNCHRONIZE'), // Nunca usar true em produção
        migrations: ['src/migrations/*{.ts,.js}'],
      }),
    }),
    UserModule,
  ],
  providers: [],
  controllers: [],
  exports: [],
})
export class AppModule {}
