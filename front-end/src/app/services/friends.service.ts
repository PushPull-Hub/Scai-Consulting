import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../environments/environment';

import { FriendShip } from '../models/FriendShip.model';
import { RelationShips } from '../models/RelationShips.model';
import { UserServices } from './user.service';
import { AuthService } from './auth.service';
import { MiniProfile } from '../models/MiniProfile.model';
import { User } from '../models/User.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FriendsService {
  UserRelationShips: RelationShips;
  allNeededProfiles: MiniProfile[];

  myId: number;
  Suggestions: MiniProfile[];

  myFriends: FriendShip[];
  pendingRequests: FriendShip[];
  BlockedByMeList: FriendShip[];
  requests: FriendShip[];

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
      if (myFriends && myFriends.length > 0) {
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
      } else resolve(null);
    });
  }

  _getMyPendingRequestsProfiles(
    myPendingRequests: FriendShip[]
  ): Promise<MiniProfile[]> {
    return new Promise(async (resolve, reject) => {
      const myId = await this._getMyId();
      this.myId = myId;
      let myPendingRequestsProfile: MiniProfile[] = [];
      if (myPendingRequests && myPendingRequests.length > 0) {
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
      } else resolve(null);
    });
  }

  _getRequesterProfiles(requests: FriendShip[]): Promise<MiniProfile[]> {
    return new Promise(async (resolve, reject) => {
      const myId = await this._getMyId();
      this.myId = myId;
      let requesterProfiles: MiniProfile[] = [];
      if (requests && requests.length > 0) {
        for (const friendship of requests) {
          const profile: MiniProfile = await this.userService
            .getMiniProfile(
              friendship.firstUserId == myId
                ? friendship.secondUserId
                : friendship.firstUserId
            )
            .toPromise();
          requesterProfiles.push(profile);
        }
        resolve(requesterProfiles);
      } else resolve(null);
    });
  }

  _getBlockedByMeListProfiles(blockList: FriendShip[]): Promise<MiniProfile[]> {
    return new Promise(async (resolve, reject) => {
      const myId = await this._getMyId();
      this.myId = myId;
      let blockedByMeList: MiniProfile[] = [];
      if (blockList && blockList.length > 0) {
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
      } else resolve(null);
    });
  }

  sendFriendRequest(requested_user_Id: number): Observable<FriendShip> {
    return this.http.post<FriendShip>(
      environment.rootUrl + '/api/friend-request',
      requested_user_Id
    );
  }

  acceptFriendRequest(requestorId: number) {
    return this.http.put<FriendShip>(
      environment.rootUrl + '/api/friend-request',
      requestorId
    );
  }

  declineFriendRequest(requestorId: number) {
    return this.http.post<boolean>(
      environment.rootUrl + '/api/relationships/decline',
      requestorId
    );
  }

  cancelFriendRequest(requestedId: number) {
    return this.http.post<boolean>(
      environment.rootUrl + '/api/cancel-request',
      requestedId
    );
  }

  blockFriend(blocked_user_id: number) {
    return this.http.put<boolean>(
      environment.rootUrl + '/api/friendship',
      blocked_user_id
    );
  }

  unblockFriend(blocked_user_id: number) {
    return this.http.put<boolean>(
      environment.rootUrl + '/api/friendship/friend',
      blocked_user_id
    );
  }

  getTenSuggestions(): Observable<MiniProfile[]> {
    return this.http.get<MiniProfile[]>(
      environment.rootUrl + '/api/suggestions'
    );
  }

  getRelation(friendId: number) {
    return this.http.post<FriendShip>(
      environment.rootUrl + '/api/friendship',
      friendId
    );
  }
}
