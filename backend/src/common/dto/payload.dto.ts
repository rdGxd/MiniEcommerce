import { IsEnum, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { UserRoles } from 'src/common/enums/role.enum';

export class PayloadDto {
  @IsString()
  @IsNotEmpty({ message: 'Subject is required' })
  sub: string;
  @IsString()
  @IsNotEmpty({ message: 'Email is required' })
  email: string;
  @IsEnum(UserRoles, { each: true })
  @IsNotEmpty({ message: 'Roles are required' })
  roles: UserRoles[];
  @IsNumber()
  @IsNotEmpty({ message: 'Issued at is required' })
  iat: number;
  @IsNumber()
  @IsNotEmpty({ message: 'Expiration is required' })
  exp: number;
  @IsString()
  @IsNotEmpty({ message: 'Audience is required' })
  aud: string;
  @IsString()
  @IsNotEmpty({ message: 'Issuer is required' })
  iss: string;
}
