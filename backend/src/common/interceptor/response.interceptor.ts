import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable, map } from 'rxjs';

@Injectable()
export class ResponseInterceptor<T> implements NestInterceptor<T, any> {
  intercept(context: ExecutionContext, next: CallHandler<T>): Observable<any> {
    return next.handle().pipe(
      map((data) => {
   
        if (data === null || data === undefined) return data;

        return {
          statusCode: context.switchToHttp().getResponse().statusCode,
          data, 
          timestamp: new Date().toISOString(),
     
        };
      }),
    );
  }
}
