import { Component, OnInit } from '@angular/core';

import { Friend } from 'src/app/models/Friend.model';

import { FriendsService } from 'src/app/services/friends.service';
import { UserServices } from 'src/app/services/user.service';
import { MessagesService } from 'src/app/services/messages.service';
import { Conversation } from 'src/app/models/Conversation.model';
import { AuthService } from 'src/app/services/auth.service';

import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.scss'],
})
export class FriendsComponent implements OnInit {
  friends: Friend[];
  friendsSuggestion: string[];
  friendsIconClicked: boolean = true;
  AddFriendIconClicked: boolean = false;
  added: boolean = true;
  messageIconClicked: boolean = false;
  loggedUserId: string;
  conversation: Conversation;
  friendId: string;
  male_avatar_photo_url: string;

  constructor(
    private friendsService: FriendsService,
    private userService: UserServices,
    private messagesService: MessagesService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.friends = this.friendsService.getUserFriends();
    this.friendsSuggestion = this.friendsService.getTenFriendsSuggestion();
    this.loggedUserId = this.authService.loggedUser.id;
    this.male_avatar_photo_url = environment.male_avatar_photo_url;
  }

  getFriendProperty = (id: string, property: string) =>
    this.userService.getaUserProperty(id, property);

  onFriendsIconClick() {
    this.friends = this.friendsService.getUserFriends();
    this.friendsIconClicked = true;
    this.AddFriendIconClicked = false;
  }

  onAddFriendsIconClick() {
    this.AddFriendIconClicked = true;
    this.friendsIconClicked = false;
  }

  addFriend(addedId) {
    this.friendsService.addFriend(addedId);
    this.friends = this.friendsService.getUserFriends();
    this.friendsSuggestion = this.friendsSuggestion.filter(
      (id) => id !== addedId
    );
  }

  getConversation(friendId) {
    this.messageIconClicked = true;
    this.conversation = this.messagesService.getConversation(friendId);
    this.friendId = friendId;
  }
}
