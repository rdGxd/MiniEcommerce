import { AuthController } from '@/auth/auth.controller';
import { AuthService } from '@/auth/auth.service';
import { AuthAndPolicyGuard } from '@/auth/guards/auth-and-policy.guard';
import { AuthGuard } from '@/auth/guards/auth.guard';
import { RolesGuard } from '@/auth/guards/roles-guard.guard';
import { jwtConfig } from '@/common/config/jwt-config';
import { HashingModule } from '@/common/hashing/hashing.module';
import { UserModule } from '@/user/user.module';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';

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
