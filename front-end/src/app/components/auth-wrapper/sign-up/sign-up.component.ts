import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserServices } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import { Account } from 'src/app/models/Account.model';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent implements OnInit {
  date: NgbDateStruct;
  options = [
    { name: 'Male', value: 'Male' },
    { name: 'Female', value: 'Female' },
    { name: 'other', value: 'Other' },
  ];
  selectedOption: string;

  constructor(private userService: UserServices, private router: Router) {}

  ngOnInit() {}

  signUp(f: NgForm) {
    const email = f.value.email;
    const firstName = f.value.firstname;
    const password = f.value.password;
    const secondName = f.value.secondname;

    let account: Account = new Account();

    account.user = {
      email: email,
      password: password,
    };

    account.profile = {
      firstName: firstName,
      lastName: secondName,
      gender: this.selectedOption,
      active: 1,
    };

    this.userService.createAccount(account);
    this.router.navigate(['/sign-in']);
  }
}
