import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { UserServices } from './user.service';

import { User } from '../models/User.model';
import { Profile } from '../models/Profile.model';

import { BehaviorSubject, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private loggedUserSubject: BehaviorSubject<User>;
  loggedUser = new Subject<User>();
  isLoggedIn: boolean = false;

  constructor(
    private http: HttpClient,
    private router: Router,
    private userService: UserServices
  ) {}

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
      }, 100);
    });
  }

  logOut() {
    this.loggedUser.next(null);
    this.isLoggedIn = false;
    // update user to desactived
    localStorage.removeItem('loggedUserId');
    localStorage.removeItem('token');
    this.router.navigate(['/app/sign-in']);
  }

  getLoggedUser(): User {
    if (!this.loggedUser) {
      if (!localStorage.getItem('token')) return null;
      this.userService.getUserById(localStorage.getItem('loggedUserId'));
    }
    this.loggedUser.subscribe((user) => user);
  }
}
