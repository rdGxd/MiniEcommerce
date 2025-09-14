import { CreateUserDto } from '@/user/dto/create-user.dto';
import { ResponseUserDto } from '@/user/dto/response-user.dto';
import { User } from '@/user/entities/user.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserMapper {
  toDto(entity: User): ResponseUserDto {
    const dto = new ResponseUserDto();
    dto.id = entity.id;
    dto.name = entity.name;
    dto.email = entity.email;
    dto.role = entity.role;
    return dto;
  }

  toEntity(dto: CreateUserDto): User {
    const entity = new User();
    entity.name = dto.name;
    entity.email = dto.email;
    entity.password = dto.password;
    return entity;
  }
}
