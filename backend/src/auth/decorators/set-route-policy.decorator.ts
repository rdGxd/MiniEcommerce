import { CustomDecorator, SetMetadata } from '@nestjs/common';
import { ROUTE_POLICY_KEY } from '../../constants/route.constants';
import { UserRoles } from '../../user/enums/roles.enum';

export const SetRoutePolicy = (
  ...args: UserRoles[]
): CustomDecorator<string> => {
  return SetMetadata(ROUTE_POLICY_KEY, args);
};
