import { UserRoles } from '../../common/enums/role.enum';

export class ResponseUserDto {
  id: string;
  name: string;
  email: string;
  role: UserRoles;
}
