import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserServices } from 'src/app/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
  providers: [],
})
export class SignUpComponent implements OnInit {
  // emailPattern = '^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$';
  constructor(private user: UserServices, private router: Router) {}

  ngOnInit() {}

  signUp(f: NgForm) {
    const email = f.value.email;
    const firstName = f.value.firstname;
    const password = f.value.password;
    const secondName = f.value.secondname;
    const userName = f.value.username;
    const usersList = JSON.parse(localStorage.getItem('user'));
    const users = [];
    const user = {
      username: userName,
      password: password,
      email: email,
      firstname: firstName,
      secondname: secondName,
      id: '',
    };

    if (usersList === null) {
      user.id = '1';
      users.push(user);
      localStorage.setItem('user', JSON.stringify(users));
      this.router.navigate(['/sign-in']);
      alert(`Congratulations ${userName} you've been signed up successfully `);
    } else {
      user.id = `${usersList.length + 1}`;
      usersList.push(user);
      localStorage.setItem('user', JSON.stringify(usersList));
      this.router.navigate(['/sign-in']);
    }
  }
}
