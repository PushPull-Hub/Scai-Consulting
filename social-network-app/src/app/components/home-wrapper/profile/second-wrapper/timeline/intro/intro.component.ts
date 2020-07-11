import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserServices } from 'src/app/services/user.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-intro',
  templateUrl: './intro.component.html',
  styleUrls: ['./intro.component.scss'],
})
export class IntroComponent implements OnInit {
  EditButtonClicked: boolean = false;
  location: string = '';
  hometown: string = '';
  work_in: string = '';
  birthday: string = '';
  constructor(
    private userService: UserServices,
    private authService: AuthService
  ) {}

  ngOnInit(): void {}

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
    this.birthday = birthday;

    this.userService.updateUser(
      this.authService.loggedUserId,
      'location',
      location
    );
    this.userService.updateUser(
      this.authService.loggedUserId,
      'hometown',
      hometown
    );
    this.userService.updateUser(
      this.authService.loggedUserId,
      'work_in',
      work_in
    );
    this.userService.updateUser(
      this.authService.loggedUserId,
      'birthday',
      birthday
    );

    this.EditButtonClicked = false;
  };
}
