import { ROUTE_POLICY_KEY } from '@/auth/constants/route.constants';
import { UserRoles } from '@/user/enums/roles.enum';
import { CustomDecorator, SetMetadata } from '@nestjs/common';

export const SetRoutePolicy = (
  ...args: UserRoles[]
): CustomDecorator<string> => {
  return SetMetadata(ROUTE_POLICY_KEY, args);
};
