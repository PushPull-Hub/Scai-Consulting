import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserServices } from 'src/app/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
})
export class SignUpComponent implements OnInit {
  usersList: [
    {
      username: string;
      password: string;
      email: string;
      firstname: string;
      secondname: string;
      id: string;
    }
  ];

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

    if (this.usersList === null) {
      user.id = '1';
      users.push(user);
      localStorage.setItem('user', JSON.stringify(users));
      alert(`Congratulations ${userName} you've  signed up successfully `);
      this.router.navigate(['/sign-in']);
    } else {
      user.id = `${this.usersList.length + 1}`;
      this.usersList.push(user);
      localStorage.setItem('user', JSON.stringify(this.usersList));
      this.user.usersList = this.usersList;
      this.router.navigate(['/sign-in']);
      alert(`Congratulations ${userName} you've  signed up successfully `);
    }
  }
}
