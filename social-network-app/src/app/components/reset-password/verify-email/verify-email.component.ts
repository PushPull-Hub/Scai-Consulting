import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.component.html',
  styleUrls: ['./verify-email.component.css'],
})
export class VerifyEmailComponent implements OnInit {
  user = JSON.parse(localStorage.getItem('user'));
  incorrectEmail = false;
  constructor(private router: Router) {}

  ngOnInit(): void {}
  onSubmit(f: NgForm) {
    const email = this.user.email;
    const inputedEmail = f.value.email;
    const usersList = JSON.parse(localStorage.getItem('user'));
    if (usersList === null) {
      console.log('userlist null');
    } else {
      usersList.forEach((user) => {
        if (user.email === inputedEmail) {
          this.router.navigate(['reset-password']);
        } else {
          this.incorrectEmail = true;
        }
        return user;
      });
    }
  }
}
