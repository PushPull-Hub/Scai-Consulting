import { Injectable } from '@angular/core';
import { CanLoad, Route, UrlSegment, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class CanLoadHomePageGuard implements CanLoad {
  constructor(private authService: AuthService) {}
  canLoad(
    route: Route,
    segments: UrlSegment[]
  ): Observable<boolean> | Promise<boolean> | boolean {
    return this.authService
      .isAuthenticated()
      .then((authenticated) => (authenticated ? true : false));
  }
}
