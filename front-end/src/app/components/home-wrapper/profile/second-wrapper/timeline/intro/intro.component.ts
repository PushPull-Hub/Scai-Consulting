import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserServices } from 'src/app/services/user.service';
import { AuthService } from 'src/app/services/auth.service';
import { Birthday, User } from 'src/app/models/User.model';

@Component({
  selector: 'app-intro',
  templateUrl: './intro.component.html',
  styleUrls: ['./intro.component.scss'],
})
export class IntroComponent implements OnInit {
  EditButtonClicked: boolean;
  loggedUser: User;

  location: string;
  hometown: string;
  work_in: string;
  birthdayObject: Birthday;

  constructor(
    private userService: UserServices,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.EditButtonClicked = false;
    this.authService.getAuthenticatedUser().then((user: User) => {
      if (user) {
        this.loggedUser = user;
        user.location ? (this.location = user.location) : (this.location = ' ');
        user.hometown ? (this.hometown = user.hometown) : (this.hometown = ' ');
        user.workIn ? (this.work_in = user.workIn) : (this.work_in = ' ');
        user.birthday
          ? (this.birthdayObject = user.birthday)
          : (this.birthdayObject = null);
      } else {
      }
    });
  }

  showInputs = () => {
    this.EditButtonClicked = true;
  };
  editUserInfos = (f: NgForm) => {
    const location = f.value.location;
    const hometown = f.value.hometown;
    const work_in = f.value.work_in;
    const birthday = f.value.birthday;

    this.location = location;
    this.hometown = hometown;
    this.work_in = work_in;
    this.birthdayObject = birthday;

    this.loggedUser.location = location;
    this.loggedUser.hometown = hometown;
    this.loggedUser.workIn = work_in;
    this.loggedUser.birthday = birthday;

    this.userService
      .updateUser(this.loggedUser)
      .subscribe((result) => console.log(result));
    this.EditButtonClicked = false;
  };
}
