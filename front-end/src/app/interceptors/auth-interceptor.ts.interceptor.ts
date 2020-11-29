import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { catchError } from 'rxjs/operators';
import { AlertService } from '../services/alert.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(
    private authService: AuthService,
    private alertService: AlertService
  ) {}
  token: string;

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    this.token = localStorage.getItem('token');
    if (this.token) {
      request = request.clone({
        setHeaders: {
          Authentication: `Bearer ${this.token}`,
        },
      });
    }

    return next.handle(request).pipe(
      catchError((err) => {
        if (err.status === 401) {
          console.log('From Interceptor, Unauthorized ');
          this.authService.logOut();
          window.location.reload();
        }
        const error = err.error.message || err.statusText;
        console.log(err);
        console.log('From Interceptor ' + err.error.message);
        this.alertService.error(error);
        this.authService.logOut();
        return throwError(error);
      })
    );
  }
}
