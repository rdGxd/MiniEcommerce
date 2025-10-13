import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  FindManyOptions,
  FindOneOptions,
  FindOptionsWhere,
  Repository,
} from 'typeorm';

import { User } from '../entities/user.entity';
import { UserRepositoryContract } from './contract-user-repository';

@Injectable()
export class UserRepository extends UserRepositoryContract {
  constructor(
    @InjectRepository(User) private readonly repository: Repository<User>,
  ) {
    super();
  }

  async save(user: Partial<User> | User): Promise<User> {
    return await this.repository.save(user);
  }

  async find(options?: FindManyOptions<User>): Promise<User[]> {
    return await this.repository.find(options);
  }

  async findOne(options: FindOneOptions<User>): Promise<User | null> {
    return await this.repository.findOne(options);
  }

  async findOneBy(criteria: FindOptionsWhere<User>): Promise<User | null> {
    return await this.repository.findOneBy(criteria);
  }

  async findAndCount(
    options: FindManyOptions<User>,
  ): Promise<[User[], number]> {
    return await this.repository.findAndCount(options);
  }

  async remove(user: User): Promise<User> {
    return await this.repository.remove(user);
  }

  async update(id: string, user: Partial<User>): Promise<void> {
    await this.repository.update(id, user);
  }
}
