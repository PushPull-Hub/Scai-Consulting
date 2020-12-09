import { Message } from './Message.model';

export class Conversation extends Object {
  id: string;
  firstUserId: number;
  secondUserId: number;
  messages: Message[];
}
