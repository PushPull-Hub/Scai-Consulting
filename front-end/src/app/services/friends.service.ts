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
  myId: number;

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

  private _getMyFriendsFromRelationShipArray(
    myRelationShips: RelationShips
  ): FriendShip[] {
    return myRelationShips.myFriends;
  }

  private _getMyPendingRequest(myRelationShips: RelationShips): FriendShip[] {
    return myRelationShips.pendingRequests;
  }

  private _getMyBlockList(myRelationShips: RelationShips): FriendShip[] {
    return myRelationShips.blockedBy;
  }

  private _getMyId(): Promise<number> {
    return new Promise((resolve, reject) => {
      this.authService
        .getAuthenticatedUser()
        .then((user: User) => {
          resolve(user.id);
          reject(Error('getAuthenticatedUser get Rejected'));
        })
        .catch((error) => console.log(error));
    });
  }

  _getMyFriendsProfiles(myFriends: FriendShip[]): Promise<MiniProfile[]> {
    return new Promise(async (resolve, reject) => {
      const myId = await this._getMyId();
      this.myId = myId;
      let myFriendsProfiles: MiniProfile[] = [];
      for (const friendship of myFriends) {
        const profile: MiniProfile = await this.userService
          .getMiniProfile(
            friendship.firstUserId == myId
              ? friendship.secondUserId
              : friendship.firstUserId
          )
          .toPromise();
        myFriendsProfiles.push(profile);
      }
      resolve(myFriendsProfiles);
    });
  }

  _getMyPendingRequestsProfiles(
    myPendingRequests: FriendShip[]
  ): Promise<MiniProfile[]> {
    return new Promise(async (resolve, reject) => {
      const myId = await this._getMyId();
      this.myId = myId;
      let myPendingRequestsProfile: MiniProfile[] = [];

      for (const friendship of myPendingRequests) {
        const profile: MiniProfile = await this.userService
          .getMiniProfile(
            friendship.firstUserId == myId
              ? friendship.secondUserId
              : friendship.firstUserId
          )
          .toPromise();
        myPendingRequestsProfile.push(profile);
      }
      resolve(myPendingRequestsProfile);
    });
  }

  _getBlockedByMeListProfiles(blockList: FriendShip[]): Promise<MiniProfile[]> {
    return new Promise(async (resolve, reject) => {
      const myId = await this._getMyId();
      this.myId = myId;
      let blockedByMeList: MiniProfile[] = [];
      for (const friendship of blockList) {
        const profile: MiniProfile = await this.userService
          .getMiniProfile(
            friendship.firstUserId == myId
              ? friendship.secondUserId
              : friendship.firstUserId
          )
          .toPromise();
        blockedByMeList.push(profile);
      }
      resolve(blockedByMeList);
    });
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
}
