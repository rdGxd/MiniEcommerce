import { HashingProtocol } from '@/common/hashing/hashing-protocol';
import { PaginatedResult } from '@/common/interfaces/paginated-result';
import { USER_ERRORS } from '@/constants/user.constants';
import { CreateUserDto } from '@/user/dto/create-user.dto';
import { ResponseUserDto } from '@/user/dto/response-user.dto';
import { UpdateUserDto } from '@/user/dto/update-user.dto';
import { User } from '@/user/entities/user.entity';
import { UserMapper } from '@/user/mapper/user-mapper';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly userMapper: UserMapper,
    private readonly hashingService: HashingProtocol,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<ResponseUserDto> {
    const user = this.userMapper.toEntity(createUserDto);
    user.password = await this.hashingService.hash(user.password);
    const savedUser = await this.userRepository.save(user);
    return this.userMapper.toDto(savedUser);
  }

  async findAll(
    page = 1,
    limit = 10,
  ): Promise<PaginatedResult<ResponseUserDto>> {
    const [items, total] = await this.userRepository.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
    });

    return {
      items: items.map(user => this.userMapper.toDto(user)),
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
      hasNext: page * limit < total,
      hasPrevious: page > 1,
    };
  }

  async findOne(id: string): Promise<ResponseUserDto> {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) {
      throw new NotFoundException(USER_ERRORS.NOT_FOUND);
    }
    return this.userMapper.toDto(user);
  }

  async update(
    id: string,
    updateUserDto: UpdateUserDto,
  ): Promise<ResponseUserDto> {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) {
      throw new NotFoundException(USER_ERRORS.NOT_FOUND);
    }

    this.userRepository.merge(user, updateUserDto);
    const userUpdated = await this.userRepository.save(user);

    return this.userMapper.toDto(userUpdated);
  }

  async remove(id: string): Promise<boolean> {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) {
      throw new NotFoundException(USER_ERRORS.NOT_FOUND);
    }
    await this.userRepository.delete(id);
    return true;
  }

  // Métodos adicionais para autenticação
  async findUserByEmailAddress(email: string): Promise<User> {
    const user = await this.userRepository.findOneBy({ email });
    if (!user) {
      throw new NotFoundException(USER_ERRORS.NOT_FOUND);
    }

    return user;
  }

  async findUserById(id: string): Promise<User> {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) {
      throw new NotFoundException(USER_ERRORS.NOT_FOUND);
    }
    return user;
  }
}
