import { Injectable } from '@angular/core';
import { UserServices } from './user.service';
import { AuthService } from './auth.service';
import { Friend } from '../models/Friend.model';
import { User } from '../models/User.model';

@Injectable({
  providedIn: 'root',
})
export class FriendsService {
  theLoggedUserId: string = this.authService.loggedUserId;
  theUserFriendsList: Friend[] = this.userService.getaUserProperty(
    this.theLoggedUserId,
    'friends'
  );
  ActiveFriends: Friend[] = [];

  constructor(
    private userService: UserServices,
    private authService: AuthService
  ) {}

  getFriendbyId(id: string): User {
    return this.userService.getUserById(id);
  }

  getaFriendProperty(id: string, property: string): any {
    return this.userService.getaUserProperty(id, property);
  }

  getUserFriends() {
    return this.theUserFriendsList;
  }

  getActiveFriendsList(): Friend[] {
    const ActiveFriends: Friend[] = [];
    this.theUserFriendsList.map((friend) => {
      if (this.userService.getaUserProperty(friend.id, 'isActive')) {
        ActiveFriends.push(friend);
      }
    });
    return ActiveFriends;
  }

  getTenFriendsSuggestion() {
    const appUsersIds = this.userService.getUsersIds();
    const friendsIds = this.theUserFriendsList.map((friend) => friend.id);
    for (let i = 0; i < 10; i++) {
      return appUsersIds.filter((id) =>
        friendsIds.every((identity) => identity !== id)
      );
    }
  }
}
