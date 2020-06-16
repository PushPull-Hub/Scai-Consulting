import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserServices } from 'src/app/services/user.service';
@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.component.html',
  styleUrls: ['./verify-email.component.css'],
  providers: [UserServices],
})
export class VerifyEmailComponent implements OnInit {
  // user = JSON.parse(localStorage.getItem('user'));
  unfoundedEmail: boolean;

  constructor(private user: UserServices) {}

  ngOnInit() {
    this.unfoundedEmail = this.user.unfoundedEmail;
  }
  verifyEmail = (f: NgForm) => {
    this.user.verifyEmail(f);
  };
}
