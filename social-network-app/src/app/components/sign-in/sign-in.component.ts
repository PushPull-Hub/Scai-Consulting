import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserServices } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import { User } from 'src/app/models/User.model';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css'],
})
export class SignInComponent implements OnInit {
  Combination = false;
  incorrectPassword = false;
  usersList: User[];

  constructor(private user: UserServices, private router: Router) {}

  ngOnInit() {
    this.usersList = this.user.usersList;
  }

  signIn(f: NgForm) {
    const email = f.value.email;
    const password = f.value.password;
    if (this.usersList === null) {
      this.Combination = true;
      this.incorrectPassword = false;
    } else {
      this.usersList.forEach((user) => {
        if (user.email === email) {
          if (user.password !== password) {
            this.incorrectPassword = true;
            console.log('incorrect password');
          } else if (user.password === password) {
            console.log(` Registred the user : ${user.username}`);
            this.router.navigate(['/home']);
          }
        } else {
          this.Combination = true;
          this.incorrectPassword = false;
        }
        return;
      });
    }
  }
}
