import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class ApiHttpInterceptor implements HttpInterceptor {

  public constructor() {
  }

  public intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    request = request.clone({
      url: "http://localhost:3000" + request.url,
      setHeaders: { 'Content-Type': 'application/json', observe: 'body'}
    });

    return next.handle(request);
  }
}
