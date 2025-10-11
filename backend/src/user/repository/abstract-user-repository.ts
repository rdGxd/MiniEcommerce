import { CreateUserDto } from "../dto/create-user.dto";
import { User } from "../entities/user.entity";

export abstract class UserRepositoryContract {

  abstract save(user: CreateUserDto | Partial<User> | User): Promise<User>;
  abstract findAll(): Promise<User[]>;
  abstract findById(id: string): Promise<User | null>;
  abstract findByEmail(email: string): Promise<User | null>;
  abstract findAndCount(options: { skip: number; take: number }): Promise<[User[], number]>;
  abstract remove(user: User): Promise<User>;
  abstract update(id: string, updateUserDto: Partial<CreateUserDto> | Partial<User>): Promise<User | null>;
}
