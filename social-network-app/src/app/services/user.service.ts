import { Injectable } from '@angular/core';
import { User } from '../models/User.model';

@Injectable({
  providedIn: 'root',
})
export class UserServices {
  SelectedUserEmail = '';
  usersList: User[] = [];

  constructor() {}

  saveUSer = (value: User) => {
    let users = this.getUSers();
    users.push(value);
    localStorage.setItem('user', JSON.stringify(users));
    this.usersList = this.usersList.concat(value);
  };
  getUSers = () => JSON.parse(localStorage.getItem('user')) || [];

  getEmail = (email: string) => (this.SelectedUserEmail = email);
}
