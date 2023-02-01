import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable, of, share, tap } from 'rxjs';

@Injectable()
export class CacheInterceptor<TRequest, TResponse> implements HttpInterceptor {
  private cache: Map<string, HttpResponse<TResponse>> = new Map();
  intercept(req: HttpRequest<TRequest>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (req.method !== 'GET') {
      return next.handle(req);
    }
    if (req.headers.get('reset')) {
      this.cache.delete(req.url);
    }
    const cachedResponse: HttpResponse<TResponse> | undefined = this.cache.get(req.url);
    if (cachedResponse) {
      return of(cachedResponse.clone());
    } else {
      return next.handle(req).pipe(
        tap((stateEvent) => {
          if (stateEvent instanceof HttpResponse) {
            this.cache.set(req.url, stateEvent.clone());
          }
        }),
        share()
      );
    }
  }
}
