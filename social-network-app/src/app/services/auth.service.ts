import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public loggedIn;
  constructor() {}

  logIn = () => (this.loggedIn = true);
  logOut = () => (this.loggedIn = false);
}
