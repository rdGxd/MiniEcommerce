import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateUserDto } from "./dto/create-user.dto";
import { User } from "./entities/user.entity";
import { UserRepository } from "./user.repository";

@Injectable()
export class TypeOrmUserRepository extends UserRepository {

  constructor(@InjectRepository(User) private readonly typeOrmRepo: Repository<User>) {
    super();
  }

  save(user: CreateUserDto | Partial<User> | User): Promise<User> {
    const entity = this.typeOrmRepo.create(user as Partial<User>);
    return this.typeOrmRepo.save(entity);
  }

  findAll(): Promise<User[]> {
    return this.typeOrmRepo.find();
  }

  findById(id: string): Promise<User | null> {
    return this.typeOrmRepo.findOne({ where: { id } });
  }

  update(id: string, updateUserDto: Partial<CreateUserDto> | Partial<User>): Promise<User | null> {
  const entity = this.typeOrmRepo.create({ ...(updateUserDto as Partial<User>), id });
  return this.typeOrmRepo.save(entity);
  }

  remove(user: User): Promise<User> {
    return this.typeOrmRepo.remove(user);
  }

  findByEmail(email: string): Promise<User | null> {
    return this.typeOrmRepo.findOne({ where: { email } });
  }

  findAndCount(options: { skip: number; take: number; }): Promise<[User[], number]> {
    return this.typeOrmRepo.findAndCount({
      skip: options.skip,
      take: options.take,
    });
  }
}
