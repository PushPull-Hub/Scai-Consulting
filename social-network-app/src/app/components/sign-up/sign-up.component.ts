import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserServices } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import { User } from 'src/app/models/User.model';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
})
export class SignUpComponent implements OnInit {
  usersList: User[];

  constructor(private user: UserServices, private router: Router) {}

  ngOnInit() {
    this.usersList = this.user.usersList;
  }

  signUp(f: NgForm) {
    const email = f.value.email;
    const firstName = f.value.firstname;
    const password = f.value.password;
    const secondName = f.value.secondname;
    const userName = f.value.username;
    const users = [];
    const user = {
      username: userName,
      password: password,
      email: email,
      firstname: firstName,
      secondname: secondName,
      id: '',
    };
    if (this.usersList.length === 0) {
      user.id = '1';
      users.push(user);
      this.user.saveUSer(user);
      alert(`Congratulations ${userName} you've  signed up successfully `);
      this.router.navigate(['/sign-in']);
    } else {
      user.id = `${this.usersList.length + 1}`;
      this.user.saveUSer(user);
      this.router.navigate(['/sign-in']);
      alert(`Congratulations ${userName} you've  signed up successfully `);
    }
  }
}
