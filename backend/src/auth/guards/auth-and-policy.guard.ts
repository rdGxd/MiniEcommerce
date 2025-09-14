import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { IS_PUBLIC_KEY } from '../constants/public.constants';
import { AuthGuard } from './auth.guard';
import { RolesGuard } from './roles-guard.guard';

@Injectable()
export class AuthAndPolicyGuard implements CanActivate {
  constructor(
    private readonly authGuard: AuthGuard,
    private readonly rolesGuard: RolesGuard,
    private readonly reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) return true;

    const isAuthValid = await this.authGuard.canActivate(context);
    if (!isAuthValid) return false;

    return this.rolesGuard.canActivate(context);
  }
}
