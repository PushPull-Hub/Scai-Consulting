import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserServices } from 'src/app/services/user.service';
import { User } from 'src/app/models/User.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css'],
})
export class ResetPasswordComponent implements OnInit {
  incorrectConfirmedPass = false;
  email = '';
  usersList: User[];

  constructor(private user: UserServices, private route: Router) {}

  ngOnInit() {
    this.email = this.user.selectedUserId;
    this.usersList = this.user.usersList;
  }

  resetPassword(f: NgForm) {
    const newPass = f.value.newpass;
    const newPassConfirmation = f.value.newconfirmedpass;

    if (newPass !== newPassConfirmation) {
      this.incorrectConfirmedPass = true;
      console.log(`Incorrect Password !!`);
    } else if (newPass === newPassConfirmation) {
      // const Selecteduser = this.usersList.find(
      //   (user) => user.email === this.email
      // );
      // const newPassword = newPass.toString();
      // this.user.updateUser(Selecteduser, 'password', newPassword);
      // alert('password changed successfully');
      // this.route.navigate(['/sign-in']);
      this.user.updateUser();
    }
  }
}
