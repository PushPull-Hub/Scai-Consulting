import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../environments/environment';

import { FriendShip } from '../models/FriendShip.model';
import { RelationShips } from '../models/RelationShips.model';
import { UserServices } from './user.service';
import { AuthService } from './auth.service';
import { MiniProfile } from '../models/MiniProfile.model';
import { User } from '../models/User.model';

@Injectable({
  providedIn: 'root',
})
export class FriendsService {
  UserRelationShips: RelationShips;
  allNeededProfiles: MiniProfile[];

  constructor(
    private http: HttpClient,
    private userService: UserServices,
    private authService: AuthService
  ) {}

  getRelationShips() {
    return this.http.get<RelationShips>(
      environment.rootUrl + '/api/relationships'
    );
  }

  getFriendshipList() {
    return this.http.get<FriendShip[]>(
      environment.rootUrl + '/api/friendships'
    );
  }

  getFriendShip(friend_id: number) {
    return this.http.post<FriendShip>(
      environment.rootUrl + '/api/friendship',
      friend_id
    );
  }

  getPendingFriendRequests() {
    return this.http.get(environment.rootUrl + '/api/friend-request/pending');
  }

  sendFriendRequest(requested_user_Id: number) {
    return this.http.post<FriendShip>(
      environment.rootUrl + '/api/friend-request',
      requested_user_Id
    );
  }

  acceptFriendRequest(requester_user_Id: number) {
    return this.http.put(
      environment.rootUrl + '/api/friend-request',
      requester_user_Id
    );
  }

  blockFriend(blocked_user_id: number) {
    return this.http.put<boolean>(
      environment.rootUrl + '/api/friendship',
      blocked_user_id
    );
  }

  // async getActiveFriendsList() {
  //   let activeFriendsIds: number[] = [];
  //   let userId: number;
  //   await this.authService
  //     .getAuthenticatedUser()
  //     .then((user) => (user.id = userId));
  //   this.getFriendshipList().subscribe((data) => {
  //     data.map((friendship) => {
  //       if (friendship.firstUserId == userId) {
  //         this.userService
  //           .getMiniProfile(friendship.secondUserId)
  //           .subscribe((user) => {
  //             if (user.active) activeFriendsIds.push(user.Id);
  //           });
  //       } else {
  //         this.userService
  //           .getMiniProfile(friendship.firstUserId)
  //           .subscribe((user) => {
  //             if (user.active) activeFriendsIds.push(user.Id);
  //           });
  //       }
  //     });
  //   });
  // }

  // async getAllRelationsShipsProfiles() {
  //   return await this.getRelationShips()
  //     .toPromise()
  //     .then(async (relationShip: RelationShips) => {
  //       if (relationShip && relationShip.hasOwnProperty) {
  //         this.UserRelationShips = relationShip;
  //         let allNeededProfiles: MiniProfile[] = [];
  //         await new Promise((resolve, reject) => {
  //           this.authService
  //             .getAuthenticatedUser()
  //             .then((user: User) => resolve(user.id))
  //             .catch((error) => console.log(error));
  //         }).then(async (id: number) => {
  //           let myId = id;
  //           await new Promise((resolve, reject) => {
  //             this._getMyFriends(relationShip).map(
  //               async (friendship: FriendShip) => {
  //                 if (friendship.firstUserId == myId) {
  //                   await this.userService
  //                     .getMiniProfile(friendship.secondUserId)
  //                     .toPromise()
  //                     .then((profile) => {
  //                       allNeededProfiles.push(profile);
  //                     });
  //                 } else if (friendship.secondUserId == myId) {
  //                   await this.userService
  //                     .getMiniProfile(friendship.firstUserId)
  //                     .toPromise()
  //                     .then((profile) => {
  //                       allNeededProfiles.push(profile);
  //                     });
  //                 }
  //               }
  //             );

  //             this._getMyPendingRequest(relationShip).map(
  //               async (friendShip: FriendShip) => {
  //                 if (!friendShip.hasOwnProperty) {
  //                   console.log('friendShip has No OwnProperty');
  //                 } else {
  //                   if (friendShip.firstUserId == myId) {
  //                     await this.userService
  //                       .getMiniProfile(friendShip.secondUserId)
  //                       .toPromise()
  //                       .then((profile) => {
  //                         allNeededProfiles.push(profile);
  //                       });
  //                   } else if (friendShip.secondUserId == myId) {
  //                     await this.userService
  //                       .getMiniProfile(friendShip.firstUserId)
  //                       .toPromise()
  //                       .then((profile) => {
  //                         allNeededProfiles.push(profile);
  //                       });
  //                   }
  //                 }
  //               }
  //             );

  //             this._getMyBlockList(relationShip).map(
  //               async (friendShip: FriendShip) => {
  //                 if (!friendShip.hasOwnProperty) {
  //                   console.log('friendShip has No OwnProperty');
  //                 } else {
  //                   if (friendShip.firstUserId == myId) {
  //                     await this.userService
  //                       .getMiniProfile(friendShip.secondUserId)
  //                       .toPromise()
  //                       .then((profile) => {
  //                         allNeededProfiles.push(profile);
  //                       });
  //                   } else if (friendShip.secondUserId == myId) {
  //                     await this.userService
  //                       .getMiniProfile(friendShip.firstUserId)
  //                       .toPromise()
  //                       .then((profile) => {
  //                         allNeededProfiles.push(profile);
  //                       });
  //                   }
  //                 }
  //               }
  //             );
  //             resolve(allNeededProfiles);
  //           }).then((data: MiniProfile[]) => {
  //             allNeededProfiles = data;
  //           });
  //         });

  //         return allNeededProfiles;
  //       }
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //       return null;
  //     });
  // }

  async getMyFriendsProfiles() {
    return await this.getRelationShips()
      .toPromise()
      .then(async (relationShip: RelationShips) => {
        let myFriendsProfiles: MiniProfile[] = [];
        const myId = await new Promise((resolve, reject) => {
          this.authService.getAuthenticatedUser().then((user: User) => {
            resolve(user.id);
          });
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  private _getMyFriends(myRelationShips: RelationShips): FriendShip[] {
    return myRelationShips.myFriends;
  }

  private _getMyPendingRequest(myRelationShips: RelationShips): FriendShip[] {
    return myRelationShips.pendingRequests;
  }

  private _getMyBlockList(myRelationShips: RelationShips): FriendShip[] {
    return myRelationShips.blockedBy;
  }

  private async _getMyId() {
    return await new Promise((resolve, reject) => {
      this.authService
        .getAuthenticatedUser()
        .then((user: User) => {
          resolve(user.id);
          reject(Error('getAuthenticatedUser get Rejected'));
        })
        .catch((error) => console.log(error));
    });
  }

  _getMyFriendsProfiles(
    relationShip: RelationShips,
    myId: number
  ): MiniProfile[] {
    let myFriendsProfiles: MiniProfile[] = [];
    this._getMyFriends(relationShip).map(async (friendship: FriendShip) => {
      console.log(friendship);
      const profile: MiniProfile = await this.userService
        .getMiniProfile(
          friendship.firstUserId == myId
            ? friendship.secondUserId
            : friendship.firstUserId
        )
        .toPromise();
      myFriendsProfiles.push(profile);
    });
    return myFriendsProfiles;
  }
}
