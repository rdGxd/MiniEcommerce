import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';

import { jwtConfig } from '../common/config/jwt-config';
import { HashingModule } from '../common/hashing/hashing.module';
import { UserModule } from '../user/user.module';
import { AuthController } from './controller/auth.controller';
import { AuthAndPolicyGuard } from './guards/auth-and-policy.guard';
import { AuthGuard } from './guards/auth.guard';
import { RolesGuard } from './guards/roles-guard.guard';
import { AuthService } from './service/auth.service';

@Module({
  controllers: [AuthController],
  providers: [AuthService, AuthGuard, RolesGuard, AuthAndPolicyGuard],
  imports: [
    UserModule,
    ConfigModule.forFeature(jwtConfig),
    JwtModule.registerAsync(jwtConfig.asProvider()),
    HashingModule,
  ],
  exports: [AuthService, AuthGuard, RolesGuard, AuthAndPolicyGuard, JwtModule],
})
export class AuthModule {}
