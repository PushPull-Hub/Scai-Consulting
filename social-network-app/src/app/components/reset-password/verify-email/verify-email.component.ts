import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserServices } from 'src/app/services/user.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.component.html',
  styleUrls: ['./verify-email.component.css'],
  providers: [],
})
export class VerifyEmailComponent implements OnInit {
  // user = JSON.parse(localStorage.getItem('user'));
  unfoundedEmail = false;

  constructor(private user: UserServices, private router: Router) {}

  ngOnInit() {}
  verifyEmail(f: NgForm) {
    const inputedEmail = f.value.email;
    const usersList = JSON.parse(localStorage.getItem('user'));

    usersList.forEach((user) => {
      if (user.email !== inputedEmail || usersList === null) {
        this.unfoundedEmail = true;
      } else if (user.email === inputedEmail) {
        this.user.updateContent(inputedEmail);
        this.router.navigate(['/reset-password']);
      }
    });
  }
}
