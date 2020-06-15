import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css'],
})
export class SignInComponent implements OnInit {
  incorrectPassword = false;
  Combination = false;
  constructor(private router: Router) {}

  ngOnInit() {}

  onSubmit(f: NgForm) {
    const email = f.value.email;
    const password = f.value.password;
    const usersList = JSON.parse(localStorage.getItem('user'));
    if (usersList === null) {
      this.Combination = true;
      this.incorrectPassword = false;
    } else {
      usersList.forEach((user) => {
        if (user.email === email) {
          if (user.password !== password) {
            this.incorrectPassword = true;
          } else if (user.password === password) {
            console.log('Registred ');
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
