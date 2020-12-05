import { Component, OnInit } from '@angular/core';

import { FriendsService } from 'src/app/services/friends.service';

import { environment } from 'src/environments/environment';
import { RelationShips } from 'src/app/models/RelationShips.model';
import { MiniProfile } from 'src/app/models/MiniProfile.model';
import { FriendShip } from 'src/app/models/FriendShip.model';

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.scss'],
})
export class FriendsComponent implements OnInit {
  doIhaveFriends: boolean;
  myFriends: FriendShip[];
  myFriendsProfiles: MiniProfile[];

  doIhavePendingFriendRequests: boolean;
  pendingRequests: FriendShip[];
  pendingRequestsProfile: MiniProfile[];

  doIhaveBlockedByMeList: boolean;
  BlockedByMeList: FriendShip[];
  BlockedByMeListProfiles: MiniProfile[];

  loading: boolean;
  isThereAnErrorToLoadProfiles: boolean;
  male_avatar_photo_url: string;
  myId: number;

  constructor(private friendsService: FriendsService) {}

  ngOnInit(): void {
    this.male_avatar_photo_url = environment.male_avatar_photo_url;
    this.loading = true;
    this.loadmyFriendsProfiles();
  }

  private async loadmyFriendsProfiles() {
    this.friendsService
      .getRelationShips()
      .subscribe(async (response: RelationShips) => {
        try {
          if (response && response.hasOwnProperty) {
            if (
              response.pendingRequests &&
              response.pendingRequests.length > 0
            ) {
              this.pendingRequests = response.pendingRequests;
              this.doIhavePendingFriendRequests = true;
            }
            if (response.blockedBy && response.blockedBy.length > 0) {
              this.BlockedByMeList = response.blockedBy;
              this.doIhaveBlockedByMeList = true;
            }
            if (response.myFriends && response.myFriends.length > 0) {
              this.myFriends = response.myFriends;
              this.doIhaveFriends = true;
            }
            this.myFriendsProfiles = await this.friendsService._getMyFriendsProfiles(
              response
            );
            this.isThereAnErrorToLoadProfiles = false;
            this.loading = false;
            console.log(response);
          } else {
            console.log(
              'in else , check provided conditions in loadmyFriendsProfiles friends.component.ts'
            );
          }
        } catch (error) {
          console.log(error);
          this.isThereAnErrorToLoadProfiles = true;
        }
      });
  }
}
