import { Injectable } from '@angular/core';
import { UserServices } from './user.service';
import { AuthService } from './auth.service';
import { Friend } from '../models/Friend.model';

@Injectable({
  providedIn: 'root',
})
export class FriendsService {
  theLoggedUserId = this.authService.loggedUserId;
  theUserFriendsList: Friend[] = this.userService.getaUserProperty(
    this.theLoggedUserId,
    'friends'
  );
  ActiveFriends: Friend[] = [];

  constructor(
    private userService: UserServices,
    private authService: AuthService
  ) {}

  getActiveFriendsList(): Friend[] {
    this.theUserFriendsList.map((friend) => {
      if (this.userService.getaUserProperty(friend.id, 'isActive')) {
        this.ActiveFriends.push(friend);
      }
    });
    return this.ActiveFriends;
  }
}
