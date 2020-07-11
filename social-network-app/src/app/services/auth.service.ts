import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isLoggedIn: boolean = false;

  constructor(private router: Router) {}

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
    this.isLoggedIn = false;
    this.router.navigate(['/app/sign-in']);
  };
}
