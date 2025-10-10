import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { HashingProtocol } from 'src/common/hashing/hashing-protocol';
import { PaginatedResult } from 'src/common/interfaces/paginated-result';
import { USER_ERRORS } from 'src/constants/user.constants';
import { CreateUserDto } from './dto/create-user.dto';
import { ResponseUserDto } from './dto/response-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserMapper } from './mapper/user-mapper';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly userMapper: UserMapper,
    private readonly hashingService: HashingProtocol,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const user = this.userMapper.toEntity(createUserDto);
    user.password = await this.hashingService.hash(user.password);
    const savedUser = await this.userRepository.save(user);
    if (!savedUser) {
      throw new BadRequestException(USER_ERRORS.DATABASE_ERROR);
    }
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

  async findOne(id: string) {
    const user = await this.userRepository.findById(id);
    if (!user) {
      throw new NotFoundException(USER_ERRORS.NOT_FOUND);
    }
    return this.userMapper.toDto(user);
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.userRepository.findById(id);

    if (!user) {
      throw new NotFoundException(USER_ERRORS.NOT_FOUND);
    }
    user.email = updateUserDto?.email ?? user.email;
    user.role = updateUserDto?.role ?? user.role;

    if (updateUserDto.password) {
      user.password = await this.hashingService.hash(updateUserDto.password);
    }

    const userUpdated = await this.userRepository.save(user);
    if (!userUpdated) {
      throw new BadRequestException(USER_ERRORS.UPDATE_FAILED);
    }

    return this.userMapper.toDto(userUpdated);
  }

  async remove(id: string) {
    const user = await this.userRepository.findById(id);
    if (user === null) {
      throw new NotFoundException(USER_ERRORS.NOT_FOUND);
    }
    const result = await this.userRepository.remove(user);

    if (!result) {
      throw new BadRequestException(USER_ERRORS.DELETION_FAILED);
    }
    return this.userMapper.toDto(result);
  }

  // Métodos adicionais para autenticação
  async findUserByEmailAddress(email: string) {
    const user = await this.userRepository.findByEmail(email);
    if (user === null) {
      throw new NotFoundException(USER_ERRORS.NOT_FOUND);
    }

    return user;
  }

  async findUserById(id: string) {
    const user = await this.userRepository.findById(id);
    if (user === null) {
      throw new NotFoundException(USER_ERRORS.NOT_FOUND);
    }
    return user;
  }
}
