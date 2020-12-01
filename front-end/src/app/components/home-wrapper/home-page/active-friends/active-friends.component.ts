import { Component, OnInit } from '@angular/core';
import { FriendsService } from '../../../../services/friends.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-active-friends',
  templateUrl: './active-friends.component.html',
  styleUrls: ['./active-friends.component.scss'],
})
export class ActiveFriendsComponent implements OnInit {
  clicked: boolean = false;
  // ActiveFriends: Friend[];
  male_avatar_photo_url: string;

  constructor(private friendsService: FriendsService) {}

  ngOnInit(): void {
    this.male_avatar_photo_url = environment.male_avatar_photo_url;
  }

  showActiveFriends = () => {
    //  this.clicked = !this.clicked;
    //this.ActiveFriends = this.friendsService.getActiveFriendsList();
  };

  showFriendUserName(id: string) {
    //return this.friendsService.getaFriendProperty(id, 'username');
  }
}
