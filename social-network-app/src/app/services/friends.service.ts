import { Injectable } from '@angular/core';
import { UserServices } from './user.service';
import { AuthService } from './auth.service';
import { Friend } from '../models/Friend.model';

@Injectable({
  providedIn: 'root',
})
export class FriendsService {
  theLoggedUserId: number = this.authService.loggedUserId;
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
    const ActiveFriends: Friend[] = [];
    this.theUserFriendsList.map((friend) => {
      if (this.userService.getaUserProperty(friend.id, 'isActive')) {
        ActiveFriends.push(friend);
      }
    });
    return ActiveFriends;
  }
}
