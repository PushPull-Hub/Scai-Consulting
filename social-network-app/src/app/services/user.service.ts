import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserServices {
  SelectedUserEmail = '';
  usersList: [
    {
      username: string;
      password: string;
      email: string;
      firstname: string;
      secondname: string;
      id: string;
    }
  ] = JSON.parse(localStorage.getItem('user'));

  constructor() {}

  getEmail(email) {
    this.SelectedUserEmail = email;
    console.log(
      `${this.SelectedUserEmail} selectedUserEmail value from  user Service `
    );
  }
}
