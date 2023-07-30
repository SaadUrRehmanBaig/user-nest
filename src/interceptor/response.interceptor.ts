import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, catchError, map } from 'rxjs';
import * as fs from 'fs';

export interface Response<T> {
  success: boolean;
  message: string;
  data: T;
}

@Injectable()
export class ResponseTransformationInterceptor<T>
  implements NestInterceptor<T, Response<T>>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<Response<T>> {
    return next.handle().pipe(
      map((data) => ({
        data: data.data,
        success: true,
        message: data.message || '',
      })),
      catchError(async (error) => {
        const req = context.switchToHttp().getRequest();
        if (req.file) {
            fs.unlink(req.file.path, unlinkErr => {
              if (unlinkErr) {
                console.log(`Failed to delete file: ${unlinkErr}`);
              } else {
                console.log(`Successfully deleted file: ${req.file.path}`);
              }
            });
          }
        return {
          data: null,
          success: false,
          message: error.message,
        };
      }),
    );
  }
}
