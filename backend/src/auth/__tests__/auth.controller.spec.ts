import { Test, type TestingModule } from '@nestjs/testing';

import { AuthController } from '../controller/auth.controller';
import { AuthService } from '../service/auth.service';

const authServiceMock: Partial<AuthService> = {
  login: jest.fn(),
  refreshToken: jest.fn(),
};

describe('AuthController', () => {
  let controller: AuthController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [{ provide: AuthService, useValue: authServiceMock }],
    }).compile();

    controller = module.get<AuthController>(AuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
