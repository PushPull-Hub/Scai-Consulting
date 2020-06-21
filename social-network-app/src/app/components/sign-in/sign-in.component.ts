import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserServices } from 'src/app/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css'],
})
export class SignInComponent implements OnInit {
  Combination = false;
  incorrectPassword = false;
  Storage;

  constructor(private user: UserServices, private router: Router) {}

  ngOnInit() {
    this.Storage = JSON.parse(localStorage.getItem('Storage'));
  }

  signIn(f: NgForm) {
    const email = f.value.email;
    const password = f.value.password;

    if (!this.Storage) {
      this.Combination = true;
      this.incorrectPassword = false;
      console.log('!! this.Storage ');
    } else {
      const Users = this.Storage[0];
      const testedUser = Users.find(
        (user) => user.email == email && user.password == password
      );
      const LogUserCheck = testedUser
        ? this.user.logUser(testedUser.id)
        : (this.Combination = true);
    }
  }
}
