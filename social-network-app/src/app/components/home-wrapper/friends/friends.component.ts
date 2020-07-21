import { Component, OnInit } from '@angular/core';
import { Friend } from 'src/app/models/Friend.model';
import { FriendsService } from 'src/app/services/friends.service';
import { UserServices } from 'src/app/services/user.service';

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

  constructor(
    private friendsService: FriendsService,
    private userService: UserServices
  ) {}

  ngOnInit(): void {
    console.log(this.friendsService.getTenFriendsSuggestion());
  }

  getFriendProperty(id: string, property: string) {
    return this.friendsService.getaFriendProperty(id, property);
  }

  onFriendsIconClick() {
    this.friendsIconClicked = true;
    this.AddFriendIconClicked = false;
  }

  onAddFriendsIconClick() {
    this.AddFriendIconClicked = true;
    this.friendsIconClicked = false;
  }
}
