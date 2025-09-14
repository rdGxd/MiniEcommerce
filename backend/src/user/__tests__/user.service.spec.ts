import { HashingProtocol } from '@/common/hashing/hashing-protocol';
import { User } from '@/user/entities/user.entity';
import { UserMapper } from '@/user/mapper/user-mapper';
import { UserService } from '@/user/user.service';
import { Test, type TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { type Repository } from 'typeorm';

describe('UserService', () => {
  let service: UserService;
  let userRepository: Repository<User>;
  let userMapper: UserMapper;
  let hashingService: HashingProtocol;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: UserMapper,
          useValue: {
            toEntity: jest.fn(),
            toDto: jest.fn(),
          },
        },
        {
          provide: getRepositoryToken(User),
          useValue: {
            find: jest.fn(),
            findOneBy: jest.fn(),
            save: jest.fn(),
            merge: jest.fn(),
            delete: jest.fn(),
          },
        },
        {
          provide: HashingProtocol,
          useValue: {
            hash: jest.fn(),
            compare: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    userRepository = module.get<Repository<User>>(getRepositoryToken(User));
    userMapper = module.get<UserMapper>(UserMapper);
    hashingService = module.get<HashingProtocol>(HashingProtocol);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(userRepository).toBeDefined();
    expect(userMapper).toBeDefined();
    expect(hashingService).toBeDefined();
  });
});
