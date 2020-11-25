import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { environment } from 'src/environments/environment';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

import { User } from '../models/User.model';
import { Profile } from '../models/Profile.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private loggedUserSubject: BehaviorSubject<User>;
  authenticatedUser = new Subject<User>();
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
    this.authenticatedUser.next(null);
    this.isLoggedIn = false;
    // update user to desactived
    localStorage.removeItem('token');
    this.router.navigate(['/app/sign-in']);
  }

  getAuthenticatedUser(): Observable<User> {
    if (!this.authenticatedUser) {
      if (!localStorage.getItem('token')) return null;
      this.http
        .get<User>(environment.rootUrl + '/api/user')
        .subscribe((user) => this.authenticatedUser.next(user));
    }
    return this.authenticatedUser;
  }
}
