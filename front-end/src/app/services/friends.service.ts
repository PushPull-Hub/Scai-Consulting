import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../environments/environment';

import { FriendShip } from '../models/FriendShip.model';

@Injectable({
  providedIn: 'root',
})
export class FriendsService {
  friendShipList: FriendShip[];
  // ActiveFriends: Friend[] = [];

  constructor(private http: HttpClient) {}

  getFriendShipList() {
    return this.http.get(environment.rootUrl + '/api/friendships');
  }

  getFriendShipByItsId(friendShipId: number) {
    return this.http.get(
      environment.rootUrl + '/api/friendships/' + friendShipId
    );
  }

  getFriendShipByFriendId(friendId: number) {
    return this.http.post(
      environment.rootUrl + '/api/friendships/friend',
      friendId
    );
  }

  addFriend(friendId: number) {
    return this.http.post(environment.rootUrl + '/api/friendships', friendId);
  }

  getTenFriendsSuggestion() {
    return this.http.get(environment.rootUrl + '/api/friendships/suggestions');
  }

  // getActiveFriendsList(): Friend[] {
  //   const ActiveFriends: Friend[] = [];
  //   this.userService
  //     .getaUserProperty(this.authService.getLoggedUserId(), 'friends')
  //     .map((friend) => {
  //       if (this.userService.getaUserProperty(friend.id, 'isActive')) {
  //         ActiveFriends.push(friend);
  //       }
  //     });
  //   return ActiveFriends;
  // }
}
