import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { delay } from 'rxjs/operators';
import { tap } from 'rxjs/operators';

@Injectable()
export class CatsInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    console.log('Hey! we intercept, running Before...');

    const now = Date.now();
    return next
      .handle()
      .pipe(
        //delay(6000),
        //map(data => ({eita: data})), mudar o payload da response retornada pela API
        tap(() => console.log(`Hey! we intercept, running after ... ${Date.now() - now}ms`)),
      );
  }
}
