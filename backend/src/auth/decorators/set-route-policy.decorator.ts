import { CustomDecorator, SetMetadata } from '@nestjs/common';
import { UserRoles } from '../../common/enums/role.enum';
import { ROUTE_POLICY_KEY } from '../../constants/route.constants';

export const SetRoutePolicy = (
  ...args: UserRoles[]
): CustomDecorator<string> => {
  return SetMetadata(ROUTE_POLICY_KEY, args);
};
