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

    if (email !== inputedEmail) {
      this.incorrectEmail = true;
    } else {
      this.router.navigate(['reset-password']);
    }
  }
}
