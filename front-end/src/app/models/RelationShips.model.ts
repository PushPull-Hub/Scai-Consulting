import { FriendShip } from './FriendShip.model';

export class RelationShips extends Object {
  myFriends: FriendShip[];
  pendingRequests: FriendShip[];
  blockedMe: FriendShip[];
  declinedRequests: FriendShip[];
  blockedBy: FriendShip[];
  requests: FriendShip[];
}
