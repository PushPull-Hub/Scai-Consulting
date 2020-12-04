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
  myRelationShips: RelationShips;
  allProfiles: MiniProfile[];

  myFriends: FriendShip[];
  myFriendsProfiles: MiniProfile[];

  pendingRequests: FriendShip[];
  blockedBy: FriendShip[];

  doIhaveFriends: boolean;
  doIhavePendingRequests: boolean;
  doIhaveBlockedMeList: boolean;
  doIhaveBlockedByMeList: boolean;

  loading: boolean;
  isThereAnErrorToLoadProfiles: boolean;
  male_avatar_photo_url: string;
  myId: number;

  constructor(private friendsService: FriendsService) {}

  ngOnInit(): void {
    this.male_avatar_photo_url = environment.male_avatar_photo_url;
    this.loading = true;
    // this._loadProfiles();
    this.testMethod();
  }

  private async testMethod() {
    try {
      const values = await this.friendsService.getRelationShips().toPromise();
      console.log(values);
      const result = this.friendsService._getMyFriendsProfiles(values, 12);
      console.log(result);
    } catch (error) {
      console.log(error);
    } finally {
      console.log('FINISHED');
      this.loading = false;
    }
  }
  // private _loadProfiles() {
  //   this.friendsService
  //     .getAllRelationsShipsProfiles()
  //     .then((data: MiniProfile[]) => {
  //       if (data && data.length > 0) {
  //         console.log(data);
  //         this.myId = this.friendsService.myId;
  //         this.myRelationShips = this.friendsService.UserRelationShips;
  //         this.allProfiles = data;
  //         this.myFriends = this.myRelationShips.myFriends;
  //         console.log(this.myFriends);
  //         let res = this.myFriends.map((friendShip: FriendShip) => {
  //           let FriendsProfiles: MiniProfile[] = [];
  //           if (friendShip.firstUserId == this.myId) {
  //             let profile = this.allProfiles.find((profile: MiniProfile) => {
  //               profile.Id == friendShip.secondUserId;
  //             });
  //             console.log(profile);
  //             FriendsProfiles.push(profile);
  //           } else if (friendShip.secondUserId == this.myId) {
  //             let profile = this.allProfiles.find((profile: MiniProfile) => {
  //               profile.Id == friendShip.firstUserId;
  //             });
  //             console.log(profile);
  //             FriendsProfiles.push(profile);
  //           }
  //           return FriendsProfiles;
  //         });
  //         console.log(res);
  //         this.pendingRequests = this.myRelationShips.pendingRequests;
  //         this.blockedBy = this.myRelationShips.blockedBy;
  //         this.isThereAnErrorToLoadProfiles = false;
  //         this.loading = false;
  //         console.log(this.myFriendsProfiles);
  //         this.isThereAnErrorToLoadProfiles = false;
  //         console.log(data);
  //       } else {
  //         this.loading = false;
  //         this.isThereAnErrorToLoadProfiles = true;
  //       }
  //     });
  // }
}
