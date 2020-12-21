import { Component, Input, OnInit } from '@angular/core';
import { Birthday, User } from 'src/app/models/User.model';

@Component({
  selector: 'app-user-intro',
  templateUrl: './user-intro.component.html',
  styleUrls: ['./user-intro.component.scss'],
})
export class UserIntroComponent implements OnInit {
  @Input() loggedUser: User;

  user: User;

  location: string;
  hometown: string;
  work_in: string;
  birthdayObject: Birthday;

  constructor() {}

  ngOnInit(): void {
    this.loadInfos();
  }

  private loadInfos() {
    this.user.location
      ? (this.location = this.user.location)
      : (this.location = ' ');
    this.user.location
      ? (this.location = this.user.location)
      : (this.location = ' ');
    this.user.hometown
      ? (this.hometown = this.user.hometown)
      : (this.hometown = ' ');
    this.user.workIn ? (this.work_in = this.user.workIn) : (this.work_in = ' ');
    this.user.birthday
      ? (this.birthdayObject = this.user.birthday)
      : (this.birthdayObject = null);
  }
}
