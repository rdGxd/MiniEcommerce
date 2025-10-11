import { JwtService } from '@nestjs/jwt';
import { Test, type TestingModule } from '@nestjs/testing';
import { jwtConfig } from 'src/common/config/jwt-config';
import { HashingProtocol } from 'src/common/hashing/hashing-protocol';
import { UserService } from 'src/user/service/user.service';
import { AuthService } from '../auth.service';

const hashingMock: Partial<HashingProtocol> = {
  hash: jest.fn(),
  compare: jest.fn(),
};
const userServiceMock: Partial<UserService> = {
  findUserByEmailAddress: jest.fn(),
  create: jest.fn(),
  findOne: jest.fn(),
  findUserById: jest.fn(),
};
const jwtServiceMock: Partial<JwtService> = {
  signAsync: jest.fn(),
  verifyAsync: jest.fn(),
};
const jwtConfigMock = {
  secret: 'secret',
  signOptions: { audience: 'aud', issuer: 'iss', expiresIn: 3600 },
  refreshTokenExpiresIn: 7200,
};

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: HashingProtocol, useValue: hashingMock },
        { provide: UserService, useValue: userServiceMock },
        { provide: JwtService, useValue: jwtServiceMock },
        { provide: jwtConfig.KEY, useValue: jwtConfigMock },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
