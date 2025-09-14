import { HashingModule } from '@/common/hashing/hashing.module';
import { User } from '@/user/entities/user.entity';
import { UserMapper } from '@/user/mapper/user-mapper';
import { UserController } from '@/user/user.controller';
import { UserService } from '@/user/user.service';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([User]), HashingModule],
  controllers: [UserController],
  providers: [UserService, UserMapper],
  exports: [UserService],
})
export class UserModule {}
