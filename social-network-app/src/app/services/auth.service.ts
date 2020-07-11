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
  loggedUserId: string;
  theLoggedUserName: string;

  constructor(private router: Router, private userService: UserServices) {}

  logIn = (email: string, password: string): boolean => {
    if (this.userService.usersList) {
      const testedUser: User = this.userService.usersList.find(
        (user) => user.email == email && user.password == password
      );
      if (testedUser) {
        this.loggedUserId = testedUser.id;
        this.theLoggedUserName = testedUser.username;
        this.loggedUser = testedUser;
        this.userService.updateUser(this.loggedUserId, 'isActive', true);
        localStorage.setItem('loggedUserId', JSON.stringify(this.loggedUserId));
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
}
