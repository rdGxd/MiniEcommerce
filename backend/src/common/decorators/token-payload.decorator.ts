import { REQUEST_TOKEN_PAYLOAD_KEY } from '@/constants/auth.constants';
import { type ExecutionContext, createParamDecorator } from '@nestjs/common';
import { type Request } from 'express';

export const TokenPayloadParam = createParamDecorator(
  (data, ctx: ExecutionContext) => {
    const request: Request = ctx.switchToHttp().getRequest();
    return request[REQUEST_TOKEN_PAYLOAD_KEY];
  },
);
