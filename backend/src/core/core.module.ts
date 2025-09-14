import { AuthAndPolicyGuard } from '@/auth/guards/auth-and-policy.guard';
import { HttpExceptionFilter } from '@/common/exceptions/http-exception.filter';
import { LoggingInterceptor } from '@/common/interceptors/logging.interceptor';
import { TransformInterceptor } from '@/common/interceptors/transform.interceptor';
import { Module, ValidationPipe } from '@nestjs/common';
import { APP_FILTER, APP_GUARD, APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';

@Module({
  imports: [],
  controllers: [],
  providers: [
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
    },
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: TransformInterceptor,
    },
    {
      provide: APP_GUARD,
      useClass: AuthAndPolicyGuard,
    },
  ],
  exports: [],
})
export class CoreModule {}
