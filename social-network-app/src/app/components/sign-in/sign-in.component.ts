import { Component, OnInit, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserServices } from 'src/app/services/user.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css'],
  providers: [UserServices],
})
export class SignInComponent implements OnInit {
  incorrectPassword: boolean;
  Combination: boolean;

  constructor(private user: UserServices) {}

  ngOnInit() {
    this.incorrectPassword = this.user.incorrectPassword;
    this.Combination = this.user.Combination;
  }

  signIn = (f: NgForm) => {
    this.user.signIn(f);
  };
}
