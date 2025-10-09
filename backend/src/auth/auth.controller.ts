import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { TokenPayloadParam } from '../common/decorators/token-payload.decorator';
import { PayloadDto } from '../common/dto/payload.dto';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { ResponseUserDto } from '../user/dto/response-user.dto';
import { AuthService } from './auth.service';
import { Public } from './decorators/set-is-public-policy.decorator';
import { LoginAuthDto } from './dto/login-auth.dto';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { ResponseTokenDto } from './dto/response-token.dto';

@Controller('auth')
@Public()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  create(@Body() dto: LoginAuthDto): Promise<ResponseTokenDto> {
    return this.authService.login(dto);
  }

  @HttpCode(HttpStatus.CREATED)
  @Post('register')
  register(@Body() dto: CreateUserDto): Promise<ResponseUserDto> {
    return this.authService.register(dto);
  }

  @HttpCode(HttpStatus.OK)
  @Get('refresh')
  refresh(@Body() dto: RefreshTokenDto): Promise<ResponseTokenDto> {
    return this.authService.refreshToken(dto);
  }

  @HttpCode(HttpStatus.OK)
  @Get('profile')
  profile(
    @TokenPayloadParam() tokenPayload: PayloadDto,
  ): Promise<ResponseUserDto> {
    return this.authService.getProfile(tokenPayload);
  }
}
