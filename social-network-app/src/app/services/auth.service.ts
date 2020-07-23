import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { UserServices } from './user.service';
import { User } from '../models/User.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  loggedUser: User;
  isLoggedIn: boolean = false;

  constructor(private router: Router, private userService: UserServices) {}

  logIn = (email: string, password: string): boolean => {
    if (this.userService.usersList) {
      const testedUser: User = this.userService.usersList.find(
        (user) => user.email == email && user.password == password
      );
      if (testedUser) {
        this.loggedUser = this.userService.getUserVersion2(testedUser.id);
        console.log(this.loggedUser);
        this.userService.updateUser(this.loggedUser.id, 'isActive', true);
        localStorage.setItem('loggedUserId', this.loggedUser.id);
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
    localStorage.removeItem('loggedUserId');
    this.userService.updateUser(this.loggedUser.id, 'isActive', false);
    this.loggedUser = null;
    this.isLoggedIn = false;
    this.router.navigate(['/app/sign-in']);
  };

  getLoggedUserId() {
    if (!this.loggedUser) {
      const loggedId = localStorage.getItem('loggedUserId');
      if (!loggedId) return null;
      this.loggedUser = this.userService.getUserById(loggedId);
    }
    return this.loggedUser.id;
  }

  getLoggedUser() {
    if (!this.loggedUser) {
      this.loggedUser = this.userService.getUserById(this.getLoggedUserId());
    } else return this.loggedUser;
  }
}
