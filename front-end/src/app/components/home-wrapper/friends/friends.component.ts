import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { MyFriendsComponent } from './my-friends/my-friends.component';
import { PendingRequestsComponent } from './pending-requests/pending-requests.component';
import { SuggestionsComponent } from './suggestions/suggestions.component';
import { BlockedComponent } from './blocked/blocked.component';

import { FriendsService } from 'src/app/services/friends.service';

import { RelationShips } from 'src/app/models/RelationShips.model';
import { MiniProfile } from 'src/app/models/MiniProfile.model';
import { FriendShip } from 'src/app/models/FriendShip.model';
import { RequestsComponent } from './requests/requests.component';

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.scss'],
})
export class FriendsComponent implements OnInit {
  myFriends: FriendShip[];
  myFriendsProfiles: MiniProfile[];

  pendingRequests: FriendShip[];
  pendingRequestsProfile: MiniProfile[];

  BlockedByMeList: FriendShip[];
  BlockedByMeListProfiles: MiniProfile[];

  requests: FriendShip[];
  requesterProfiles: MiniProfile[];

  loading: boolean;
  isThereAnErrorToLoadProfiles: boolean;
  myId: number;

  constructor(private friendsService: FriendsService, private router: Router) {}

  ngOnInit(): void {
    this.loading = true;
    this.loadmyFriendsProfiles();
  }

  private async loadmyFriendsProfiles() {
    this.friendsService
      .getRelationShips()
      .subscribe(async (response: RelationShips) => {
        console.log(response);
        try {
          if (response && response.hasOwnProperty) {
            if (
              response.pendingRequests &&
              response.pendingRequests.length > 0
            ) {
              this.pendingRequests = response.pendingRequests;
            }
            if (response.blockedBy && response.blockedBy.length > 0) {
              this.BlockedByMeList = response.blockedBy;
            }
            if (response.myFriends && response.myFriends.length > 0) {
              this.myFriends = response.myFriends;
            }
            if (response.requests && response.requests.length > 0) {
              this.requests = response.requests;
            }
            this.isThereAnErrorToLoadProfiles = false;
            this.loading = false;
          } else {
            this.loading = false;
            console.log(
              'in else , check provided conditions in loadmyFriendsProfiles friends.component.ts'
            );
          }
        } catch (error) {
          console.log(error);
          this.loading = false;
          this.isThereAnErrorToLoadProfiles = true;
        }
      });
  }

  async onActivate(componentReference) {
    await this.loadmyFriendsProfiles().then(async () => {
      if (componentReference instanceof MyFriendsComponent) {
        this.myFriendsProfiles = await this.friendsService._getMyFriendsProfiles(
          this.myFriends
        );
        componentReference.loadProfiles(
          this.myFriendsProfiles && this.myFriendsProfiles.length > 0
            ? this.myFriendsProfiles
            : null
        );
      } else if (componentReference instanceof PendingRequestsComponent) {
        this.pendingRequestsProfile = await this.friendsService._getMyPendingRequestsProfiles(
          this.pendingRequests
        );
        componentReference.loadProfiles(
          this.pendingRequestsProfile && this.pendingRequestsProfile.length > 0
            ? this.pendingRequestsProfile
            : null
        );
      } else if (componentReference instanceof BlockedComponent) {
        this.BlockedByMeListProfiles = await this.friendsService._getBlockedByMeListProfiles(
          this.BlockedByMeList
        );
        componentReference.loadProfiles(
          this.BlockedByMeListProfiles &&
            this.BlockedByMeListProfiles.length > 0
            ? this.BlockedByMeListProfiles
            : null
        );
      } else if (componentReference instanceof SuggestionsComponent) {
        console.log('Search Area ');
      } else if (componentReference instanceof RequestsComponent) {
        this.requesterProfiles = await this.friendsService._getRequesterProfiles(
          this.requests
        );
        componentReference.loadProfiles(
          this.requesterProfiles && this.requesterProfiles.length > 0
            ? this.requesterProfiles
            : null
        );
        componentReference.friendShipEmitter.subscribe(
          (friendShip: FriendShip) => {
            this.myFriends.push(friendShip);
          }
        );
      } else {
        console.log('check the conditions ');
      }
    });
  }
}
