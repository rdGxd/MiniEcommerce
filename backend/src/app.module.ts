import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { AuthAndPolicyGuard } from './auth/guards/auth-and-policy.guard';
import { HashingModule } from './common/hashing/hashing.module';
import { UserModule } from './user/user.module';
import { ProductModule } from './product/product.module';
import { CategoryModule } from './category/category.module';

@Module({
  imports: [
    HashingModule,
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
        migrations: ['dist/migrations/*{.ts,.js}'],
      }),
    }),
    UserModule,
    AuthModule,
    ProductModule,
    CategoryModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthAndPolicyGuard,
    },
  ],
  controllers: [],
  exports: [],
})
export class AppModule {}
