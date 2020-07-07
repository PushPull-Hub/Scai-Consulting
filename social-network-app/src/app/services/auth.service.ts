import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isLoggedIn: boolean;

  constructor(private router: Router) {}

  logIn = (id?) => {
    localStorage.getItem('loggedUserId')
      ? (this.isLoggedIn = true)
      : (this.isLoggedIn = false);
  };

  logOut = () => {
    localStorage.removeItem('Token');
    localStorage.removeItem('loggedUserId');
    this.isLoggedIn = false;
    this.router.navigate(['/sign-in']);
  };
}
