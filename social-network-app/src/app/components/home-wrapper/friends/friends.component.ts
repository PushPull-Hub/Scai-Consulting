import { Component, OnInit } from '@angular/core';

import { Friend } from 'src/app/models/Friend.model';

import { FriendsService } from 'src/app/services/friends.service';
import { UserServices } from 'src/app/services/user.service';
import { MessagesService } from 'src/app/services/messages.service';

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.scss'],
})
export class FriendsComponent implements OnInit {
  friends: Friend[] = this.friendsService.getUserFriends();
  friendsSuggestion: string[] = this.friendsService.getTenFriendsSuggestion();
  friendsIconClicked: boolean = true;
  AddFriendIconClicked: boolean = false;
  added: boolean = true;
  messageIconClicked: boolean = false;
  loggedUserId: string = this.friendsService.theLoggedUserId;

  constructor(
    private friendsService: FriendsService,
    private userService: UserServices,
    private messagesService: MessagesService
  ) {}

  ngOnInit(): void {
    console.table(this.userService.getUsers());
    console.table(this.messagesService.messages);
  }

  getFriendProperty = (id: string, property: string) =>
    this.userService.getaUserProperty(id, property);

  onFriendsIconClick() {
    this.friendsIconClicked = true;
    this.AddFriendIconClicked = false;
  }

  onAddFriendsIconClick() {
    this.AddFriendIconClicked = true;
    this.friendsIconClicked = false;
  }
  addFriend(adderId, addedId) {
    this.friendsService.addFriend(adderId, addedId);
  }

  showMessageBox() {
    this.messageIconClicked = true;
  }
}
