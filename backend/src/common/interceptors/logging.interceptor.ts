import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Request } from 'express';
import { Observable, tap } from 'rxjs';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const req: Request = context.switchToHttp().getRequest();
    const { method, url, statusCode } = req;
    const contentLength = req.headers['content-length'];
    const now = Date.now();

    return next.handle().pipe(
      tap(() => {
        console.log(
          `[${method}] ${url} ${statusCode} - ${contentLength} - ${Date.now() - now}ms`,
        );
      }),
    );
  }
}
