import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import {
  debounceTime,
  distinctUntilChanged,
  map,
  filter,
} from 'rxjs/operators';

import { Friend } from 'src/app/models/Friend.model';
import { FriendsService } from 'src/app/services/friends.service';

@Component({
  selector: 'app-search-friends',
  templateUrl: './search-friends.component.html',
  styleUrls: ['./search-friends.component.scss'],
})
export class FriendsFinder {
  constructor(private friendService: FriendsService) {}

  friends: Friend[] = this.friendService.theUserFriendsList;

  public model: Friend;
  formatter = (friend: Friend): string =>
    this.friendService.getaFriendProperty(friend.id, 'username');

  search = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      filter((term) => term.length >= 2),
      map((term) =>
        this.friends
          .filter((friend) =>
            new RegExp(term, 'mi').test(
              this.friendService.getaFriendProperty(friend.id, 'username')
            )
          )
          .slice(0, 10)
      )
    );
}
