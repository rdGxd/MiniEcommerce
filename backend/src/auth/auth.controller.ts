import { AuthService } from '@/auth/auth.service';
import { LoginAuthDto } from '@/auth/dto/login-auth.dto';
import { RefreshTokenDto } from '@/auth/dto/refresh-token.dto';
import { ResponseTokenDto } from '@/auth/dto/response-token.dto';
import { TokenPayloadParam } from '@/common/decorators/token-payload.decorator';
import { PayloadDto } from '@/common/dto/payload.dto';
import { CreateUserDto } from '@/user/dto/create-user.dto';
import { ResponseUserDto } from '@/user/dto/response-user.dto';
import { Body, Controller, Get, Post } from '@nestjs/common';
import { Public } from './decorators/set-is-public-policy.decorator';

@Controller('auth')
@Public()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  create(@Body() dto: LoginAuthDto): Promise<ResponseTokenDto> {
    return this.authService.login(dto);
  }

  @Post('register')
  register(@Body() dto: CreateUserDto): Promise<ResponseUserDto> {
    return this.authService.register(dto);
  }

  @Get('refresh')
  refresh(@Body() dto: RefreshTokenDto): Promise<ResponseTokenDto> {
    return this.authService.refreshToken(dto);
  }

  @Get('profile')
  profile(
    @TokenPayloadParam() tokenPayload: PayloadDto,
  ): Promise<ResponseUserDto> {
    return this.authService.getProfile(tokenPayload);
  }
}
