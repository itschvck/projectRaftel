import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HttpParams
} from '@angular/common/http';
import { exhaustMap, Observable, take } from 'rxjs';
import { AuthService } from "../services/auth.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(
      private authService: AuthService
  ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return this.authService.loggedUser.pipe(
        take(1),
        exhaustMap( loggedUser => {
              if (!loggedUser) {
                return next.handle(request);
              }
              const modifiedRequest = request.clone({
                params: new HttpParams().set('auth', loggedUser.token)
              });
              return next.handle(modifiedRequest);
            }
        )
    );
  }
}
