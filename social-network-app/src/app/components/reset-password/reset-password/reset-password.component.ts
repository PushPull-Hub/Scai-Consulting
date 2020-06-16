import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserServices } from 'src/app/services/user.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css'],
  providers: [UserServices],
})
export class ResetPasswordComponent implements OnInit {
  incorrectConfirmedPass = false;
  email = '';

  constructor(private user: UserServices) {}

  ngOnInit() {
    this.incorrectConfirmedPass = false;
    this.user.shared.subscribe((x) => (this.email = x));
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
        if (user.email === this.email) {
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
