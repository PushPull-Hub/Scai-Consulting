export class FriendShip extends Object {
  id: number;
  firstUserId: number;
  secondUserId: number;
  status: Status;
  actionUserId: number;
}

enum Status {
  Pending = 0,
  Accepted = 1,
  Declined = 2,
  Blocked = 3,
}
