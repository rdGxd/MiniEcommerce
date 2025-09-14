import { type ExecutionContext, createParamDecorator } from '@nestjs/common';
import { type Request } from 'express';
import { REQUEST_TOKEN_PAYLOAD_KEY } from 'src/auth/constants/auth.constants';

export const TokenPayloadParam = createParamDecorator(
  (data, ctx: ExecutionContext) => {
    const request: Request = ctx.switchToHttp().getRequest();
    return request[REQUEST_TOKEN_PAYLOAD_KEY];
  },
);
