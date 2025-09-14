import {
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import type { ConfigType } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { jwtConfig } from 'src/common/config/jwt-config';
import { PayloadDto } from 'src/common/dto/payload.dto';
import { HashingProtocol } from 'src/common/hashing/hashing-protocol';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { ResponseUserDto } from 'src/user/dto/response-user.dto';
import { User } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';
import { LoginAuthDto } from './dto/login-auth.dto';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { ResponseTokenDto } from './dto/response-token.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly hashingService: HashingProtocol,
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    @Inject(jwtConfig.KEY)
    private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,
  ) {}

  async login(dto: LoginAuthDto): Promise<ResponseTokenDto> {
    const user = await this.userService.findByEmail(dto.email);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const isValidPassword = await this.hashingService.compare(
      dto.password,
      user.password,
    );

    if (!isValidPassword) {
      throw new UnauthorizedException('Invalid credentials');
    }
    return await this.generateToken(user);
  }

  async register(dto: CreateUserDto): Promise<ResponseUserDto> {
    return await this.userService.create(dto);
  }

  async getProfile(tokenPayload: PayloadDto): Promise<ResponseUserDto> {
    return await this.userService.findOne(tokenPayload.sub);
  }

  async refreshToken(
    refreshTokenDto: RefreshTokenDto,
  ): Promise<ResponseTokenDto> {
    try {
      const { sub } = await this.jwtService.verifyAsync(
        refreshTokenDto.refreshToken,
        {
          secret: this.jwtConfiguration.secret,
          audience: this.jwtConfiguration.signOptions.audience,
          issuer: this.jwtConfiguration.signOptions.issuer,
        },
      );

      const user = await this.userService.findEntityById(sub);
      if (!user) {
        throw new NotFoundException('User not found');
      }

      return await this.generateToken(user);
    } catch (error) {
      console.error('Refresh token error', error);
      throw new UnauthorizedException('Invalid refresh token');
    }
  }

  async generateToken(user: User): Promise<ResponseTokenDto> {
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

  private async signJwtAsync(user: User, expiresIn: number): Promise<string> {
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
