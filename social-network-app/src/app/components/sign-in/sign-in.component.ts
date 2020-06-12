import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css'],
})
export class SignInComponent implements OnInit {
  user = JSON.parse(localStorage.getItem('user'));
  incorrectEmail = false;
  incorrectPassword = false;

  constructor(private router: Router) {}

  ngOnInit() {}

  onSubmit(f: NgForm) {
    const email = f.value.email;
    const password = f.value.password;
    if (this.user.email !== email && this.user.password !== password) {
      this.incorrectEmail = true;
      this.incorrectPassword = true;
    } else if (this.user.password !== password && this.user.email == email) {
      this.incorrectPassword = true;
      this.incorrectEmail = false;
    } else if (this.user.email !== email && this.user.password == password) {
      this.incorrectEmail = true;
      this.incorrectPassword = false;
    } else {
      console.log('Registred ');
      this.router.navigate(['/home']);
    }
  }
}
