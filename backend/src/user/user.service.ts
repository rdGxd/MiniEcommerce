import { HashingProtocol } from '@/common/hashing/hashing-protocol';
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

  async findAll(): Promise<ResponseUserDto[]> {
    const getAll = await this.userRepository.find();
    return getAll.map(user => this.userMapper.toDto(user));
  }

  async findOne(id: string): Promise<ResponseUserDto> {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) {
      throw new NotFoundException('Usuário nao encontrado');
    }
    return this.userMapper.toDto(user);
  }

  async update(
    id: string,
    updateUserDto: UpdateUserDto,
  ): Promise<ResponseUserDto> {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) {
      throw new NotFoundException('Usuário nao encontrado');
    }

    this.userRepository.merge(user, updateUserDto);
    const userUpdated = await this.userRepository.save(user);

    return this.userMapper.toDto(userUpdated);
  }

  async remove(id: string): Promise<boolean> {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) {
      throw new NotFoundException('Usuário nao encontrado');
    }
    await this.userRepository.delete(id);
    return true;
  }

  // Métodos adicionais para autenticação
  async findUserByEmailAddress(email: string): Promise<User> {
    const user = await this.userRepository.findOneBy({ email });
    if (!user) {
      throw new NotFoundException('Usuário nao encontrado');
    }

    return user;
  }

  async findUserById(id: string): Promise<User> {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) {
      throw new NotFoundException('Usuário nao encontrado');
    }
    return user;
  }
}
