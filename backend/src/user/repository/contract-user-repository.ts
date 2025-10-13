import { FindManyOptions, FindOneOptions, FindOptionsWhere } from 'typeorm';

import { User } from '../entities/user.entity';

export abstract class UserRepositoryContract {
  abstract save(user: Partial<User> | User): Promise<User>;
  abstract find(options?: FindManyOptions<User>): Promise<User[]>;
  abstract findOne(options: FindOneOptions<User>): Promise<User | null>;
  abstract findOneBy(criteria: FindOptionsWhere<User>): Promise<User | null>;
  abstract findAndCount(
    options: FindManyOptions<User>,
  ): Promise<[User[], number]>;
  abstract remove(user: User): Promise<User>;
  abstract update(id: string, user: Partial<User>): Promise<void>;
}
