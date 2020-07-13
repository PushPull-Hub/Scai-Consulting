import { Component, OnInit } from '@angular/core';
import { FriendsService } from '../../../../services/friends.service';
import { Friend } from 'src/app/models/Friend.model';

@Component({
  selector: 'app-active-friends',
  templateUrl: './active-friends.component.html',
  styleUrls: ['./active-friends.component.scss'],
})
export class ActiveFriendsComponent implements OnInit {
  clicked: boolean = false;
  ActiveFriends: Friend[] = [];
  constructor(private friendsService: FriendsService) {}

  ngOnInit(): void {}

  showActiveFriends = () => {
    this.clicked = !this.clicked;
    this.ActiveFriends = this.friendsService.getActiveFriendsList();
  };
}
