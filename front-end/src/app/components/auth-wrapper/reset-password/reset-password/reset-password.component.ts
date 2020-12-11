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
  incorrectConfirmedPass: boolean;
  error;

  constructor(private userService: UserServices, private route: Router) {}

  ngOnInit() {
    this.incorrectConfirmedPass = false;
  }

  resetPassword(f: NgForm) {
    const newPass = f.value.newpass;
    const newPassConfirmation = f.value.newconfirmedpass;

    if (newPass !== newPassConfirmation) {
      this.incorrectConfirmedPass = true;
      console.log(`Incorrect Password !!`);
    } else if (newPass === newPassConfirmation) {
      const newPassword = newPass.toString();
      this.userService.passwordReseter.password = newPassword;
      this.userService
        .resetPassword(this.userService.passwordReseter)
        .toPromise()
        .then((result) => {
          console.log(result);
          if (result.password) {
            this.route.navigate(['/app/sign-in']);
          } else {
            this.error = 'probably a server problem, try later ';
          }
        })
        .catch((err) => {
          this.error = err.message;
        });
    }
  }
}
