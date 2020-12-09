import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import {
  debounceTime,
  distinctUntilChanged,
  map,
  filter,
} from 'rxjs/operators';

import { User } from 'src/app/models/User.model';
import { UserServices } from 'src/app/services/user.service';

@Component({
  selector: 'app-search-friends',
  templateUrl: './search-friends.component.html',
  styleUrls: ['./search-friends.component.scss'],
})
export class FriendsFinder implements OnInit {
  users: User[];
  male_avatar_photo_url: string;

  constructor(private userService: UserServices) {}

  ngOnInit(): void {
    this.male_avatar_photo_url = environment.male_avatar_photo_url;
    this.userService.getUsers();
    this.userService.usersList.subscribe((users) => {
      this.users = users;
    });
  }

  public model: User;
  formatter = (user: User): string => {
    return ` ${user.firstName} ${user.lastName} `;
  };

  resultFormat = (user: User) => {
    return `<img src="${environment.male_avatar_photo_url}"> ${user.firstName} ${user.lastName} `;
  };

  search = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      filter((term) => term.length >= 2),
      map((term) =>
        this.users
          .filter(async (user) => {
            const profile = await this.userService
              .getMiniProfile(user.id)
              .toPromise();
            new RegExp(term, 'mi').test(profile.firstName);
          })
          .slice(0, 10)
      )
    );
}
