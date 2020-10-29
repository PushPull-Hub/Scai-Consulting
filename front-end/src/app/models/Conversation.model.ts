import { isPrimitive } from 'util';

import { Message } from './Message.model';

export class Conversation extends Object {
  id: string;
  messages: Message[];
}
