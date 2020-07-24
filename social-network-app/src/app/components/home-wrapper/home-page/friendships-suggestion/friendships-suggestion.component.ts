import { Component, OnInit } from '@angular/core';
import { FriendsService } from 'src/app/services/friends.service';
import { AuthService } from 'src/app/services/auth.service';
import { UserServices } from 'src/app/services/user.service';

@Component({
  selector: 'app-friendships-suggestion',
  templateUrl: './friendships-suggestion.component.html',
  styleUrls: ['./friendships-suggestion.component.scss'],
})
export class FriendshipsSuggestionComponent implements OnInit {
  friendsSuggestion: string[];
  clicked = false;
  constructor(
    private friendsService: FriendsService,
    private authService: AuthService,
    private userService: UserServices
  ) {}

  ngOnInit(): void {
    this.friendsSuggestion = this.friendsService
      .getTenFriendsSuggestion()
      .slice(0, 5);
  }

  getFriendProperty = (id: string, property: string) =>
    this.userService.getaUserProperty(id, property);

  addFriend(addedId) {
    this.friendsService.addFriend(addedId);
  }
}
