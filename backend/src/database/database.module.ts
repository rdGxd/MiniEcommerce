import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import databaseConfig from '../common/config/database-config';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule.forFeature(databaseConfig)],
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => ({
        ...(await config.get('database')),
      }),
    }),
  ],
  exports: [TypeOrmModule],
})
export class DatabaseModule {}
