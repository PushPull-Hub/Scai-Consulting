import { Friend } from './Friend.model';
import { User } from './User.model';

export class Message extends Object {
  id: string; // id of this message
  created_time: string;
  sender: string; // userSecondVersionb in order to protect user privacy.
  text: string;
  subject: string;
  tags: object[]; //  tags indicating the message
  reciever: string; //  list of recipients of the message.
}
