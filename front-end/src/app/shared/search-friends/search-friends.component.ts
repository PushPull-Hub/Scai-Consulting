import { Component } from '@angular/core';
import { Observable } from 'rxjs';
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
export class FriendsFinder {
  constructor(private userService: UserServices) {}

  // users: User[] = this.userService.usersList;

  // public model: User;
  // formatter = (user: User): string =>
  //   this.userService.getaUserProperty(user.id, 'username');

  // search = (text$: Observable<string>) =>
  //   text$.pipe(
  //     debounceTime(200),
  //     distinctUntilChanged(),
  //     filter((term) => term.length >= 2),
  //     map((term) =>
  //       this.users
  //         .filter((user) =>
  //           new RegExp(term, 'mi').test(
  //             this.userService.getaUserProperty(user.id, 'username')
  //           )
  //         )
  //         .slice(0, 10)
  //     )
  //   );
}
