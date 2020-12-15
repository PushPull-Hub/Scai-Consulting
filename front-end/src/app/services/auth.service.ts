import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { environment } from 'src/environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';

import { User } from '../models/User.model';
import { Profile } from '../models/Profile.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  _authenticatedUser: BehaviorSubject<User> = new BehaviorSubject<User>(null);
  isLoggedIn: boolean = false;
  token: string;

  constructor(private http: HttpClient, private router: Router) {}

  logIn(email: string, password: string) {
    const profile = new Profile();
    profile.email = email;
    profile.password = password;
    return this.http.post<User>(environment.rootUrl + `/api/sign-in`, profile, {
      observe: 'response',
    });
  }

  isAuthenticated() {
    this.isLoggedIn = localStorage.getItem('token') ? true : false;
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(this.isLoggedIn);
      }, 900);
    });
  }

  logOut() {
    this._authenticatedUser.next(null);
    this.isLoggedIn = false;
    localStorage.removeItem('token');
    this.router.navigate(['/app/sign-in']);
  }

  getAuthenticatedUser(): Promise<User> {
    return new Promise((res, rej) => {
      this._authenticatedUser.subscribe(async (user: User) => {
        let authenticatedUser: User;
        if (user) {
          authenticatedUser = user;
        } else {
          authenticatedUser = await this._getAuthenticatedUserFromBE();
          this._authenticatedUser.next(authenticatedUser);
        }
        res(authenticatedUser);
      });
    });
  }

  private _getAuthenticatedUserFromBE(): Promise<User> {
    return new Promise((res, rej) => {
      this.http
        .get<User>(environment.rootUrl + '/api/user')
        .subscribe((data) => {
          if (data.id) {
            res(data);
          } else res(null);
        });
    });
  }
}
