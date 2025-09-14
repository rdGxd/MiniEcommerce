import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HashingModule } from 'src/common/hashing/hashing.module';
import { User } from './entities/user.entity';
import { UserMapper } from './mapper/user-mapper';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [TypeOrmModule.forFeature([User]), HashingModule],
  controllers: [UserController],
  providers: [UserService, UserMapper],
  exports: [UserService],
})
export class UserModule {}
