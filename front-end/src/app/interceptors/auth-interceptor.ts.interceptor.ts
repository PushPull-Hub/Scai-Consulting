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
  token: string = localStorage.getItem('token');

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    if (this.token) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${this.token}`,
        },
      });
    }

    return next.handle(request).pipe(
      catchError((err) => {
        if (err.status === 401) {
          this.authService.logOut();
          window.location.reload();
        }
        const error = err.error.message || err.statusText;
        this.alertService.error(error);
        return throwError(error);
      })
    );
  }
}
