import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserServices } from 'src/app/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css'],
})
export class ResetPasswordComponent implements OnInit {
  incorrectConfirmedPass = false;
  selectedUserId: number;

  constructor(private user: UserServices, private route: Router) {}

  ngOnInit() {
    this.selectedUserId = this.user.selectedUserId;
    console.log(this.selectedUserId);
  }

  resetPassword(f: NgForm) {
    const newPass = f.value.newpass;
    const newPassConfirmation = f.value.newconfirmedpass;

    if (newPass !== newPassConfirmation) {
      this.incorrectConfirmedPass = true;
      console.log(`Incorrect Password !!`);
    } else if (newPass === newPassConfirmation) {
      const newPassword = newPass.toString();
      this.user.updateUser(this.selectedUserId, 'password', newPassword);
      this.route.navigate(['/app/sign-in']);
    }
  }
}
