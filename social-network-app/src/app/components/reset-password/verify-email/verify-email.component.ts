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

  constructor(private user: UserServices, private router: Router) {}

  ngOnInit() {}

  verifyEmail = (f: NgForm) => {
    const inputedEmail = f.value.email;

    const users = this.user.getUsers();
    const testedUser = users.find((user) => user.email === inputedEmail);
    const existedEmail = testedUser
      ? (this.user.selectedUserId == testedUser.id,
        this.router.navigate(['/reset-password']))
      : (this.unfoundedEmail = true);
  };
}
