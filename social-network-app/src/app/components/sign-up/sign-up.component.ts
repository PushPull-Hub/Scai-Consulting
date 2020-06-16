import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserServices } from 'src/app/services/user.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
  providers: [UserServices],
})
export class SignUpComponent implements OnInit {
  // emailPattern = '^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$';
  constructor(private user: UserServices) {}

  ngOnInit() {}
  signUp = (f: NgForm) => {
    this.user.SignUp(f);
  };
}
