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
  theLoggedUserId: string = this.authService.loggedUserId;
  theUserFriendsList: Friend[] = this.userService.getaUserProperty(
    this.theLoggedUserId,
    'friends'
  );
  ActiveFriends: Friend[] = [];
  messages: Conversation[] = JSON.parse(localStorage.getItem('Messages')) || [];

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
      return appUsersIds.filter(
        (id) =>
          id !== this.authService.loggedUserId &&
          friendsIds.map((identity) => identity !== id)
      );
    }
  }

  addFriend(adderId: string, addedId: string) {
    const AdderFriends: Friend[] = this.userService.getaUserProperty(
      adderId,
      'friends'
    );
    const AddeedFriends: Friend[] = this.userService.getaUserProperty(
      addedId,
      'friends'
    );

    const adderFriend = new Friend();
    const addedFriend = new Friend();

    adderFriend.id = addedId;
    addedFriend.id = addedId;

    AdderFriends.push(addedFriend);
    AddeedFriends.push(adderFriend);

    this.userService.updateUser(adderId, 'friends', AdderFriends);
    this.userService.updateUser(addedId, 'friends', AddeedFriends);

    const conversation = new Conversation();
    conversation.id = `${adderId}${addedId}`;
    conversation.messages = [];
    this.messages.push(conversation);
    localStorage.setItem('Messages', JSON.stringify(this.messages));
  }
}
