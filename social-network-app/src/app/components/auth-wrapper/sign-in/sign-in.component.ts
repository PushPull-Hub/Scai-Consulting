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
  combination = false;

  constructor(private userService: UserServices, private router: Router) {}

  ngOnInit() {}

  signIn(f: NgForm) {
    const email = f.value.email;
    const password = f.value.password;

    if (this.userService.signIn(email, password)) {
      this.combination = false;
      this.router.navigate([
        `/home/${this.userService.loggedUserName}/${this.userService.loggedUserId}`,
      ]);
    } else {
      this.combination = true;
    }
  }
}
