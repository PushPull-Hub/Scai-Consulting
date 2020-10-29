import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserServices } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
})
export class SignInComponent implements OnInit {
  combination = false;

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit() {}

  signIn(f: NgForm) {
    const email = f.value.email;
    const password = f.value.password;

    if (this.authService.logIn(email, password)) {
      this.combination = false;
      this.router.navigate(['/home']);
    } else {
      this.combination = true;
    }
  }
}
