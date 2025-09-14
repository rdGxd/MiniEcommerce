import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { HashingProtocol } from 'src/common/hashing/hashing-protocol';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { ResponseUserDto } from './dto/response-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { UserMapper } from './mapper/user-mapper';

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
    await this.userRepository.save(user);
    return this.userMapper.toDto(user);
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
  async findByEmail(email: string): Promise<User | null> {
    return await this.userRepository.findOneBy({ email });
  }

  async findEntityById(id: string): Promise<User | null> {
    return await this.userRepository.findOneBy({ id });
  }
}
