import {
  CallHandler,
  ExecutionContext,
  Injectable,
  Logger,
  NestInterceptor,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { map, Observable } from 'rxjs';

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  private readonly logger = new Logger(ResponseInterceptor.name);
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const ctx = context.switchToHttp();
    const request = ctx.getRequest<Request>();
    const response = ctx.getResponse<Response>();

    return next.handle().pipe(
      map((response_data) => {
        const statusCode = response.statusCode;
        this.logger.log(
          `[ ${request.url}]  ${request.method} -- ${statusCode} --[${JSON.stringify(request.body)}]`,
        );

        let data = response_data.data || response_data;
        if (data.user?.password) {
          const { password, ...rest } = data.user;
          data = {
            ...data,
            user: rest,
          };
        }

        return {
          code: statusCode,
          message: response_data.message ?? 'success',
          data,
        };
      }),
    );
  }
}
