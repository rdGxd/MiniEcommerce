import { CreateUserDto } from '@/user/dto/create-user.dto';
import { UserRoles } from '@/user/enums/roles.enum';
import { PartialType } from '@nestjs/mapped-types';
import { IsEnum, IsOptional } from 'class-validator';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @IsOptional()
  @IsEnum(UserRoles)
  role?: UserRoles;
}
