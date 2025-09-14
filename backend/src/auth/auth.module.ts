import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { jwtConfig } from 'src/common/config/jwt-config';
import { HashingModule } from 'src/common/hashing/hashing.module';
import { UserModule } from 'src/user/user.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AuthAndPolicyGuard } from './guards/auth-and-policy.guard';
import { AuthGuard } from './guards/auth.guard';
import { RolesGuard } from './guards/roles-guard.guard';

@Module({
  controllers: [AuthController],
  providers: [AuthService, AuthGuard, RolesGuard, AuthAndPolicyGuard],
  imports: [
    UserModule,
    ConfigModule.forFeature(jwtConfig),
    JwtModule.registerAsync(jwtConfig.asProvider()),
    HashingModule,
  ],
  exports: [AuthService, AuthGuard, AuthAndPolicyGuard, RolesGuard, JwtModule],
})
export class AuthModule {}
