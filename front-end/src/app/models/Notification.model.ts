export class Notification extends Object {
  firstUserId: number;
  secondUserId: number;
  status: Status;
}

enum Status {
  I_liked = 0,
  he_liked = 1,
  I_comment = 2,
  he_comment = 3,
  I_sent_friend_request = 4,
  he_sent_friend_request = 5,
}
