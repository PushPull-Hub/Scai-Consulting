import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserServices } from 'src/app/services/user.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css'],
  providers: [UserServices],
})
export class ResetPasswordComponent implements OnInit {
  incorrectConfirmedPass: boolean;
  SelectedUser: {
    username: string;
    password: string;
    email: string;
    firstname: string;
    secondname: string;
    id: string;
  };
  constructor(private user: UserServices) {}

  ngOnInit() {
    this.incorrectConfirmedPass = false;
    this.SelectedUser = this.user.SelectedUser;
  }

  resetPassword = (f: NgForm) => {
    this.user.resetPassword(f);
  };
}
