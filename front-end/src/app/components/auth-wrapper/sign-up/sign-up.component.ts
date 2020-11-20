import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserServices } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { Profile } from 'src/app/models/Profile.model';
import { User } from 'src/app/models/User.model';
import { Gender } from 'src/app/models/Gender.model';
import { Subscription, throwError } from 'rxjs';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent implements OnInit, OnDestroy {
  date: NgbDateStruct;
  options = [
    { name: 'Male', value: Gender[0] },
    { name: 'Female', value: Gender[1] },
    { name: 'other', value: Gender[2] },
  ];
  selectedOption: Gender;
  signingUp: Subscription;

  constructor(private userService: UserServices, private router: Router) {}

  ngOnInit() {}

  signUp(f: NgForm) {
    const email = f.value.email;
    const firstName = f.value.firstname;
    const password = f.value.password;
    const secondName = f.value.secondname;

    let profile = new Profile();
    let user = new User();

    profile.id = 0;
    profile.email = email;
    profile.password = password;

    user.id = 0;
    user.firstName = firstName;
    user.lastName = secondName;
    user.gender = this.selectedOption;
    user.active = false;

    profile.user = user;

    this.signingUp = this.userService
      .createAccount(profile)
      .subscribe((responseData) => {
        if (responseData.id) {
          this.router.navigate(['/sign-in']);
        } else throw new Error('something went wrong');
      });
  }

  ngOnDestroy(): void {
    if (this.signingUp) this.signingUp.unsubscribe();
  }
}
