import { Test, type TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { HashingProtocol } from 'src/common/hashing/hashing-protocol';
import { type Repository } from 'typeorm';
import { ResponseUserDto } from '../dto/response-user.dto';
import { User } from '../entities/user.entity';
import { UserMapper } from '../mapper/user-mapper';
import { UserService } from '../service/user.service';

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

  describe('create', () => {
    it('should create a new user and return the user DTO', async () => {
      const responseUserDto: ResponseUserDto = {
        email: 'test@example.com',
        id: '1',
        name: 'Test User',
        role: 'user',
      };

      const createUser = {
        email: 'test@example.com',
        name: 'Test User',
        password: 'password',
      };

      const userEntity = {
        id: '1',
        email: 'test@example.com',
        // entity before hashing should contain raw password
        password: 'password',
      };

      // hashing service should be called and return the hashed password
      jest.spyOn(hashingService, 'hash').mockResolvedValue('hashed_password');

      jest.spyOn(userMapper, 'toEntity').mockReturnValue(userEntity as any);
      jest
        .spyOn(userRepository, 'save')
        .mockImplementation(async (u: any) => ({ ...u }));
      jest.spyOn(userMapper, 'toDto').mockReturnValue(responseUserDto);

      const result = await service.create(createUser);

      expect(result).toEqual(responseUserDto);
      expect(userMapper.toEntity).toHaveBeenCalledWith(createUser);
      expect(userRepository.save).toHaveBeenCalledWith(userEntity);
      expect(userMapper.toDto).toHaveBeenCalledWith(userEntity);
      expect(hashingService.hash).toHaveBeenCalledWith('password');
    });
  });
});
