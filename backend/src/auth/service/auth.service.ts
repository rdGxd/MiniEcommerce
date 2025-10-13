import {
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import type { ConfigType } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

import { jwtConfig } from '../../common/config/jwt-config';
import { PayloadDto } from '../../common/dto/payload.dto';
import { HashingProtocol } from '../../common/hashing/hashing-protocol';
import { USER_ERRORS } from '../../constants/user.constants';
import { CreateUserDto } from '../../user/dto/create-user.dto';
import { User } from '../../user/entities/user.entity';
import { UserService } from '../../user/service/user.service';
import { LoginAuthDto } from '../dto/login-auth.dto';
import { RefreshTokenDto } from '../dto/refresh-token.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly hashingService: HashingProtocol,
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    @Inject(jwtConfig.KEY)
    private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,
  ) {}

  async login(dto: LoginAuthDto) {
    const user = await this.userService.findUserByEmailAddress(dto.email);

    if (!user) {
      throw new NotFoundException(USER_ERRORS.NOT_FOUND);
    }

    const isValidPassword = await this.hashingService.compare(
      dto.password,
      user.password,
    );

    if (!isValidPassword) {
      throw new UnauthorizedException(USER_ERRORS.INVALID_CREDENTIALS);
    }
    return await this.generateToken(user);
  }

  async register(dto: CreateUserDto) {
    return await this.userService.create(dto);
  }

  async getProfile(tokenPayload: PayloadDto) {
    return await this.userService.findOne(tokenPayload.sub);
  }

  async refreshToken(refreshTokenDto: RefreshTokenDto) {
    try {
      const { sub } = await this.jwtService.verifyAsync<{ sub: string }>(
        refreshTokenDto.refreshToken,
        {
          secret: this.jwtConfiguration.secret,
          audience: this.jwtConfiguration.signOptions.audience,
          issuer: this.jwtConfiguration.signOptions.issuer,
        },
      );

      if (!sub) {
        throw new UnauthorizedException(USER_ERRORS.INVALID_CREDENTIALS);
      }

      const user = await this.userService.findUserById(sub);
      if (!user) {
        throw new NotFoundException(USER_ERRORS.NOT_FOUND);
      }

      return await this.generateToken(user);
    } catch (error) {
      console.error('Refresh token error', error);
      throw new UnauthorizedException(USER_ERRORS.INVALID_CREDENTIALS);
    }
  }

  async generateToken(user: User) {
    const accessTokenPromise = this.signJwtAsync(
      user,
      this.jwtConfiguration.signOptions.expiresIn,
    );

    const refreshTokenPromise = this.signJwtAsync(
      user,
      this.jwtConfiguration.refreshTokenExpiresIn,
    );

    const [accessToken, refreshToken] = await Promise.all([
      accessTokenPromise,
      refreshTokenPromise,
    ]);

    return {
      id: user.id,
      email: user.email,
      name: user.name,
      accessToken,
      refreshToken,
      expiresIn: this.jwtConfiguration.signOptions.expiresIn,
      refreshTokenExpiresIn: this.jwtConfiguration.refreshTokenExpiresIn,
    };
  }

  private async signJwtAsync(user: User, expiresIn: number) {
    return await this.jwtService.signAsync(
      { sub: user.id, roles: user.role },
      {
        secret: this.jwtConfiguration.secret,
        audience: this.jwtConfiguration.signOptions.audience,
        issuer: this.jwtConfiguration.signOptions.issuer,
        expiresIn,
      },
    );
  }
}
