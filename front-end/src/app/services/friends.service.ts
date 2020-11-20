import { Injectable } from '@angular/core';
import { UserServices } from './user.service';
import { AuthService } from './auth.service';

import { Friend } from '../models/Friend.model';
import { User } from '../models/User.model';
import { Conversation } from '../models/Conversation.model';

@Injectable({
  providedIn: 'root',
})
export class FriendsService {
  // theUserFriendsList: Friend[] = this.userService.getaUserProperty(
  //  this.authService.getLoggedUserId(),
  // 'friends'
  // );
  ActiveFriends: Friend[] = [];
  messages: Conversation[] = JSON.parse(localStorage.getItem('Messages')) || [];

  constructor(
    private userService: UserServices,
    private authService: AuthService
  ) {}

  // getFriendbyId(id: string): User {
  //   return this.userService.getUserById(id);
  // }

  // getaFriendProperty(id: string, property: string): any {
  //   return this.userService.getaUserProperty(id, property);
  // }

  // getUserFriends() {
  //   return this.userService.getaUserProperty(
  //     this.authService.getLoggedUserId(),
  //     'friends'
  //   );
  // }

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

  // getTenFriendsSuggestion() {
  //   const appUsersIds = this.userService.getUsersIds();
  //   const friendsIds = this.userService
  //     .getaUserProperty(this.authService.getLoggedUserId(), 'friends')
  //     .map((friend) => friend.id);
  //   for (let i = 0; i < 10; i++) {
  //     return appUsersIds.filter(
  //       (id) =>
  //         id !== this.authService.getLoggedUserId() &&
  //         friendsIds.every((identity) => identity !== id)
  //     );
  //   }
  // }

  // addFriend(friendId: string) {
  //   const userFriends: Friend[] = this.userService.getaUserProperty(
  //     this.authService.getLoggedUserId(),
  //     'friends'
  //   );
  //   const addedFriends: Friend[] = this.userService.getaUserProperty(
  //     friendId,
  //     'friends'
  //   );

  //   const friend = new Friend();
  //   const user = new Friend();

  //   friend.id = friendId;
  //   user.id = this.authService.getLoggedUserId();

  //   userFriends.push(friend);
  //   addedFriends.push(user);

  //   this.userService.updateUser(
  //     this.authService.getLoggedUserId(),
  //     'friends',
  //     userFriends
  //   );
  //   this.userService.updateUser(friendId, 'friends', addedFriends);

  //   const conversation = new Conversation();
  //   conversation.id = `${this.authService.getLoggedUserId()}${friendId}`;
  //   conversation.messages = [];
  //   this.messages.push(conversation);
  //   localStorage.setItem('Messages', JSON.stringify(this.messages));
  // }
}
