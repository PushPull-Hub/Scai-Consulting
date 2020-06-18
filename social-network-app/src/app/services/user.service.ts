import { Injectable } from '@angular/core';
import { User } from '../models/User.model';

@Injectable({
  providedIn: 'root',
})
export class UserServices {
  SelectedUserEmail = '';
  usersList: User[] = [];

  constructor() {}

  getUSers = () => JSON.parse(localStorage.getItem('user')) || [];

  saveUSer = (value: User) => {
    let users = this.getUSers();
    users.push(value);
    localStorage.setItem('user', JSON.stringify(users));
    this.usersList = this.usersList.concat(value);
  };
  updateUser = (user, pro, newValue) => {
    let users = this.getUSers();
    user[`${pro}`] = newValue;
    users.push(user);
    localStorage.setItem('user', JSON.stringify(users));
  };

  getEmail = (email: string) => (this.SelectedUserEmail = email);
}
