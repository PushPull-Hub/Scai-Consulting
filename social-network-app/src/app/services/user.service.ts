import { Injectable } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class UserServices {
  Combination = false;
  incorrectPassword = false;
  unfoundedEmail = false;
  incorrectConfirmedPass = false;
  SelectedUser: {
    username: string;
    password: string;
    email: string;
    firstname: string;
    secondname: string;
    id: string;
  };

  constructor(private router: Router) {}

  SignUp(f: NgForm) {
    const email = f.value.email;
    const firstName = f.value.firstname;
    const password = f.value.password;
    const secondName = f.value.secondname;
    const userName = f.value.username;
    const usersList = JSON.parse(localStorage.getItem('user'));
    const users = [];
    const user = {
      username: userName,
      password: password,
      email: email,
      firstname: firstName,
      secondname: secondName,
      id: '',
    };

    if (usersList === null) {
      user.id = '1';
      users.push(user);
      localStorage.setItem('user', JSON.stringify(users));
      this.router.navigate(['/sign-in']);
      alert(`Congratulations ${userName} you've been signed up successfully `);
    } else {
      user.id = `${usersList.length + 1}`;
      usersList.push(user);
      localStorage.setItem('user', JSON.stringify(usersList));
      this.router.navigate(['/sign-in']);
    }
  }

  signIn(f: NgForm) {
    const email = f.value.email;
    const password = f.value.password;
    const usersList = JSON.parse(localStorage.getItem('user'));
    if (usersList === null) {
      this.Combination = true;
      this.incorrectPassword = false;
    } else {
      usersList.forEach((user) => {
        if (user.email === email) {
          if (user.password !== password) {
            this.incorrectPassword = true;
            console.log('incorrect password');
          } else if (user.password === password) {
            console.log(` Registred the user : ${user.username}`);
            this.router.navigate(['/home']);
          }
        } else {
          this.Combination = true;
          this.incorrectPassword = false;
        }
        return;
      });
    }
  }

  verifyEmail(f: NgForm) {
    const inputedEmail = f.value.email;
    const usersList = JSON.parse(localStorage.getItem('user'));

    usersList.forEach((user) => {
      if (user.email !== inputedEmail || usersList === null) {
        this.unfoundedEmail = true;
      } else if (user.email === inputedEmail) {
        user = this.SelectedUser;
        this.router.navigate(['/reset-password']);
      }
    });
  }

  resetPassword(f: NgForm) {
    const newPass = f.value.newpass;
    const newPassConfirmation = f.value.newconfirmedpass;
    const usersList = JSON.parse(localStorage.getItem('user'));

    if (newPass !== newPassConfirmation) {
      this.incorrectConfirmedPass = true;
      console.log(`Incorrect Password !!`);
    } else if (newPass === newPassConfirmation) {
      usersList.find((user) => {
        if (
          user.email === this.SelectedUser.email ||
          user.id === this.SelectedUser.id
        ) {
          const users = usersList ? JSON.parse(usersList) : {};
          console.log(users);
          users['password'] = newPass.toString();
          localStorage.setItem('user', JSON.stringify(user));
          alert('password has been changed ');
        }
      });
    }
  }
}
