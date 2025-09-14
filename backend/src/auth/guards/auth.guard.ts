import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import type { ConfigType } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { jwtConfig } from 'src/common/config/jwt-config';
import { UserService } from 'src/user/user.service';
import { REQUEST_TOKEN_PAYLOAD_KEY } from '../constants/auth.constants';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    @Inject(jwtConfig.KEY)
    private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: Request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);

    if (!token) {
      throw new UnauthorizedException('Token não encontrado');
    }

    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: this.jwtConfiguration.secret,
        audience: this.jwtConfiguration.signOptions.audience,
        issuer: this.jwtConfiguration.signOptions.issuer,
      });

      const user = await this.userService.findOne(payload.sub);

      if (!user) {
        throw new NotFoundException('Usuário não encontrado');
      }

      payload['roles'] = [user.role];
      request[REQUEST_TOKEN_PAYLOAD_KEY] = payload;
    } catch (error) {
      if (error.name === 'TokenExpiredError') {
        throw new UnauthorizedException('Token expirado');
      }
      throw new UnauthorizedException('Token inválido ou expirado');
    }
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const authHeader = request.headers.authorization;
    if (!authHeader) return undefined;
    const [type, token] = authHeader.split(' ');
    return type === 'Bearer' ? token : undefined;
  }
}
