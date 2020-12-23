import { Component, OnInit } from '@angular/core';
import { FriendsService } from '../../../../services/friends.service';
import { environment } from 'src/environments/environment';
import { MiniProfile } from 'src/app/models/MiniProfile.model';

@Component({
  selector: 'app-active-friends',
  templateUrl: './active-friends.component.html',
  styleUrls: ['./active-friends.component.scss'],
})
export class ActiveFriendsComponent implements OnInit {
  clicked: boolean = false;
  // ActiveFriends: Friend[];
  male_avatar_photo_url: string;
  myFriendsProfiles: MiniProfile[];

  constructor(private friendsService: FriendsService) {}

  ngOnInit(): void {
    this.male_avatar_photo_url = environment.male_avatar_photo_url;
    this.friendsService
      ._getMyFriendsProfiles(this.friendsService.myFriends)
      .then((result) => {
        this.myFriendsProfiles = result;
      });
  }

  showActiveFriends = () => {
    this.clicked = !this.clicked;
    //this.ActiveFriends = this.friendsService.getActiveFriendsList();
  };
}
