import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserServices } from 'src/app/services/user.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.component.html',
  styleUrls: ['./verify-email.component.css'],
})
export class VerifyEmailComponent implements OnInit {
  unfoundedEmail = false;

  constructor(private userService: UserServices, private router: Router) {}

  ngOnInit() {}

  verifyEmail = async (f: NgForm) => {
    const inputedEmail = f.value.email;
    await this.userService
      .verifyEmail(inputedEmail)
      .toPromise()
      .then((result) => {
        console.log(result);
        if (result.email) {
          this.userService.passwordReseter = result;
          this.unfoundedEmail = false;
          this.router.navigate(['/app/reset-password']);
        } else {
          this.unfoundedEmail = true;
        }
      });
  };
}
