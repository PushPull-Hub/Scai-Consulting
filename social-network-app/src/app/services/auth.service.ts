import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { UserServices } from './user.service';
import { User } from '../models/User.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  loggedUserId: string =
    JSON.parse(localStorage.getItem('loggedUserId')) || null;
  isLoggedIn: boolean = false;
  loggedUser: User =
    this.userService.getUserById(this.getLoggedUserId()) || null;
  theLoggedUserName: string = this.getLoggedUserId()
    ? this.userService.getaUserProperty(this.getLoggedUserId(), 'username')
    : null;

  constructor(private router: Router, private userService: UserServices) {}

  logIn = (email: string, password: string): boolean => {
    if (this.userService.usersList) {
      const testedUser: User = this.userService.usersList.find(
        (user) => user.email == email && user.password == password
      );
      if (testedUser) {
        this.loggedUser = testedUser;
        this.loggedUserId = testedUser.id;
        this.theLoggedUserName = testedUser.username;
        this.userService.updateUser(this.loggedUserId, 'isActive', true);
        localStorage.setItem('loggedUserId', JSON.stringify(testedUser.id));
        return true;
      }
      return false;
    }
  };

  isAuthenticated() {
    this.isLoggedIn = localStorage.getItem('loggedUserId') ? true : false;
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(this.isLoggedIn);
      }, 100);
    });
  }

  logOut = () => {
    localStorage.removeItem('Token');
    localStorage.removeItem('loggedUserId');
    this.userService.updateUser(this.loggedUserId, 'isActive', false);
    this.loggedUser = null;
    this.loggedUserId = null;
    this.theLoggedUserName = null;
    this.isLoggedIn = false;
    this.router.navigate(['/app/sign-in']);
  };

  getLoggedUserId() {
    return JSON.parse(localStorage.getItem('loggedUserId')) || null;
  }
}
