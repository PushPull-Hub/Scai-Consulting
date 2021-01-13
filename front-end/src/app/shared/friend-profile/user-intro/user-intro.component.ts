import { Component, Input, OnInit } from '@angular/core';
import { MiniProfile } from 'src/app/models/MiniProfile.model';
import { Birthday, User } from 'src/app/models/User.model';
import { UserServices } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-intro',
  templateUrl: './user-intro.component.html',
  styleUrls: ['./user-intro.component.scss'],
})
export class UserIntroComponent implements OnInit {
  @Input() profile: MiniProfile;
  user: User;

  loading: boolean;

  location: string;
  hometown: string;
  work_in: string;
  birthdayObject: Birthday;

  constructor(private userService: UserServices) {}

  ngOnInit(): void {
    this.getUser();
  }

  private async getUser() {
    this.loading = true;
    await this.userService
      .getUserById(this.profile.id)
      .toPromise()
      .then((user) => {
        this.user = user;
        this.loadInfos();
        this.loading = false;
      });
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
