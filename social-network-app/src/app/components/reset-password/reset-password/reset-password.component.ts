import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserServices } from 'src/app/services/user.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css'],
})
export class ResetPasswordComponent implements OnInit {
  incorrectConfirmedPass = false;
  email = '';
  usersList: [
    {
      username: string;
      password: string;
      email: string;
      firstname: string;
      secondname: string;
      id: string;
    }
  ];

  constructor(private user: UserServices) {}

  ngOnInit() {
    this.email = this.user.SelectedUserEmail;
    this.usersList = this.user.usersList;
  }

  resetPassword(f: NgForm) {
    const newPass = f.value.newpass;
    const newPassConfirmation = f.value.newconfirmedpass;

    if (newPass !== newPassConfirmation) {
      this.incorrectConfirmedPass = true;
      console.log(`Incorrect Password !!`);
    } else if (newPass === newPassConfirmation) {
      const Selecteduser = this.usersList.find(
        (user) => user.email === this.email
      );
      console.log(Selecteduser.email);
    }
  }
}
