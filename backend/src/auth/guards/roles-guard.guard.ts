import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UserRoles } from '../../common/enums/role.enum';
import { REQUEST_TOKEN_PAYLOAD_KEY } from '../../constants/auth.constants';
import { ROUTE_POLICY_KEY } from '../../constants/route.constants';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.get<UserRoles | UserRoles[]>(
      ROUTE_POLICY_KEY,
      context.getHandler(),
    );

    if (!requiredRoles) return true;

    const tokenPayload = context.switchToHttp().getRequest()[
      REQUEST_TOKEN_PAYLOAD_KEY
    ];

    if (!tokenPayload) {
      throw new UnauthorizedException('Token inválido ou expirado');
    }

    // Extrai roles do token
    const userRoles: UserRoles[] = tokenPayload.roles ?? [];

    // Garante que requiredRoles seja sempre um array
    const requiredRolesArray: UserRoles[] = ([] as UserRoles[]).concat(
      requiredRoles,
    );

    // Verifica se o usuário possui pelo menos uma das roles exigidas
    const hasPermission = requiredRolesArray.some(role =>
      userRoles.includes(role),
    );

    if (!hasPermission) {
      throw new UnauthorizedException(
        `Usuário não tem a permissão necessária: ${requiredRolesArray.join(', ')}`,
      );
    }

    return true;
  }
}
