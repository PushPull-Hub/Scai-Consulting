import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css'],
})
export class ResetPasswordComponent implements OnInit {
  incorrectConfirmedPass = false;
  user = localStorage.getItem('user');
  constructor(private router: Router) {}

  ngOnInit(): void {}
  onSubmit(f: NgForm) {
    const newPass = f.value.newpass;
    const newPassConfirmation = f.value.newconfirmedpass;
    const usersList = JSON.parse(localStorage.getItem('user'));
    if (newPass !== newPassConfirmation) {
      this.incorrectConfirmedPass = true;
    } else if (newPass === newPassConfirmation) {
      this.incorrectConfirmedPass = false;
      this.user = this.user ? JSON.parse(this.user) : {};
      this.user['password'] = newPass.toString();
      localStorage.setItem('user', JSON.stringify(this.user));
      this.router.navigate(['/home']);
      alert('password has been changed ');
    }
  }
}
