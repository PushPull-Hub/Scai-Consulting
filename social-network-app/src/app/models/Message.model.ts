import { Friend } from './Friend.model';
import { User } from './User.model';

export class Message extends Object {
  id: string; // id of this message
  created_time: string;
  from: User; // userSecondVersionb in order to protect user privacy.
  message: string;
  subject: string;
  tags: object[]; //  tags indicating the message
  to: User[]; //  list of recipients of the message.
}
